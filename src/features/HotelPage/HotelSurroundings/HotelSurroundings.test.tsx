import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { HotelSurroundings } from './HotelSurroundings';
import type { Surrounding } from '@/types/HotelDetails';
import type { HotelResponse } from '@/schemas/hotelResult';

vi.mock('@/components/SurroundingsList/SurroundingsList', () => ({
  SurroundingsList: ({ surroundings }: { surroundings: Surrounding[] }) => (
    <div data-testid="surroundings-list" data-count={surroundings.length}>
      {surroundings.map((s, i) => (
        <div key={i}>{s.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('@/components/SurroundingsMapModal/SurroundingsMapModal', () => ({
  SurroundingsMapModal: ({ opened }: { opened: boolean }) => (
    <div data-testid="surroundings-map-modal" data-opened={opened} />
  ),
}));

vi.mock('@/features/SearchPage/HotelMap/HotelMap', () => ({
  HotelMap: ({
    center,
    surroundings,
  }: {
    center: [number, number];
    surroundings: Surrounding[];
  }) => (
    <div
      data-testid="hotel-map"
      data-center={center.join(',')}
      data-surroundings-count={surroundings.length}
    >
      Map
    </div>
  ),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('HotelSurroundings', () => {
  const mockSetModalOpen = vi.fn();

  const mockHotel = {
    latitude: 40.7128,
    longitude: -74.006,
  } as HotelResponse;

  const mockSurroundings = Array.from({ length: 8 }, (_, i) => ({
    type: 'restaurant',
    name: `POI ${i + 1}`,
    distance: '100m',
    latitude: 40.7128,
    longitude: -74.006,
  })) as Surrounding[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays SurroundingsList with up to 5 POIs', () => {
    render(<HotelSurroundings hotel={mockHotel} surroundings={mockSurroundings} />, {
      wrapper: TestWrapper,
    });

    const surroundingsList = screen.getByTestId('surroundings-list');
    expect(surroundingsList).toBeInTheDocument();
    expect(surroundingsList).toHaveAttribute('data-count', '5');
  });

  it('clicking "View all on map" opens modal', () => {
    render(<HotelSurroundings hotel={mockHotel} surroundings={mockSurroundings} />, {
      wrapper: TestWrapper,
    });

    const viewAllButton = screen.getByText('View all on map');
    fireEvent.click(viewAllButton);

    const modal = screen.getByTestId('surroundings-map-modal');
    expect(modal).toHaveAttribute('data-opened', 'true');
  });

  it('minimap loads correctly', () => {
    render(<HotelSurroundings hotel={mockHotel} surroundings={mockSurroundings} />, {
      wrapper: TestWrapper,
    });

    const hotelMap = screen.getByTestId('hotel-map');
    expect(hotelMap).toBeInTheDocument();
    expect(hotelMap).toHaveAttribute('data-center', '40.7128,-74.006');
    expect(hotelMap).toHaveAttribute('data-surroundings-count', '5');
  });
});
