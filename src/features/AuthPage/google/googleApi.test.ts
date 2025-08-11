import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loginWithGoogle } from './googleApi';

// Mock the response schema module with vi.hoisted
const mockSafeParse = vi.hoisted(() => vi.fn());
vi.mock('../schemas/responseSchema', () => ({
  responseSchema: {
    safeParse: mockSafeParse,
  },
}));

// Mock environment
vi.mock('@/vite-env.d.ts', () => ({}));

describe('loginWithGoogle', () => {
  let mockPopup: { closed: boolean };
  let messageHandler: ((event: MessageEvent) => void) | null;
  let intervalCallback: (() => void) | null;

  beforeEach(() => {
    vi.clearAllMocks();
    messageHandler = null;
    intervalCallback = null;

    // Mock window properties
    Object.defineProperty(window, 'screenX', { value: 100, writable: true, configurable: true });
    Object.defineProperty(window, 'screenY', { value: 100, writable: true, configurable: true });
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
      configurable: true,
    });

    // Mock popup window
    mockPopup = { closed: false };
    window.open = vi.fn().mockReturnValue(mockPopup);

    // Mock event listeners
    window.addEventListener = vi.fn((event, handler) => {
      if (event === 'message') {
        messageHandler = handler as (event: MessageEvent) => void;
      }
    });
    window.removeEventListener = vi.fn();

    // Mock environment variable
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');

    // Mock setInterval and clearInterval
    vi.spyOn(global, 'setInterval').mockImplementation((callback) => {
      intervalCallback = callback as () => void;
      return 123 as unknown as NodeJS.Timeout;
    });
    vi.spyOn(global, 'clearInterval').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  it('opens OAuth popup with correct parameters', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      emailVerified: true,
      password: null,
      provider: 'google',
      providerId: '123',
      stripeCustomerId: null,
    };
    mockSafeParse.mockReturnValue({ success: true, data: mockUser });

    const loginPromise = loginWithGoogle();

    expect(window.open).toHaveBeenCalledWith(
      'https://api.example.com/auth/google',
      'googleOAuth',
      'width=500,height=600,left=450,top=200'
    );

    // Simulate successful OAuth message
    messageHandler!({
      origin: 'https://api.example.com',
      data: { type: 'OAUTH_SUCCESS', user: mockUser },
    } as MessageEvent);

    const result = await loginPromise;
    expect(result).toEqual(mockUser);
  });

  it('rejects when popup cannot be opened', async () => {
    window.open = vi.fn().mockReturnValue(null);

    await expect(loginWithGoogle()).rejects.toThrow('Could not open Google OAuth window');
  });

  it('ignores messages from wrong origin', async () => {
    const loginPromise = loginWithGoogle();

    // Send message from wrong origin
    messageHandler!({
      origin: 'https://malicious-site.com',
      data: { type: 'OAUTH_SUCCESS', user: {} },
    } as MessageEvent);

    // Should not have processed the message
    expect(mockSafeParse).not.toHaveBeenCalled();

    // Clean up by closing popup
    mockPopup.closed = true;
    intervalCallback!();

    await expect(loginPromise).rejects.toThrow('OAuth popup closed before completing');
  });

  it('rejects when popup is closed before completion', async () => {
    const loginPromise = loginWithGoogle();

    mockPopup.closed = true;
    intervalCallback!();

    await expect(loginPromise).rejects.toThrow('OAuth popup closed before completing');
  });

  it('rejects when response schema validation fails', async () => {
    const mockError = new Error('Validation failed');
    mockSafeParse.mockReturnValue({ success: false, error: mockError });

    // Mock console.error to suppress expected error output
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const loginPromise = loginWithGoogle();

    messageHandler!({
      origin: 'https://api.example.com',
      data: { type: 'OAUTH_SUCCESS', user: {} },
    } as MessageEvent);

    await expect(loginPromise).rejects.toEqual(mockError);

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('cleans up resources on success', async () => {
    const mockUser = { id: 1, email: 'test@example.com' };
    mockSafeParse.mockReturnValue({ success: true, data: mockUser });

    const loginPromise = loginWithGoogle();

    messageHandler!({
      origin: 'https://api.example.com',
      data: { type: 'OAUTH_SUCCESS', user: mockUser },
    } as MessageEvent);

    await loginPromise;

    expect(window.removeEventListener).toHaveBeenCalled();
    expect(global.clearInterval).toHaveBeenCalledWith(123);
  });
});
