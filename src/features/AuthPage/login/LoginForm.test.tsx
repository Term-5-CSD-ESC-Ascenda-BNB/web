// src/components/LoginForm/LoginForm.test.tsx
import { render, screen, waitFor } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';

// Mocks and shared state
const mockMutate = vi.fn();
const mockHandleSuccess = vi.fn();
const mockHandleError = vi.fn();
let mockIsPending = false;

// Mock mutation and notifications hooks
vi.mock('./hooks/useLoginMutation', () => ({
  useLoginMutation: () => ({ mutate: mockMutate, isPending: mockIsPending }),
}));
vi.mock('./hooks/useLoginNotifications', () => ({
  useLoginNotifications: () => ({
    handleSuccess: mockHandleSuccess,
    handleError: mockHandleError,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsPending = false;
  });

  it('renders email and password fields and the sign in button', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });

  it('disables submit button when mutation is pending', () => {
    mockIsPending = true;
    render(<LoginForm />);

    const button = screen.getByRole('button', { name: /Log in/i });
    expect(button).toBeDisabled();
  });

  it('displays error state for email when invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('displays error state for password when invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    await user.type(passwordInput, 'weak');
    await user.click(submitButton);

    await waitFor(() => {
      // For PasswordInput, Mantine uses data-invalid
      expect(passwordInput).toHaveAttribute('data-invalid', 'true');
    });
  });

  it('displays both email and password errors if both invalid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'weak');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(passwordInput).toHaveAttribute('data-invalid', 'true');
    });
  });

  it('does not show error states when fields are valid', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'StrongP@ss1');

    expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
    expect(passwordInput).not.toHaveAttribute('data-invalid', 'true');
  });

  it('clears error state when user corrects input', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    // Correct the value
    await user.clear(emailInput);
    await user.type(emailInput, 'fixed@example.com');

    await waitFor(() => {
      expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'StrongP@ss1');

    await user.click(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          email: 'john.doe@example.com',
          password: 'StrongP@ss1',
        },
        { onSuccess: mockHandleSuccess, onError: mockHandleError }
      );
    });
  });
});
