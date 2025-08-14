import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

// const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api-production-46df.up.railway.app';

export interface BookingSummary {
  country: string;
  count: number;
}

export interface UserProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  provider: string | null;
  providerId: string | null;
  stripeCustomerId: string | null;
  bookings: BookingSummary[] | [null];
}

export interface UseProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  isError: boolean;
  isUnauthenticated: boolean;
  error: AxiosError | null;
}

const USE_MOCK = false;

const fetchUserProfile = async (): Promise<UserProfile> => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: 1,
      createdAt: '2025-07-01T00:00:00.000Z',
      updatedAt: '2025-07-01T00:00:00.000Z',
      email: 'ronald@gmail.com',
      emailVerified: true,
      firstName: 'Ronald',
      lastName: 'McDonald',
      provider: null,
      providerId: null,
      stripeCustomerId: null,
      bookings: [
        { country: 'France', count: 4 },
        { country: 'Japan', count: 3 },
        { country: 'Canada', count: 2 },
      ],
    };
  } else {
    const response = await axios.get<UserProfile>(`https://api-production-46df.up.railway.app/me`, {
      withCredentials: true,
    });
    return response.data;
  }
};

export function useProfile(): UseProfileResult {
  const { data, error, isLoading, isError } = useQuery<UserProfile, AxiosError>({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
    staleTime: 1,
    gcTime: 1,
    retry: (failureCount, error) => {
      // Type guard to ensure error is AxiosError
      if (axios.isAxiosError(error)) {
        return error.response?.status !== 401 && failureCount < 2;
      }
      return failureCount < 2;
    },
  });

  const isUnauthenticated = error?.response?.status === 401;

  return {
    profile: data ?? null,
    isLoading,
    isError,
    isUnauthenticated,
    error: error ?? null,
  };
}
