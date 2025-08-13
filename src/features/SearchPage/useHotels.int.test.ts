/**
 * Integration tests for useHotels hook
 *
 * integration tests for real behavior with mocked HTTP responses using MSW
 *
 * Tests covered:
 * - API integration with different response scenarios
 * - Data transformation (score division, price per night calculation)
 * - Error handling (404, 500, network errors)
 * - Retry mechanism behavior
 * - Polling behavior for incomplete data
 * - Parameter handling and validation
 * - Real-world scenarios (null scores, empty results)
 *
 * The tests use MSW to intercept HTTP requests and return controlled responses,
 * allowing us to test the full request-response cycle without hitting actual APIs.
 */

import { renderHook, waitFor } from '@/tests/utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { server, http, HttpResponse } from '@/tests/msw/setup';
import { useHotels } from './useHotels';
import type { HotelsResponse } from '@/schemas/hotelResults';
import type { SearchParams } from '@/schemas/searchParams';

// Mock the router
import { useSearch } from '@tanstack/react-router';
import { vi } from 'vitest';

vi.mock('@tanstack/react-router', () => ({
  useSearch: vi.fn(),
}));

vi.mock('@/utils/stringifyGuestsRooms', () => ({
  stringifyGuestsRooms: vi.fn(() => '2'),
}));

const mockedUseSearch = useSearch as ReturnType<typeof vi.fn>;

// Test data
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
      price: 200,
      latitude: 1.3521,
      longitude: 103.8198,
      name: 'Marina Bay Sands',
      address: '10 Bayfront Ave, Singapore 018956',
      rating: 5,
      score: 85,
      image_details: {
        suffix: '.jpg',
        count: 10,
        prefix: 'https://example.com/images/',
      },
    },
    {
      id: 'hotel-2',
      searchRank: 2,
      price: 150,
      latitude: 1.2966,
      longitude: 103.8558,
      name: 'Raffles Hotel',
      address: '1 Beach Rd, Singapore 189673',
      rating: 5,
      score: 92,
      image_details: {
        suffix: '.jpg',
        count: 8,
        prefix: 'https://example.com/images/',
      },
    },
  ],
};

const incompleteHotelsResponse: HotelsResponse = {
  ...mockHotelsResponse,
  completed: false,
  hotels: [mockHotelsResponse.hotels[0]], // Only first hotel initially
};

const completedHotelsResponse: HotelsResponse = {
  ...mockHotelsResponse,
  completed: true,
};

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        gcTime: 0,
        staleTime: 0,
        retryDelay: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useHotels Integration Tests', () => {
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    wrapper = createWrapper();
    mockedUseSearch.mockReturnValue(mockSearchParams);

    // Set up default mock handler for each test
    server.use(
      http.get('*/hotels/prices', ({ request }) => {
        const url = new URL(request.url);
        const params = Object.fromEntries(url.searchParams.entries());

        console.log('MSW intercepted request with params:', params);

        // Simulate different responses based on request parameters
        if (params.destination_id === 'error-destination') {
          return HttpResponse.json({ error: 'Destination not found' }, { status: 404 });
        }

        if (params.destination_id === 'server-error') {
          return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
        }

        if (params.destination_id === 'incomplete-destination') {
          return HttpResponse.json(incompleteHotelsResponse);
        }

        return HttpResponse.json(mockHotelsResponse);
      })
    );
  });

  describe('successful API integration', () => {
    it('should fetch and transform hotel data from real API calls', async () => {
      const { result } = renderHook(() => useHotels(), { wrapper });

      // Wait for the query to complete
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the hook state
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);

      // Verify transformed data
      const data = result.current.data;
      expect(data).toBeDefined();
      expect(data?.completed).toBe(true);
      expect(data?.currency).toBe('SGD');
      expect(data?.hotelsTotalLength).toBe(2);
      expect(data?.hotels).toHaveLength(2);

      // Verify score transformation (divided by 10)
      expect(data?.hotels[0]?.score).toBe(8.5); // 85 / 10
      expect(data?.hotels[1]?.score).toBe(9.2); // 92 / 10

      // Verify price transformation (divided by nights)
      expect(data?.hotels[0]?.price).toBe(100); // 200 / 2 nights
      expect(data?.hotels[1]?.price).toBe(75); // 150 / 2 nights

      // Verify other properties remain unchanged
      expect(data?.hotels[0]?.name).toBe('Marina Bay Sands');
      expect(data?.hotels[1]?.name).toBe('Raffles Hotel');
    });

    it('should handle different date ranges and calculate nights correctly', async () => {
      // Test with 1 night
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        date: ['2024-12-01', '2024-12-02'],
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Price should not be divided (1 night)
      expect(result.current.data?.hotels[0]?.price).toBe(200);
      expect(result.current.data?.hotels[1]?.price).toBe(150);
    });

    it('should handle week-long stays', async () => {
      // Test with 7 nights
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        date: ['2024-12-01', '2024-12-08'],
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Price should be divided by 7
      expect(result.current.data?.hotels[0]?.price).toBe(28.57); // 200 / 7 ≈ 28.57
      expect(result.current.data?.hotels[1]?.price).toBe(21.43); // 150 / 7 ≈ 21.43
    });
  });

  describe('error handling integration', () => {
    it('should handle 404 errors from API', async () => {
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        uid: 'error-destination',
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeDefined();
    });

    it('should handle 500 server errors', async () => {
      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        uid: 'server-error',
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeDefined();
    });

    it('should retry failed requests', async () => {
      let requestCount = 0;

      server.use(
        http.get('*/hotels/prices', () => {
          requestCount++;
          if (requestCount <= 2) {
            return HttpResponse.json({ error: 'Temporary error' }, { status: 500 });
          }
          return HttpResponse.json(mockHotelsResponse);
        })
      );

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isSuccess).toBe(true);
        },
        { timeout: 15000 }
      );

      // Should have retried and eventually succeeded
      expect(requestCount).toBe(3); // 1 initial + 2 retries
      expect(result.current.data).toBeDefined();
    });
  });

  describe('polling behavior integration', () => {
    it('should continue polling when data is incomplete', async () => {
      let requestCount = 0;

      server.use(
        http.get('*/hotels/prices', () => {
          requestCount++;
          if (requestCount === 1) {
            return HttpResponse.json(incompleteHotelsResponse);
          }
          return HttpResponse.json(completedHotelsResponse);
        })
      );

      const { result } = renderHook(() => useHotels(), { wrapper });

      // First request should return incomplete data
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data?.completed).toBe(false);
      });

      // Should eventually get completed data through polling
      await waitFor(
        () => {
          expect(result.current.data?.completed).toBe(true);
        },
        { timeout: 10000 }
      );

      expect(requestCount).toBeGreaterThan(1);
    }, 15000);

    it('should stop polling when error occurs', async () => {
      let requestCount = 0;

      server.use(
        http.get('*/hotels/prices', () => {
          requestCount++;
          if (requestCount === 1) {
            return HttpResponse.json(incompleteHotelsResponse);
          }
          return HttpResponse.json({ error: 'Server error during polling' }, { status: 500 });
        })
      );

      const { result } = renderHook(() => useHotels(), { wrapper });

      // First request should succeed with incomplete data
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data?.completed).toBe(false);
      });

      // Should eventually error out and stop polling
      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 10000 }
      );

      const finalRequestCount = requestCount;

      // Wait a bit more to ensure no additional requests
      await new Promise((resolve) => setTimeout(resolve, 6000));

      // Should not have made more requests after error
      expect(requestCount).toBe(finalRequestCount);
    }, 15000);
  });

  describe('parameter handling integration', () => {
    it('should send correct API parameters', async () => {
      let capturedParams: Record<string, string> = {};

      server.use(
        http.get('*/hotels/prices', ({ request }) => {
          const url = new URL(request.url);
          capturedParams = Object.fromEntries(url.searchParams.entries());
          return HttpResponse.json(mockHotelsResponse);
        })
      );

      mockedUseSearch.mockReturnValue({
        ...mockSearchParams,
        sortBy: 'price',
        sortOrder: 'asc',
        page: 2,
        minPrice: 50,
        maxPrice: 300,
        minRating: 4,
        minScore: 8,
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify all parameters were sent correctly
      expect(capturedParams).toMatchObject({
        destination_id: 'test-destination-id',
        checkin: '2024-12-01',
        checkout: '2024-12-03',
        country_code: 'SG',
        lang: 'en_US',
        currency: 'SGD',
        guests: '2',
        sort: 'price',
        order: 'asc',
        page: '2',
        minPrice: '50',
        maxPrice: '300',
        minRatings: '4',
        minScore: '8',
      });
    });

    it('should handle missing optional parameters', async () => {
      let capturedParams: Record<string, string> = {};

      server.use(
        http.get('*/hotels/prices', ({ request }) => {
          const url = new URL(request.url);
          capturedParams = Object.fromEntries(url.searchParams.entries());
          return HttpResponse.json(mockHotelsResponse);
        })
      );

      mockedUseSearch.mockReturnValue({
        uid: 'test-destination-id',
        term: 'Singapore, Singapore',
        date: ['2024-12-01', '2024-12-03'],
        guests: 2,
        rooms: 1,
        // No optional parameters
      });

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Should only include required parameters
      expect(capturedParams).toMatchObject({
        destination_id: 'test-destination-id',
        checkin: '2024-12-01',
        checkout: '2024-12-03',
        country_code: 'SG',
        lang: 'en_US',
        currency: 'SGD',
        guests: '2',
        page: '1', // Default fallback
      });

      // Optional parameters should not be present or should be default values
      expect(capturedParams.minPrice).toBeUndefined();
      expect(capturedParams.maxPrice).toBeUndefined();
      // Note: sort and order will have default values due to schema parsing
    });
  });

  describe('real-world scenarios', () => {
    it('should handle hotels with null scores', async () => {
      const responseWithNullScore: HotelsResponse = {
        ...mockHotelsResponse,
        hotels: [
          {
            ...mockHotelsResponse.hotels[0],
            score: null,
          },
          mockHotelsResponse.hotels[1],
        ],
      };

      server.use(
        http.get('*/hotels/prices', () => {
          return HttpResponse.json(responseWithNullScore);
        })
      );

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.hotels[0]?.score).toBe(null);
      expect(result.current.data?.hotels[1]?.score).toBe(9.2);
    });

    it('should handle empty hotel results', async () => {
      const emptyResponse: HotelsResponse = {
        completed: true,
        currency: 'SGD',
        hotelsTotalLength: 0,
        hotels: [],
      };

      server.use(
        http.get('*/hotels/prices', () => {
          return HttpResponse.json(emptyResponse);
        })
      );

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.hotels).toHaveLength(0);
      expect(result.current.data?.hotelsTotalLength).toBe(0);
    });

    it('should handle network timeout', async () => {
      server.use(
        http.get('*/hotels/prices', () => {
          // Simulate network timeout
          return HttpResponse.error();
        })
      );

      const { result } = renderHook(() => useHotels(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.isError).toBe(true);
        },
        { timeout: 15000 }
      );

      expect(result.current.data).toBeUndefined();
    });
  });
});
