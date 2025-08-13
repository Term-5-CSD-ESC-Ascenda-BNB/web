import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock router hooks so they don't require a RouterProvider
vi.mock('@tanstack/react-router', () => ({
  useSearch: vi.fn(() => ({
    date: ['2025-01-01', '2025-01-05'],
    guests: '2',
    rooms: '1',
    uid: 'test-uid',
  })),
  useParams: vi.fn(() => ({
    hotelId: 'hotel-123',
  })),
}));

// Mock parseRoomFeatures
vi.mock('@/utils/parseRoomFeatures', () => ({
  parseRoomFeatures: () => ({
    size: '100 sq ft',
    occupancy: 'Sleeps 2',
    bedType: 'Queen Bed',
    wifi: 'Free WiFi',
    view: 'City view',
    tv: 'Smart TV',
    bath: 'Private bath',
  }),
}));

// Mock RoomCard to something simple
vi.mock('@/components/Room/RoomCard', () => ({
  RoomCard: ({ name }: { name: string }) => <div data-testid="room-card">{name}</div>,
}));

// Default hotel mock
const mockHotelData = {
  id: 'hotel-123',
  name: 'Test Hotel',
  address: '123 Test St',
  rating: 4,
  trustyou: { score: { overall: 90 } },
};

type MockRoom = {
  roomNormalizedDescription: string;
  description: string;
  long_description: string;
  free_cancellation: boolean;
  amenities: string[];
  images: { url: string }[];
  price: number;
  roomAdditionalInfo: { breakfastInfo: string };
};

// Helper to set up mock useRooms data
const setupRoomsMock = (roomsArray: MockRoom[]) => {
  vi.doMock('@/features/HotelPage/useRooms', () => ({
    useRooms: () => ({
      data: { rooms: roomsArray },
      isLoading: false,
      error: null,
    }),
  }));
};

// Mock useHotel
beforeEach(() => {
  vi.resetModules();
  vi.doMock('@/features/HotelPage/useHotel', () => ({
    useHotel: () => ({
      data: mockHotelData,
      isLoading: false,
    }),
  }));
});

describe('HotelRoomsSection', () => {
  it('groups and renders RoomCards correctly by roomNormalizedDescription', async () => {
    setupRoomsMock([
      {
        roomNormalizedDescription: 'Deluxe Room',
        description: 'Deluxe Room',
        long_description: 'A nice deluxe room',
        free_cancellation: true,
        amenities: ['WiFi', 'TV', 'Private bath'],
        images: [{ url: 'image1.jpg' }],
        price: 123,
        roomAdditionalInfo: { breakfastInfo: 'Breakfast included' },
      },
      {
        roomNormalizedDescription: 'Deluxe Room',
        description: 'Deluxe Room with View',
        long_description: 'Deluxe room with city view',
        free_cancellation: false,
        amenities: ['WiFi', 'TV', 'Private bath'],
        images: [{ url: 'image2.jpg' }],
        price: 150,
        roomAdditionalInfo: { breakfastInfo: 'Room_only' },
      },
      {
        roomNormalizedDescription: 'Standard Room',
        description: 'Standard Room',
        long_description: 'A basic standard room',
        free_cancellation: true,
        amenities: ['WiFi', 'TV', 'Private bath'],
        images: [{ url: 'image3.jpg' }],
        price: 100,
        roomAdditionalInfo: { breakfastInfo: 'Breakfast included' },
      },
    ]);

    const { HotelRoomsSection } = await import('./HotelRoomsSection');
    render(<HotelRoomsSection />);

    const cards = screen.getAllByTestId('room-card');
    expect(cards).toHaveLength(2); // Deluxe + Standard
    expect(cards[0]).toHaveTextContent('Deluxe Room');
    expect(cards[1]).toHaveTextContent('Standard Room');
  });

  it('renders no RoomCards if room data is empty', async () => {
    setupRoomsMock([]);

    const { HotelRoomsSection } = await import('./HotelRoomsSection');
    render(<HotelRoomsSection />);

    expect(screen.queryByTestId('room-card')).not.toBeInTheDocument();
    expect(screen.getByText(/No rooms available for the selected dates/i)).toBeInTheDocument();
  });
});
