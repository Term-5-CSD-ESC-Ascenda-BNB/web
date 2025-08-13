import { renderHook, waitFor } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useHotel } from './useHotel';
import type { HotelResponse } from '@/schemas/hotelResult';
import { fetchHotelDetails } from './api';

// Mock fetchHotelDetails
vi.mock('./api');
const mockedFetchHotelDetails = vi.mocked(fetchHotelDetails);

// Mock router
import { useParams, useSearch } from '@tanstack/react-router';
vi.mock('@tanstack/react-router', () => ({
  useParams: vi.fn(),
  useSearch: vi.fn(),
}));

const mockedUseParams = useParams as ReturnType<typeof vi.fn>;
const mockedUseSearch = useSearch as ReturnType<typeof vi.fn>;

// Default test params
const hotelId = 'hotel-123';
const searchParams = {
  uid: 'destination-1',
  date: ['2025-08-14', '2025-08-15'],
  guests: 2,
  rooms: 1,
};

const queryClientWrapper = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
};

describe('useHotel', () => {
  beforeEach(() => {
    queryClientWrapper();
    mockedUseParams.mockReturnValue({ hotelId });
    mockedUseSearch.mockReturnValue(searchParams);
    mockedFetchHotelDetails.mockReset();
  });

  it('returns data when API succeeds', async () => {
    const mockData: HotelResponse = {
      id: 'hotel-123',
      imageCount: 5,
      latitude: 1.3,
      longitude: 103.8,
      name: 'Test Hotel',
      address: '123 Street',
      address1: '123 Street',
      rating: 5,
      trustyou: {
        id: 'tx-1',
        score: {
          overall: 9,
          kaligo_overall: 8,
          solo: 9,
          couple: 8,
          family: 7,
          business: 8,
        },
      },
      categories: {},
      amenities_ratings: [],
      description: 'Nice hotel',
      amenities: {},
      original_metadata: { name: 'Test Hotel', city: 'City', state: null, country: 'SG' },
      image_details: { prefix: '', suffix: '.jpg', count: 5 },
      hires_image_index: '3',
      number_of_images: 5,
      default_image_index: 0,
      imgix_url: 'https://example.com/img.jpg',
      cloudflare_image_url: 'https://example.com/cf.jpg',
      checkin_time: '14:00',
    };

    mockedFetchHotelDetails.mockResolvedValue(mockData);

    const { result } = renderHook(() => useHotel(), { wrapper: queryClientWrapper() });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.id).toBe('hotel-123');
  });
});
