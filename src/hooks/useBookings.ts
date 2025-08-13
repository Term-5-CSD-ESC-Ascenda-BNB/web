import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

// const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api-production-46df.up.railway.app';

export interface BookingDetails {
  createdAt: string;
  updatedAt: string;
  price: number;
  userId: number;
  bookingReference: string;
  destinationId: string;
  hotelId: string;
  startDate: string;
  endDate: string;
  numberOfNights: number;
  adults: number;
  children: number;
  messageToHotel: string | null;
  roomTypes: string[];
  salutation: string;
  firstName: string;
  lastName: string;
  paymentId: string | undefined;
}

export interface UseBookingResult {
  bookings: BookingDetails[] | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
}

const USE_MOCK = true;

const fetchBookings = async (): Promise<BookingDetails[]> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        createdAt: '2025-07-01T00:00:00.000Z',
        updatedAt: '2025-07-01T00:00:00.000Z',
        price: 69,
        userId: 320,
        bookingReference: 'BKNG-20250730-81979',
        destinationId: 'RsBU',
        hotelId: 'jOZC',
        startDate: '2025-10-10',
        endDate: '2025-10-17',
        numberOfNights: 6,
        adults: 1,
        children: 1,
        messageToHotel: 'Late check-in please',
        roomTypes: ['standard-room'],
        salutation: 'Mr.',
        firstName: 'John',
        lastName: 'Doe',
        paymentId: 'PAY123',
      },
    ];
  } else {
    const response = await axios.get<BookingDetails[]>(
      `https://api-production-46df.up.railway.app/bookings`
    );
    return response.data;
  }
};

export function useBookings(): UseBookingResult {
  const { data, error, isLoading, isError } = useQuery<BookingDetails[], AxiosError>({
    queryKey: ['profile'],
    queryFn: fetchBookings,
    staleTime: 5 * 1000,
    gcTime: 5 * 1000,
    retry: (failureCount, error) => {
      // Type guard to ensure error is AxiosError
      if (axios.isAxiosError(error)) {
        return error.response?.status !== 401 && failureCount < 3;
      }
      return failureCount < 3;
    },
  });

  return {
    bookings: data ?? null,
    isLoading,
    isError,
    error: error ?? null,
  };
}
