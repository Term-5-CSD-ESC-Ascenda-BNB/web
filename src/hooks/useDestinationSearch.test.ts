import { renderHook, waitFor } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useDestinationSearch, fetchDestinations } from './useDestinationSearch';
import { createElement } from 'react';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

// Mock the getIconByType utility
const mockIcon = vi.fn(() => 'MockedIcon');
vi.mock('@/utils', () => ({
  getIconByType: vi.fn(() => mockIcon),
}));

// Mock Mantine hooks to remove debouncing for easier testing
vi.mock('@mantine/hooks', () => ({
  useDebouncedValue: (value: string) => [value],
}));

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useDestinationSearch', () => {
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    wrapper = createWrapper();
    vi.clearAllMocks();
  });

  describe('API calls', () => {
    it('does not make API call for empty search value', () => {
      renderHook(() => useDestinationSearch(''), { wrapper });

      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('does not make API call for search value less than minimum length', () => {
      renderHook(() => useDestinationSearch('a'), { wrapper });

      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('fetchDestinations returns empty array for empty search value', async () => {
      const result = await fetchDestinations('');

      expect(result).toEqual([]);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('fetchDestinations returns empty array for whitespace-only search value', async () => {
      const result = await fetchDestinations('   ');

      expect(result).toEqual([]);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('fetchDestinations returns empty array for search value below minimum length', async () => {
      const result = await fetchDestinations('a');

      expect(result).toEqual([]);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('makes API call for search value with minimum length', async () => {
      const mockResponse = {
        data: [
          {
            uid: '1',
            term: 'Paris',
            type: 'city',
            location: { type: 'Point', coordinates: [2.3522, 48.8566] },
            state: 'Île-de-France',
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      renderHook(() => useDestinationSearch('Paris'), { wrapper });

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/destinations'), {
          params: { search: 'Paris' },
        });
      });
    });
  });

  describe('data transformation', () => {
    it('transforms API response to search results correctly', async () => {
      const mockApiResponse = [
        {
          uid: '123',
          term: 'New York',
          type: 'city',
          location: { type: 'Point', coordinates: [-74.006, 40.7128] },
          state: 'NY',
        },
        {
          uid: '456',
          term: 'Los Angeles',
          type: 'city',
          location: { type: 'Point', coordinates: [-118.2437, 34.0522] },
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockApiResponse });

      const { result } = renderHook(() => useDestinationSearch('New'), { wrapper });

      await waitFor(() => {
        expect(result.current.searchResults).toHaveLength(2);
      });

      expect(result.current.searchResults[0]).toEqual({
        uid: '123',
        term: 'New York',
        icon: mockIcon,
        coordinates: { lat: 40.7128, lng: -74.006 },
      });

      expect(result.current.searchResults[1]).toEqual({
        uid: '456',
        term: 'Los Angeles',
        icon: mockIcon,
        coordinates: { lat: 34.0522, lng: -118.2437 },
      });
    });

    it('correctly swaps longitude and latitude coordinates', async () => {
      const mockApiResponse = [
        {
          uid: '789',
          term: 'Tokyo',
          type: 'city',
          location: { type: 'Point', coordinates: [139.6917, 35.6895] }, // [lng, lat]
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockApiResponse });

      const { result } = renderHook(() => useDestinationSearch('Tokyo'), { wrapper });

      await waitFor(() => {
        expect(result.current.searchResults).toHaveLength(1);
      });

      // Should be { lat: 35.6895, lng: 139.6917 }
      expect(result.current.searchResults[0].coordinates).toEqual({
        lat: 35.6895,
        lng: 139.6917,
      });
    });
  });

  describe('loading states', () => {
    it('returns false loading state when not searching', () => {
      const { result } = renderHook(() => useDestinationSearch('a'), { wrapper });

      expect(result.current.isLoading).toBe(false);
    });

    it('returns false loading state after successful API call', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useDestinationSearch('test'), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('error handling', () => {
    it('handles API errors correctly', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useDestinationSearch('error test'), { wrapper });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      expect(result.current.searchResults).toEqual([]);
    });

    it('returns empty results when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const { result } = renderHook(() => useDestinationSearch('fail'), { wrapper });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      expect(result.current.searchResults).toEqual([]);
    });
  });

  describe('edge cases', () => {
    it('handles empty API response', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });

      const { result } = renderHook(() => useDestinationSearch('empty'), { wrapper });

      await waitFor(() => {
        expect(result.current.searchResults).toEqual([]);
        expect(result.current.error).toBeFalsy();
      });
    });

    it('handles whitespace-only search values', () => {
      const { result } = renderHook(() => useDestinationSearch('   '), { wrapper });

      expect(mockedAxios.get).not.toHaveBeenCalled();
      expect(result.current.searchResults).toEqual([]);
    });

    it('handles search values with exactly minimum length', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });

      renderHook(() => useDestinationSearch('ab'), { wrapper });

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });
    });

    it('handles destinations without state property', async () => {
      const mockApiResponse = [
        {
          uid: '1',
          term: 'Test City',
          type: 'city',
          location: { type: 'Point', coordinates: [0, 0] },
          // No state property
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockApiResponse });

      const { result } = renderHook(() => useDestinationSearch('test'), { wrapper });

      await waitFor(() => {
        expect(result.current.searchResults).toHaveLength(1);
      });

      expect(result.current.searchResults[0].term).toBe('Test City');
    });
  });

  describe('configuration', () => {
    it('respects minimum search length configuration', () => {
      // Test with length 1 (below minimum of 2)
      renderHook(() => useDestinationSearch('x'), { wrapper });
      expect(mockedAxios.get).not.toHaveBeenCalled();

      // Clear mock and test with length 2 (at minimum)
      vi.clearAllMocks();
      mockedAxios.get.mockResolvedValueOnce({ data: [] });
      renderHook(() => useDestinationSearch('xy'), { wrapper });
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('return values', () => {
    it('returns correct object structure', () => {
      const { result } = renderHook(() => useDestinationSearch(''), { wrapper });

      expect(result.current).toHaveProperty('searchResults');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('isLoading');

      expect(Array.isArray(result.current.searchResults)).toBe(true);
      expect(typeof result.current.isLoading).toBe('boolean');
    });

    it('returns empty results by default', () => {
      const { result } = renderHook(() => useDestinationSearch(''), { wrapper });

      expect(result.current.searchResults).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeFalsy();
    });
  });
});
