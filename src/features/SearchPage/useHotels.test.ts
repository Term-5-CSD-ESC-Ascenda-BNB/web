import { renderHook, waitFor } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useHotels } from './useHotels';
import * as api from './api';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';
import type { HotelsResponse } from '@/schemas/hotelResults';
import type { SearchParams } from '@/schemas/searchParams';

// Mock the API
vi.mock('./api', () => ({
  fetchHotels: vi.fn(),
}));

// Mock the utils
vi.mock('@/utils/stringifyGuestsRooms', () => ({
  stringifyGuestsRooms: vi.fn(),
}));

// Mock the router
vi.mock('@tanstack/react-router', () => ({
  useSearch: vi.fn(),
}));

const mockedFetchHotels = api.fetchHotels as ReturnType<typeof vi.fn>;
const mockedStringifyGuestsRooms = stringifyGuestsRooms as ReturnType<typeof vi.fn>;

// Import the mocked useSearch
import { useSearch } from '@tanstack/react-router';
const mockedUseSearch = useSearch as ReturnType<typeof vi.fn>;

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2, // Allow retries for testing
        gcTime: 0,
        staleTime: 0,
        retryDelay: 0, // No delay between retries for faster tests
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useHotels', () => {
  let wrapper: ReturnType<typeof createWrapper>;
  let _consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let _consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  const mockSearchParams: SearchParams = {
    uid: 'test-destination-id',
    term: 'Singapore, Singapore',
    date: ['2024-12-01', '2024-12-03'], // 2 nights
    guests: 2,
    rooms: 1,
    sortBy: 'rating' as const,
    sortOrder: 'desc' as const,
    page: 1,
  };

  const mockHotelsResponse: HotelsResponse = {
    completed: true,
    currency: 'SGD',
    hotelsTotalLength: 2,
    hotels: [
      {
        id: 'hotel-1',
        searchRank: 1,
        price: 200, // Will be divided by nights (2) = 100 per night
        latitude: 1.3521,
        longitude: 103.8198,
        name: 'Test Hotel 1',
        address: 'Test Address 1',
        rating: 4,
        score: 85, // Will be divided by 10 = 8.5
        image_details: {
          suffix: '.jpg',
          count: 5,
          prefix: 'https://example.com/images/',
        },
      },
      {
        id: 'hotel-2',
        searchRank: 2,
        price: 300, // Will be divided by nights (2) = 150 per night
        latitude: 1.3521,
        longitude: 103.8198,
        name: 'Test Hotel 2',
        address: 'Test Address 2',
        rating: 5,
        score: null,
        image_details: {
          suffix: '.jpg',
          count: 3,
          prefix: 'https://example.com/images/',
        },
      },
    ],
  };

  beforeEach(() => {
    wrapper = createWrapper();
    vi.clearAllMocks();

    // Set up default mocks
    mockedUseSearch.mockReturnValue(mockSearchParams);
    mockedStringifyGuestsRooms.mockReturnValue('2');
    mockedFetchHotels.mockResolvedValue(mockHotelsResponse);

    // Suppress console output for cleaner test output
    _consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    _consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Restore console methods
    _consoleErrorSpy?.mockRestore();
    _consoleWarnSpy?.mockRestore();
  });

  describe('successful data fetching', () => {
    it('should fetch hotels with correct parameters', async () => {
      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedFetchHotels).toHaveBeenCalledWith({
        destination_id: 'test-destination-id',
        checkin: '2024-12-01',
        checkout: '2024-12-03',
        country_code: 'SG',
        lang: 'en_US',
        currency: 'SGD',
        guests: '2',
        sort: 'rating',
        order: 'desc',
        page: 1,
      });

      expect(mockedStringifyGuestsRooms).toHaveBeenCalledWith(2, 1);
    });

    it('should transform hotel data correctly', async () => {
      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const data = result.current.data;
      expect(data).toBeDefined();
      expect(data?.hotels).toHaveLength(2);

      // Check first hotel transformation
      const hotel1 = data?.hotels[0];
      expect(hotel1?.score).toBe(8.5); // 85 / 10
      expect(hotel1?.price).toBe(100); // 200 / 2 nights

      // Check second hotel transformation
      const hotel2 = data?.hotels[1];
      expect(hotel2?.score).toBe(null); // null score remains null
      expect(hotel2?.price).toBe(150); // 300 / 2 nights
    });

    it('should handle missing search parameters gracefully', async () => {
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        uid: undefined, // This will trigger the || '' fallback
        page: undefined, // This will trigger the || 1 fallback
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedFetchHotels).toHaveBeenCalledWith(
        expect.objectContaining({
          destination_id: '', // Should use empty string fallback
          page: 1, // Should use 1 fallback
        })
      );
    });

    it('should handle falsy uid and page values', async () => {
      // Test with null values
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        uid: null,
        page: null,
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedFetchHotels).toHaveBeenCalledWith(
        expect.objectContaining({
          destination_id: '', // Should use empty string fallback
          page: 1, // Should use 1 fallback
        })
      );
    });

    it('should handle zero page value', async () => {
      // Test with page: 0 which is falsy
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        page: 0,
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedFetchHotels).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1, // Should use 1 fallback when page is 0
        })
      );
    });
  });

  describe('query configuration', () => {
    it('should retry failed requests up to 2 times', async () => {
      const error = new Error('Network Error');
      mockedFetchHotels.mockRejectedValue(error);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 5000 }
      );

      // Should be called 3 times (initial + 2 retries)
      expect(mockedFetchHotels).toHaveBeenCalledTimes(3);
    });

    it('should use correct query key', async () => {
      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // The query key should include 'hotels' and the params
      expect(mockedFetchHotels).toHaveBeenCalledWith(
        expect.objectContaining({
          destination_id: 'test-destination-id',
          checkin: '2024-12-01',
          checkout: '2024-12-03',
        })
      );
    });
  });

  describe('refetch interval behavior', () => {
    it('should stop refetching when data is completed', async () => {
      const completedResponse = { ...mockHotelsResponse, completed: true };
      mockedFetchHotels.mockResolvedValue(completedResponse);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data?.completed).toBe(true);
      });

      // The refetchInterval should return false for completed data
      expect(result.current.data?.completed).toBe(true);
    });

    it('should continue refetching when data is not completed', async () => {
      const incompleteResponse = { ...mockHotelsResponse, completed: false };
      mockedFetchHotels.mockResolvedValue(incompleteResponse);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data?.completed).toBe(false);
      });

      // The hook should continue refetching for incomplete data
      expect(result.current.data?.completed).toBe(false);
    });

    it('should stop refetching on error', async () => {
      const error = new Error('Network Error');
      mockedFetchHotels.mockRejectedValue(error);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 5000 }
      );

      // Should have error status
      expect(result.current.error).toBeDefined();
    });
  });

  describe('date calculations', () => {
    it('should calculate nights correctly for different date ranges', async () => {
      // Test with different date ranges
      const testCases = [
        { checkin: '2024-12-01', checkout: '2024-12-02', nights: 1 },
        { checkin: '2024-12-01', checkout: '2024-12-04', nights: 3 },
        { checkin: '2024-12-01', checkout: '2024-12-08', nights: 7 },
      ];

      for (const testCase of testCases) {
        mockedUseSearch.mockReturnValue({
          ...mockSearchParams,
          date: [testCase.checkin, testCase.checkout],
        });

        const { result, rerender } = renderHook(() => useHotels(), { wrapper });

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(true);
        });

        const expectedPricePerNight = 200 / testCase.nights;
        expect(result.current.data?.hotels[0]?.price).toBe(
          Number(expectedPricePerNight.toFixed(2))
        );

        rerender();
      }
    });
  });

  describe('parameter validation', () => {
    it('should handle all optional search parameters', async () => {
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        sortBy: 'price',
        sortOrder: 'asc',
        page: 2,
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedFetchHotels).toHaveBeenCalledWith(
        expect.objectContaining({
          sort: 'price',
          order: 'asc',
          page: 2,
        })
      );
    });

    it('should call stringifyGuestsRooms with correct parameters', () => {
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        guests: 4,
        rooms: 2,
      });

      renderHook(() => useHotels(), { wrapper });

      expect(mockedStringifyGuestsRooms).toHaveBeenCalledWith(4, 2);
    });
  });

  describe('error handling', () => {
    it('should handle API errors correctly', async () => {
      const apiError = new Error('Request failed');
      mockedFetchHotels.mockRejectedValue(apiError);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 5000 }
      );

      expect(result.current.error).toBe(apiError);
      expect(result.current.data).toBeUndefined();
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      mockedFetchHotels.mockRejectedValue(networkError);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 5000 }
      );

      expect(result.current.error).toBe(networkError);
    });
  });

  describe('data transformations', () => {
    it('should handle hotels with null scores', async () => {
      const responseWithNullScore = {
        ...mockHotelsResponse,
        hotels: [
          {
            ...mockHotelsResponse.hotels[0],
            score: null,
          },
        ],
      };

      mockedFetchHotels.mockResolvedValue(responseWithNullScore);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.hotels[0]?.score).toBe(null);
    });

    it('should correctly format price per night', async () => {
      const responseWithHighPrice = {
        ...mockHotelsResponse,
        hotels: [
          {
            ...mockHotelsResponse.hotels[0],
            price: 999.99, // Should be divided by 2 nights = 499.995, rounded to 500.00
          },
        ],
      };

      mockedFetchHotels.mockResolvedValue(responseWithHighPrice);

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.hotels[0]?.price).toBe(500.0);
    });
  });
});
