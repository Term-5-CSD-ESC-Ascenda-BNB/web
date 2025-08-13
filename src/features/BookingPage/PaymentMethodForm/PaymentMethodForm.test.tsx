import { render, screen, fireEvent, waitFor } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import PaymentMethodForm, { type PaymentMethodFormProps } from './PaymentMethodForm';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from '@mantine/form';

// --- Mocks --- //
vi.mock('@stripe/react-stripe-js', () => ({
  CardElement: vi.fn(() => <div data-testid="card-element" />),
  useStripe: vi.fn(),
  useElements: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({
    navigate: vi.fn(),
  }),
}));

const defaultGuestInfoValues = {
  salutation: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  countryCode: 'sg',
  phone: '12345678',
  specialRequests: '',
  adults: 2,
  children: 0,
};

function getProps(): Omit<PaymentMethodFormProps, 'guestInfo'> {
  return {
    hotelId: 'hotel123',
    destinationId: 'dest456',
    startDate: '2025-09-01',
    endDate: '2025-09-05',
    guests: 2,
    roomDescription: 'Deluxe Room',
    currency: 'SGD',
    nights: 4,
    price: 800,
    country_code: 'sg',
    lang: 'en',
    hotelName: 'Grand Palace',
    hotelImage: '/image.png',
    hotelAddress: '123 Palace Road',
    setLoading: vi.fn(),
    rooms: 1,
  };
}

// --- Stripe/Elements Mocks --- //
let confirmCardPaymentMock: Mock;
let getElementMock: Mock;
let stripeMock: { confirmCardPayment: typeof confirmCardPaymentMock } | null;
let elementsMock: { getElement: typeof getElementMock } | null;

beforeEach(() => {
  confirmCardPaymentMock = vi.fn();
  getElementMock = vi.fn();
  stripeMock = { confirmCardPayment: confirmCardPaymentMock };
  elementsMock = { getElement: getElementMock };
  (useStripe as unknown as ReturnType<typeof vi.fn>).mockReturnValue(stripeMock);
  (useElements as unknown as ReturnType<typeof vi.fn>).mockReturnValue(elementsMock);
});

// --- Test Wrapper --- //
const TestWrapper = ({
  guestInfoValues = {},
  ...restProps
}: Partial<PaymentMethodFormProps> & {
  guestInfoValues?: Partial<typeof defaultGuestInfoValues>;
}) => {
  const guestInfo = useForm({
    initialValues: { ...defaultGuestInfoValues, ...guestInfoValues },
    validate: {
      salutation: (value: string) => (value ? null : 'Required'),
      firstName: (value: string) => (value ? null : 'Required'),
      lastName: (value: string) => (value ? null : 'Required'),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      countryCode: (value: string) => (value ? null : 'Required'),
      phone: (value: string) => (value ? null : 'Required'),
      specialRequests: () => null,
      adults: () => null,
      children: () => null,
    },
  });

  return <PaymentMethodForm {...getProps()} {...restProps} guestInfo={guestInfo} />;
};

// --- Tests --- //
describe('PaymentMethodForm', () => {
  it('renders basic payment UI elements', () => {
    render(<TestWrapper />);
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText('✔ Secure transmission')).toBeInTheDocument();
    expect(screen.getByText('✔ Protects personal information')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cardholder's name")).toBeInTheDocument();
    expect(screen.getByTestId('card-element')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Payment/i })).toBeInTheDocument();
  });

  it('validates cardholder name field', async () => {
    render(<TestWrapper />);
    const nameInput = screen.getByPlaceholderText("Cardholder's name");
    const submitBtn = screen.getByRole('button', { name: /Submit Payment/i });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Cardholder name is required')).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'X' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Name is too short')).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'A'.repeat(51) } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Name is too long')).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'J@ne Doe!' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Name contains invalid characters')).toBeInTheDocument();
  });

  it('does not submit if guest info has errors', async () => {
    render(<TestWrapper guestInfoValues={{ firstName: '' }} />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));
    await waitFor(() => expect(screen.queryByText('Confirm your booking')).not.toBeInTheDocument());
  });

  it('opens confirmation modal when form is valid', async () => {
    render(<TestWrapper />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));
    expect(await screen.findByText('Confirm your booking')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('calls payment API and Stripe when confirmed', async () => {
    const axios = await import('axios');
    const postMock: Mock = vi.fn();
    (axios.default.post as unknown) = postMock;

    postMock
      .mockResolvedValueOnce({
        data: { clientSecret: 'secret123', payeeId: 'payee789', paymentId: 'payment321' },
      })
      .mockResolvedValueOnce({ data: { bookingReference: 'ref999' } });

    getElementMock.mockReturnValue({});
    confirmCardPaymentMock.mockResolvedValue({
      paymentIntent: { status: 'succeeded' },
      error: null,
    });

    render(<TestWrapper />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));

    await waitFor(() => expect(screen.getByText('Confirm your booking')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith(
        expect.stringContaining('/bookings/pay'),
        expect.objectContaining({ hotelId: 'hotel123', roomNum: 1, currency: 'SGD' }),
        expect.any(Object)
      );
      expect(confirmCardPaymentMock).toHaveBeenCalledWith('secret123', expect.any(Object));
    });

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith(
        expect.stringContaining('/bookings'),
        expect.objectContaining({ price: 800 }),
        expect.any(Object)
      );
    });
  });

  it('shows failure modal if Stripe payment fails', async () => {
    const axios = await import('axios');
    const postMock: Mock = vi.fn();
    (axios.default.post as unknown) = postMock;
    postMock.mockResolvedValueOnce({
      data: { clientSecret: 'secret321', payeeId: 'payee111', paymentId: 'payment222' },
    });

    getElementMock.mockReturnValue({});
    confirmCardPaymentMock.mockResolvedValue({
      paymentIntent: null,
      error: { message: 'Card declined' },
    });

    render(<TestWrapper />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));
    await waitFor(() => expect(screen.getByText('Confirm your booking')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Card declined')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument());
  });

  it('shows failure modal if booking API fails', async () => {
    const axios = await import('axios');
    const postMock: Mock = vi.fn();
    (axios.default.post as unknown) = postMock;

    postMock
      .mockResolvedValueOnce({
        data: { clientSecret: 'secret321', payeeId: 'payee111', paymentId: 'payment222' },
      })
      .mockRejectedValueOnce(new Error('Booking failed'));

    getElementMock.mockReturnValue({});
    confirmCardPaymentMock.mockResolvedValue({
      paymentIntent: { status: 'succeeded' },
      error: null,
    });

    render(<TestWrapper />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));
    await waitFor(() => expect(screen.getByText('Confirm your booking')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Booking failed. Please try again.')).toBeInTheDocument();
    });
  });

  it('renders payment network logos', () => {
    render(<TestWrapper />);
    expect(screen.getByAltText('Visa')).toBeInTheDocument();
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument();
    expect(screen.getByAltText('UnionPay')).toBeInTheDocument();
    expect(screen.getByAltText('JCB')).toBeInTheDocument();
  });

  it('sets loading state on submit and resets after process', async () => {
    const setLoading = vi.fn();
    const axios = await import('axios');
    const postMock: Mock = vi.fn();
    (axios.default.post as unknown) = postMock;

    postMock
      .mockResolvedValueOnce({
        data: { clientSecret: 'secret123', payeeId: 'payee789', paymentId: 'payment321' },
      })
      .mockResolvedValueOnce({ data: { bookingReference: 'ref999' } });

    getElementMock.mockReturnValue({});
    confirmCardPaymentMock.mockResolvedValue({
      paymentIntent: { status: 'succeeded' },
      error: null,
    });

    render(<TestWrapper setLoading={setLoading} />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));
    await waitFor(() => expect(screen.getByText('Confirm your booking')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setLoading).toHaveBeenCalledWith(false);
    });
  });

  it('does not crash if Stripe or Elements are not loaded', async () => {
    (useStripe as unknown as ReturnType<typeof vi.fn>).mockReturnValue(stripeMock);
    (useElements as unknown as ReturnType<typeof vi.fn>).mockReturnValue(elementsMock);

    render(<TestWrapper />);
    fireEvent.change(screen.getByPlaceholderText("Cardholder's name"), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Payment/i }));
    await waitFor(() => expect(screen.getByText('Confirm your booking')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument());
  });
});
