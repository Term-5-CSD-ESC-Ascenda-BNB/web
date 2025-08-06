import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useLandingHotels } from './useLandingHotels';
import type { HotelsResponse } from '@/schemas/hotelResults';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/ApiError';

// Mock the SearchPage API
vi.mock('@/features/SearchPage/api', () => ({
  fetchHotels: vi.fn(),
}));

// Import the mocked function
import { fetchHotels } from '@/features/SearchPage/api';
const mockFetchHotels = vi.mocked(fetchHotels);

// Mock console methods to avoid noise in tests
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  log: vi.spyOn(console, 'log').mockImplementation(() => {}),
};

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount) => failureCount < 2, // Match the hook's retry logic
        gcTime: 0,
        refetchInterval: false, // Disable auto-refetch for most tests
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

// Mock data
const mockHotelsResponse: HotelsResponse = {
  completed: true,
  currency: 'SGD',
  hotelsTotalLength: 2,
  hotels: [
    {
      id: 'hotel-1',
      searchRank: 1,
      price: 300, // This will be divided by nights (1 night = 300/1 = 300)
      latitude: 1.3521,
      longitude: 103.8198,
      name: 'Test Hotel 1',
      address: '123 Test St',
      rating: 4.5,
      score: 85, // This will be divided by 10 = 8.5
      image_details: {
        suffix: 'jpg',
        count: 5,
        prefix: 'test-prefix',
      },
    },
    {
      id: 'hotel-2',
      searchRank: 2,
      price: 600, // This will be divided by nights (1 night = 600/1 = 600)
      latitude: 1.36,
      longitude: 103.83,
      name: 'Test Hotel 2',
      address: '456 Test Ave',
      rating: 4.8,
      score: 90, // This will be divided by 10 = 9.0
      image_details: {
        suffix: 'jpg',
        count: 3,
        prefix: 'test-prefix-2',
      },
    },
  ],
};

const _mockIncompleteResponse: HotelsResponse = {
  ...mockHotelsResponse,
  completed: false,
};

const mockErrorResponse: AxiosError<ApiError> = {
  name: 'AxiosError',
  message: 'Request failed',
  isAxiosError: true,
  response: {
    data: {
      message: 'API Error',
      status: 500,
    },
    status: 500,
    statusText: 'Internal Server Error',
    headers: {},
    config: {} as never,
  },
  config: {} as never,
  toJSON: () => ({}),
};

describe('useLandingHotels', () => {
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    wrapper = createWrapper();
    vi.clearAllMocks();
    // Set default successful response - individual tests can override this
    mockFetchHotels.mockResolvedValue(mockHotelsResponse);
  });

  afterEach(() => {
    consoleSpy.error.mockClear();
    consoleSpy.log.mockClear();
  });

  describe('Basic functionality', () => {
    it('should fetch and return hotel data', async () => {
      const { result } = renderHook(() => useLandingHotels(), { wrapper });

      // Initially loading
      expect(result.current.isLoading).toBe(true);

      // Wait for query to complete
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeDefined();
      expect(mockFetchHotels).toHaveBeenCalledTimes(1);
    });

    it('transforms hotel data correctly', async () => {
      const { result } = renderHook(() => useLandingHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const transformedData = result.current.data!;
      expect(transformedData.completed).toBe(true);
      expect(transformedData.currency).toBe('SGD');
      expect(transformedData.hotels).toHaveLength(2);

      // Check first hotel transformation
      const hotel1 = transformedData.hotels[0];
      expect(hotel1.id).toBe('hotel-1');
      expect(hotel1.price).toBe(300); // 300 / 1 night
      expect(hotel1.score).toBe(8.5); // 85 / 10

      // Check second hotel transformation
      const hotel2 = transformedData.hotels[1];
      expect(hotel2.id).toBe('hotel-2');
      expect(hotel2.price).toBe(600); // 600 / 1 night
      expect(hotel2.score).toBe(9.0); // 90 / 10
    });

    it('handles hotels with null scores correctly', async () => {
      const responseWithNullScore: HotelsResponse = {
        ...mockHotelsResponse,
        hotels: [
          {
            ...mockHotelsResponse.hotels[0],
            score: null,
          },
        ],
      };

      // Clear the default mock and set up null score response
      mockFetchHotels.mockReset();
      mockFetchHotels.mockResolvedValueOnce(responseWithNullScore);

      const { result } = renderHook(() => useLandingHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const transformedData = result.current.data!;
      expect(transformedData.hotels[0].score).toBe(null);
    });

    it('calls fetchHotels with correct hardcoded parameters', async () => {
      renderHook(() => useLandingHotels(), { wrapper });

      await waitFor(() => {
        expect(mockFetchHotels).toHaveBeenCalledTimes(1);
      });

      const calledParams = mockFetchHotels.mock.calls[0][0] as {
        destination_id: string;
        checkin: string;
        checkout: string;
        country_code: string;
        lang: string;
        currency: string;
        guests: string;
      };

      expect(calledParams).toMatchObject({
        destination_id: 'RsBU',
        country_code: 'SG',
        lang: 'en_US',
        currency: 'SGD',
        guests: '1',
      });

      // Check that checkin and checkout are future dates
      expect(calledParams.checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(calledParams.checkout).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Verify checkout is after checkin
      const checkinDate = new Date(calledParams.checkin);
      const checkoutDate = new Date(calledParams.checkout);
      expect(checkoutDate.getTime()).toBeGreaterThan(checkinDate.getTime());
    });
  });

  describe('Error handling', () => {
    it('handles API errors correctly', async () => {
      // Clear the default mock and set up persistent error response
      mockFetchHotels.mockReset();
      mockFetchHotels.mockRejectedValue(mockErrorResponse);

      const { result } = renderHook(() => useLandingHotels(), { wrapper });

      // Wait for the query to finish retrying and settle into error state
      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('Edge cases', () => {
    it('handles empty hotels array', async () => {
      const emptyResponse: HotelsResponse = {
        ...mockHotelsResponse,
        hotels: [],
        hotelsTotalLength: 0,
      };

      // Clear the default mock and set up empty response
      mockFetchHotels.mockReset();
      mockFetchHotels.mockResolvedValueOnce(emptyResponse);

      const { result } = renderHook(() => useLandingHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const transformedData = result.current.data!;
      expect(transformedData.hotels).toEqual([]);
      expect(transformedData.hotelsTotalLength).toBe(0);
    });

    it('preserves all hotel properties except score and price', async () => {
      const { result } = renderHook(() => useLandingHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const originalHotel = mockHotelsResponse.hotels[0];
      const transformedHotel = result.current.data!.hotels[0];

      // Check that all properties except score and price are preserved
      expect(transformedHotel.id).toBe(originalHotel.id);
      expect(transformedHotel.searchRank).toBe(originalHotel.searchRank);
      expect(transformedHotel.latitude).toBe(originalHotel.latitude);
      expect(transformedHotel.longitude).toBe(originalHotel.longitude);
      expect(transformedHotel.name).toBe(originalHotel.name);
      expect(transformedHotel.address).toBe(originalHotel.address);
      expect(transformedHotel.rating).toBe(originalHotel.rating);
      expect(transformedHotel.image_details).toEqual(originalHotel.image_details);

      // Check that score and price were transformed
      expect(transformedHotel.score).toBe(originalHotel.score! / 10);
      expect(transformedHotel.price).toBe(originalHotel.price / 1); // 1 night stay
    });
  });
});
