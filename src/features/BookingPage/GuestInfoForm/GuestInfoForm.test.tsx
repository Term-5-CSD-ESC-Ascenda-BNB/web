import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import GuestInfoForm from './GuestInfoForm';
import { render, screen } from '@/tests/utils';

describe('GuestInfoForm', () => {
  it('renders all form inputs', () => {
    render(<GuestInfoForm />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/special requests/i)).toBeInTheDocument();
  });

  it('allows the user to type into the inputs', async () => {
    const user = userEvent.setup();
    render(<GuestInfoForm />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Phone Number'), '123456789');
    await user.type(screen.getByPlaceholderText(/special requests/i), 'Late check-in, please.');

    expect(screen.getByPlaceholderText('First Name')).toHaveValue('John');
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue('Doe');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('john@example.com');
    expect(screen.getByPlaceholderText('Phone Number')).toHaveValue('123456789');
    expect(screen.getByPlaceholderText(/special requests/i)).toHaveValue('Late check-in, please.');
  });
});
