// src/features/BookingPage/GuestInfoForm/GuestInfoForm.test.tsx
import { render, screen, fireEvent } from '@/tests/utils';
import { MantineProvider } from '@mantine/core';
import { useForm } from '@mantine/form';
import GuestInfoForm from './GuestInfoForm';
import { describe, it, expect, test } from 'vitest';

function GuestInfoFormTestWrapper({ guests }: { guests: number }) {
  const guestInfo = useForm({
    initialValues: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: 'us',
      phone: '',
      specialRequests: '',
      adults: guests,
      children: 0,
    },
  });

  return <GuestInfoForm guestInfo={guestInfo} guests={guests} />;
}

describe('GuestInfoForm', () => {
  test('renders all input fields', () => {
    render(<GuestInfoFormTestWrapper guests={3} />);

    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Adults:/i)).toBeInTheDocument();
    expect(screen.getByText(/Children:/i)).toBeInTheDocument();
  });

  test('updates adults and children counters correctly', () => {
    render(<GuestInfoFormTestWrapper guests={3} />);

    // Adults Counter plus button
    const adultsIncrementBtn = screen.getAllByRole('button', { name: /increment/i })[0];
    fireEvent.click(adultsIncrementBtn);
    expect(screen.getByText('3')).toBeInTheDocument(); // Should update adults count

    // Children Counter plus button
    const childrenIncrementBtn = screen.getAllByRole('button', { name: /increment/i })[1];
    fireEvent.click(childrenIncrementBtn);
    expect(screen.getByText('1')).toBeInTheDocument(); // Should update children count
  });
});
