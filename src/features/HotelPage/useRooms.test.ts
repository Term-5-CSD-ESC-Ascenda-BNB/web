import { renderHook, waitFor } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useRooms } from './useRooms';
import type { RoomResults } from '@/schemas/roomResult';

// --- Mock router hooks ---
vi.mock('@tanstack/react-router', () => ({
  useParams: vi.fn(),
  useSearch: vi.fn(),
}));

// --- Mock utils ---
vi.mock('@/utils/stringifyGuestsRooms', () => ({
  stringifyGuestsRooms: vi.fn(),
}));

const { useParams, useSearch } = vi.mocked(await import('@tanstack/react-router'));
const { stringifyGuestsRooms } = vi.mocked(await import('@/utils/stringifyGuestsRooms'));

// --- Mock data ---
export const mockRoomResults: RoomResults = {
  completed: true,
  rooms: [
    {
      type: 'Deluxe Suite',
      key: 'room-1',
      description: 'Spacious suite with ocean view',
      roomDescription: 'Ocean-view suite with king bed',
      roomNormalizedDescription: 'Deluxe Suite',
      free_cancellation: true,
      long_description: 'A beautiful deluxe suite perfect for couples.',
      amenities: ['WiFi', 'Breakfast included', 'Air conditioning'],
      images: [
        {
          url: 'https://example.com/deluxe.jpg',
        },
      ],
      price: 300,
      roomAdditionalInfo: {
        breakfastInfo: 'Buffet breakfast included',
      },
    },
    {
      type: 'Standard Room',
      key: 'room-2',
      description: 'Comfortable room for budget travellers',
      roomDescription: 'Budget-friendly double room',
      roomNormalizedDescription: 'Standard Room',
      free_cancellation: false,
      long_description: 'A standard room with basic amenities.',
      amenities: ['WiFi', 'Air conditioning'],
      images: [
        {
          url: 'https://example.com/standard.jpg',
        },
      ],
      price: 150,
    },
  ],
};

// --- Helper for QueryClient wrapper ---
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useRooms', () => {
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    wrapper = createWrapper();
    vi.clearAllMocks();
    global.fetch = vi.fn();

    // Default mocks
    useParams.mockReturnValue({ hotelId: 'test-hotel' });
    useSearch.mockReturnValue({
      uid: 'destination-123',
      date: ['2025-08-20', '2025-08-22'],
      guests: 2,
      rooms: 1,
    });
    stringifyGuestsRooms.mockReturnValue('2');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches rooms successfully', async () => {
    console.log('test', global.fetch);
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRoomResults),
    } as Response);

    const { result } = renderHook(() => useRooms(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockRoomResults);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/hotels/test-hotel/price?')
    );
  });

  it('keeps the query disabled when a required param is missing (uid)', () => {
    useSearch.mockReturnValue({
      uid: '',
      date: ['2025-08-20', '2025-08-22'],
      guests: 2,
      rooms: 1,
    });

    const { result } = renderHook(() => useRooms(), { wrapper });

    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
