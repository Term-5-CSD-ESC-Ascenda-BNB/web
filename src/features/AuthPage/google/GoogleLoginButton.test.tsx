import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the hooks with vi.hoisted
const mockMutate = vi.hoisted(() => vi.fn());
const mockHandleSuccess = vi.hoisted(() => vi.fn());
const mockHandleError = vi.hoisted(() => vi.fn());

const mockUseGoogleMutation = vi.hoisted(() =>
  vi.fn(() => ({
    mutate: mockMutate,
    isPending: false,
  }))
);

vi.mock('./useGoogleMutation', () => ({
  useGoogleMutation: mockUseGoogleMutation,
}));

vi.mock('./useGoogleNotifications', () => ({
  useGoogleNotifications: vi.fn(() => ({
    handleSuccess: mockHandleSuccess,
    handleError: mockHandleError,
  })),
}));

// Mock the SocialButton component
interface MockSocialButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}

vi.mock('../components/SocialButton/SocialButton', () => ({
  SocialButton: ({ children, onClick, disabled }: MockSocialButtonProps) => (
    <button data-testid="social-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

import { GoogleLoginButton } from './GoogleLoginButton';

describe('GoogleLoginButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with Google icon', () => {
    render(<GoogleLoginButton />);

    expect(screen.getByTestId('social-button')).toBeInTheDocument();
    // Check for the Google icon SVG
    expect(screen.getByRole('button')).toContainHTML('<svg');
  });

  it('triggers Google login when clicked', async () => {
    const user = userEvent.setup();
    render(<GoogleLoginButton />);

    const button = screen.getByTestId('social-button');
    await user.click(button);

    expect(mockMutate).toHaveBeenCalledWith(undefined, {
      onSuccess: mockHandleSuccess,
      onError: mockHandleError,
    });
  });

  it('is disabled when mutation is pending', () => {
    mockUseGoogleMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    render(<GoogleLoginButton />);

    const button = screen.getByTestId('social-button');
    expect(button).toBeDisabled();
  });

  it('is enabled when mutation is not pending', () => {
    mockUseGoogleMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<GoogleLoginButton />);

    const button = screen.getByTestId('social-button');
    expect(button).not.toBeDisabled();
  });

  it('passes correct handlers to mutation', async () => {
    const user = userEvent.setup();
    render(<GoogleLoginButton />);

    await user.click(screen.getByTestId('social-button'));

    // Verify the mutation was called with the notification handlers
    expect(mockMutate).toHaveBeenCalledWith(undefined, {
      onSuccess: mockHandleSuccess,
      onError: mockHandleError,
    });
  });
});
