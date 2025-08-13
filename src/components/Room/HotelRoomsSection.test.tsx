import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Reset mocks between tests
beforeEach(() => {
  vi.resetModules();
});

const setupMockWithRooms = () => {
  vi.doMock('@/.mock_data/price.json', () => ({
    default: {
      rooms: [
        {
          key: '1',
          description: 'Deluxe Room',
          roomDescription: 'Deluxe Room - King Bed',
          roomNormalizedDescription: 'Deluxe Room',
          type: 'Deluxe',
          free_cancellation: true,
          long_description: 'Room with king bed and city view',
          amenities: ['WiFi', 'TV', 'Private bath'],
          images: [{ url: 'image1.jpg' }],
          price: 123.45,
          roomAdditionalInfo: { breakfastInfo: 'Breakfast included' },
        },
        {
          key: '2',
          description: 'Deluxe Room with View',
          roomDescription: 'Deluxe Room - City View',
          roomNormalizedDescription: 'Deluxe Room',
          type: 'Deluxe',
          free_cancellation: false,
          long_description: 'Room with city view and private bath',
          amenities: ['WiFi', 'TV', 'Private bath'],
          images: [{ url: 'image2.jpg' }],
          price: 150.0,
          roomAdditionalInfo: { breakfastInfo: 'Room_only' },
        },
        {
          key: '3',
          description: 'Standard Room',
          roomDescription: 'Standard Room',
          roomNormalizedDescription: 'Standard Room',
          type: 'Standard',
          free_cancellation: true,
          long_description: 'Cozy standard room with bath',
          amenities: ['TV', 'Private bath'],
          images: [{ url: 'image3.jpg' }],
          price: 100.0,
          roomAdditionalInfo: { breakfastInfo: 'Breakfast included' },
        },
      ],
    },
  }));
};

const setupMockWithEmptyRooms = () => {
  vi.doMock('@/.mock_data/price.json', () => ({
    default: {
      rooms: [],
    },
  }));
};

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

vi.mock('@/components/Room/RoomCard', () => ({
  RoomCard: ({ name }: { name: string }) => <div data-testid="room-card">{name}</div>,
}));

describe('HotelRoomsSection', () => {
  it('groups and renders RoomCards correctly by roomNormalizedDescription', async () => {
    setupMockWithRooms();

    const { HotelRoomsSection } = await import('./HotelRoomsSection');
    render(<HotelRoomsSection />);

    const cards = screen.getAllByTestId('room-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Deluxe Room');
    expect(cards[1]).toHaveTextContent('Standard Room');
  });

  it('renders no RoomCards if room data is empty', async () => {
    setupMockWithEmptyRooms();

    const { HotelRoomsSection } = await import('./HotelRoomsSection');
    render(<HotelRoomsSection />);

    expect(screen.queryByTestId('room-card')).not.toBeInTheDocument();
  });
});
