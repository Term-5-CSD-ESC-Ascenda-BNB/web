// src/components/RegisterForm/RegisterForm.test.tsx
import { render, screen, waitFor } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterForm } from './RegisterForm';

// Mocks and shared state
const mockMutate = vi.fn();
const mockHandleSuccess = vi.fn();
const mockHandleError = vi.fn();
let mockIsPending = false;

// Mock only the mutation and notifications hooks, leave form validation intact
vi.mock('./hooks/useRegisterMutation', () => ({
  useRegisterMutation: () => ({ mutate: mockMutate, isPending: mockIsPending }),
}));
vi.mock('./hooks/useRegisterNotifications', () => ({
  useRegisterNotifications: () => ({
    handleSuccess: mockHandleSuccess,
    handleError: mockHandleError,
  }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsPending = false;
  });

  it('renders all form fields and the submit button', () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('disables submit button when mutation is pending', () => {
    mockIsPending = true;
    render(<RegisterForm />);

    const button = screen.getByRole('button', { name: /sign up/i });
    expect(button).toBeDisabled();
  });

  it('displays error state for firstName when validation fails', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Leave firstName empty and try to submit
    await user.click(submitButton);

    await waitFor(() => {
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('displays error state for lastName when validation fails', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const lastNameInput = screen.getByPlaceholderText('Last name');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Leave lastName empty and try to submit
    await user.click(submitButton);

    await waitFor(() => {
      expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('displays error state for email when validation fails', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter invalid email and try to submit
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('displays error state for password when validation fails', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter weak password and try to submit
    await user.type(passwordInput, 'weak');
    await user.click(submitButton);

    await waitFor(() => {
      // For PasswordInput, check if the input has data-invalid attribute
      expect(passwordInput).toHaveAttribute('data-invalid', 'true');
    });
  });

  it('displays error state for confirmPassword when validation fails', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter mismatched passwords and try to submit
    await user.type(passwordInput, 'StrongP@ss1');
    await user.type(confirmPasswordInput, 'DifferentP@ss1');
    await user.click(submitButton);

    await waitFor(() => {
      // For PasswordInput, check if the input has data-invalid attribute
      expect(confirmPasswordInput).toHaveAttribute('data-invalid', 'true');
    });
  });

  it('displays multiple error states simultaneously', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // Enter invalid data in all fields
    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'weak');
    await user.type(confirmPasswordInput, 'different');
    // firstName and lastName are left empty

    await user.click(submitButton);

    await waitFor(() => {
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
      expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      // For PasswordInput components, check data-invalid instead
      expect(passwordInput).toHaveAttribute('data-invalid', 'true');
      expect(confirmPasswordInput).toHaveAttribute('data-invalid', 'true');
    });
  });

  it('does not show error states when fields are valid', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');

    // Enter valid data in all fields
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(passwordInput, 'StrongP@ss1');
    await user.type(confirmPasswordInput, 'StrongP@ss1');

    // All fields should not have error state
    expect(firstNameInput).not.toHaveAttribute('aria-invalid', 'true');
    expect(lastNameInput).not.toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
    expect(passwordInput).not.toHaveAttribute('data-invalid', 'true');
    expect(confirmPasswordInput).not.toHaveAttribute('data-invalid', 'true');
  });

  it('clears error state when user corrects input', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const firstNameInput = screen.getByPlaceholderText('First name');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    // First trigger an error by submitting with empty firstName
    await user.click(submitButton);

    await waitFor(() => {
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
    });

    // Now fix the error by entering a valid firstName
    await user.type(firstNameInput, 'John');

    await waitFor(() => {
      expect(firstNameInput).not.toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('submits form with valid data and omits confirmPassword', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    // Fill out all fields with valid data
    await user.type(screen.getByPlaceholderText('First name'), 'John');
    await user.type(screen.getByPlaceholderText('Last name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Enter your email'), 'john.doe@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'StrongP@ss1');
    await user.type(screen.getByPlaceholderText('Confirm password'), 'StrongP@ss1');

    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'StrongP@ss1',
          // confirmPassword should be omitted
        },
        { onSuccess: mockHandleSuccess, onError: mockHandleError }
      );
    });
  });
});
