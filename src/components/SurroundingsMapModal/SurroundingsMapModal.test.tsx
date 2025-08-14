import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { SurroundingsMapModal, type Surrounding } from './SurroundingsMapModal';
import type { HotelResponse } from '@/schemas/hotelResult';

// Mock the utility functions
vi.mock('@/utils/getSurroundingMapIcon', () => ({
  getHotelIcon: () => ({ iconUrl: 'hotel-icon.png' }),
  getPOIIcon: (category: string) => <span data-testid={`poi-icon-${category}`}>📍</span>,
  categorizeType: (type: string) => {
    const mapping: Record<string, string> = {
      restaurant: 'Dining',
      museum: 'Landmarks',
      train_station: 'Transport',
      shop: 'Shopping',
    };
    return mapping[type] || 'Others';
  },
}));

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, center }: { children: React.ReactNode; center: [number, number] }) => (
    <div data-testid="map-container" data-center={center.join(',')}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  ZoomControl: () => <div data-testid="zoom-control" />,
  Marker: ({ position, children }: { position: [number, number]; children?: React.ReactNode }) => (
    <div data-testid="marker" data-position={position.join(',')}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  divIcon: ({ html }: { html: string }) => ({ html }),
}));

// Mock react-dom/server
vi.mock('react-dom/server', () => ({
  renderToStaticMarkup: () => '<rendered>icon</rendered>',
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('SurroundingsMapModal', () => {
  const mockHotel = {
    latitude: 40.7128,
    longitude: -74.006,
  } as HotelResponse;

  const mockSurroundings: Surrounding[] = [
    {
      type: 'restaurant',
      name: 'Pizza Place',
      distance: '200m',
      latitude: 40.713,
      longitude: -74.0062,
    },
    {
      type: 'museum',
      name: 'Art Gallery',
      distance: '500m',
      latitude: 40.7125,
      longitude: -74.0058,
    },
    {
      type: 'train_station',
      name: 'Metro Station',
      distance: '300m',
      latitude: 40.7135,
      longitude: -74.0065,
    },
  ];

  it('tabs work correctly', () => {
    render(
      <SurroundingsMapModal
        opened={true}
        onClose={() => {}}
        hotel={mockHotel}
        surroundings={mockSurroundings}
      />,
      { wrapper: TestWrapper }
    );

    // Check that tabs are rendered for categories with items
    expect(screen.getByText('Dining')).toBeInTheDocument();
    expect(screen.getByText('Landmarks')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();

    // Click on a different tab
    fireEvent.click(screen.getByText('Landmarks'));

    // Should show the museum item
    expect(screen.getByText('Art Gallery')).toBeInTheDocument();
  });

  it('POI markers render', () => {
    render(
      <SurroundingsMapModal
        opened={true}
        onClose={() => {}}
        hotel={mockHotel}
        surroundings={mockSurroundings}
      />,
      { wrapper: TestWrapper }
    );

    // Should have markers for hotel + filtered POIs (defaults to first tab - Dining)
    const markers = screen.getAllByTestId('marker');
    expect(markers.length).toBeGreaterThan(0);
  });

  it('map centers on hotel', () => {
    render(
      <SurroundingsMapModal
        opened={true}
        onClose={() => {}}
        hotel={mockHotel}
        surroundings={mockSurroundings}
      />,
      { wrapper: TestWrapper }
    );

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toHaveAttribute('data-center', '40.7128,-74.006');
  });
});
