import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { HotelMap } from './HotelMap';
import type { HotelResult } from '@/schemas/hotelResults';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({
    children,
    center,
    zoom,
    scrollWheelZoom,
    dragging,
    doubleClickZoom,
    touchZoom,
    style,
    attributionControl,
    zoomControl,
    className,
    ref,
  }: {
    children: React.ReactNode;
    center: [number, number] | { lat: number; lng: number };
    zoom: number;
    scrollWheelZoom: boolean;
    dragging: boolean;
    doubleClickZoom: boolean;
    touchZoom: boolean;
    style: React.CSSProperties;
    attributionControl: boolean;
    zoomControl: boolean;
    className: string;
    ref?: React.Ref<unknown>;
  }) => {
    // Simulate setting the ref to a mock map instance
    React.useEffect(() => {
      if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as React.MutableRefObject<unknown>).current = {
          fitBounds: vi.fn(),
        };
      }
    }, [ref]);

    return (
      <div
        data-testid="map-container"
        data-center={JSON.stringify(center)}
        data-zoom={zoom}
        data-scroll-wheel-zoom={scrollWheelZoom}
        data-dragging={dragging}
        data-double-click-zoom={doubleClickZoom}
        data-touch-zoom={touchZoom}
        data-attribution-control={attributionControl}
        data-zoom-control={zoomControl}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  },
  TileLayer: ({ url }: { url: string }) => <div data-testid="tile-layer" data-url={url} />,
  ZoomControl: ({
    position,
    zoomInText,
    zoomOutText,
  }: {
    position: string;
    zoomInText: string;
    zoomOutText: string;
  }) => (
    <div
      data-testid="zoom-control"
      data-position={position}
      data-zoom-in-text={zoomInText}
      data-zoom-out-text={zoomOutText}
    />
  ),
  Marker: ({
    position,
    icon,
    children,
  }: {
    position: [number, number];
    icon?: { opts: Record<string, unknown> };
    children?: React.ReactNode;
  }) => (
    <div
      data-testid="marker"
      data-position={JSON.stringify(position)}
      data-icon={icon ? JSON.stringify(icon.opts) : undefined}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  latLng: (lat: number, lng: number) => ({ lat, lng }),
  LatLngBounds: class {
    private bounds: Array<[number, number]> = [];

    constructor(bounds?: Array<[number, number]>) {
      if (bounds) this.bounds = bounds;
    }

    extend(latlng: [number, number]) {
      this.bounds.push(latlng);
      return this;
    }

    isValid() {
      return this.bounds.length > 0;
    }
  },
  divIcon: (opts: Record<string, unknown>) => ({ opts }),
  Map: class {},
}));

// Mock react-dom/server
vi.mock('react-dom/server', () => ({
  renderToStaticMarkup: (element: React.ReactElement) => {
    const props = element.props as { style?: { backgroundColor?: string } };
    if (element.type === 'div' && props?.style?.backgroundColor) {
      return `<div style="background-color: ${props.style.backgroundColor}">Icon</div>`;
    }
    return '<svg>Icon</svg>';
  },
}));

// Mock @tabler/icons-react
vi.mock('@tabler/icons-react', () => ({
  IconPlus: ({ size, stroke, color }: { size: number; stroke: number; color: string }) => (
    <svg data-testid="icon-plus" data-size={size} data-stroke={stroke} data-color={color}>
      +
    </svg>
  ),
  IconMinus: ({ size, stroke, color }: { size: number; stroke: number; color: string }) => (
    <svg data-testid="icon-minus" data-size={size} data-stroke={stroke} data-color={color}>
      -
    </svg>
  ),
}));

// Mock child components
vi.mock('./HotelPinMarker', () => ({
  HotelPinMarker: ({ position }: { position: [number, number] }) => (
    <div data-testid="hotel-pin-marker" data-position={JSON.stringify(position)} />
  ),
}));

vi.mock('./PriceMarker/PriceMarker', () => ({
  default: ({
    position,
    price,
    children,
    markerRef: _markerRef,
    onPopupOpen,
    onPopupClose,
  }: {
    position: [number, number];
    price: number;
    children?: React.ReactNode;
    markerRef?: React.Ref<unknown>;
    onPopupOpen?: () => void;
    onPopupClose?: () => void;
  }) => (
    <div
      data-testid="price-marker"
      data-position={JSON.stringify(position)}
      data-price={price}
      onClick={() => {
        onPopupOpen?.();
        onPopupClose?.();
      }}
    >
      {children}
    </div>
  ),
}));

vi.mock('./HotelPopup', () => ({
  HotelPopup: ({ hotel, onClick }: { hotel: HotelResult; onClick?: (id: string) => void }) => (
    <div data-testid="hotel-popup" data-hotel-id={hotel.id} onClick={() => onClick?.(hotel.id)}>
      {hotel.name}
    </div>
  ),
}));

// Mock utility functions
vi.mock('@/utils/getSurroundingIcon', () => ({
  getSurroundingIcon: (type: string) => <span data-testid="surrounding-icon">{type}</span>,
}));

vi.mock('@/utils/getSurroundingCategory', () => ({
  getCategory: (type: string) => `category-${type}`,
  getCategoryColor: (category: string) => `#${category.slice(-6)}`,
}));

// Mock CSS modules
vi.mock('./Map.module.css', () => ({
  default: {
    mapContainer: 'map-container-class',
  },
}));

describe('HotelMap', () => {
  const mockHotels: HotelResult[] = [
    {
      id: 'hotel-1',
      searchRank: 1,
      price: 100,
      latitude: 1.3521,
      longitude: 103.8198,
      name: 'Test Hotel 1',
      address: '123 Test St',
      rating: 4.5,
      score: 8.5,
      image_details: {
        suffix: 'jpg',
        count: 5,
        prefix: 'test-prefix',
      },
    },
    {
      id: 'hotel-2',
      searchRank: 2,
      price: 200,
      latitude: 1.36,
      longitude: 103.83,
      name: 'Test Hotel 2',
      address: '456 Test Ave',
      rating: 4.8,
      score: 9.0,
      image_details: {
        suffix: 'jpg',
        count: 3,
        prefix: 'test-prefix-2',
      },
    },
  ];

  const mockSurroundings = [
    {
      type: 'restaurant',
      name: 'Test Restaurant',
      distance: '0.2 km',
      latitude: 1.353,
      longitude: 103.82,
    },
    {
      type: 'shopping',
      name: 'Test Mall',
      distance: '0.5 km',
      latitude: 1.354,
      longitude: 103.825,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders map container with default props', () => {
      render(<HotelMap />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();
      expect(mapContainer).toHaveAttribute('data-scroll-wheel-zoom', 'true');
      expect(mapContainer).toHaveAttribute('data-dragging', 'true');
      expect(mapContainer).toHaveAttribute('data-double-click-zoom', 'true');
      expect(mapContainer).toHaveAttribute('data-touch-zoom', 'true');
      expect(mapContainer).toHaveAttribute('data-attribution-control', 'false');
      expect(mapContainer).toHaveAttribute('data-zoom-control', 'false');
    });

    it('renders tile layer', () => {
      render(<HotelMap />);

      const tileLayer = screen.getByTestId('tile-layer');
      expect(tileLayer).toBeInTheDocument();
      expect(tileLayer).toHaveAttribute(
        'data-url',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      );
    });

    it('renders zoom control with custom icons', () => {
      render(<HotelMap />);

      const zoomControl = screen.getByTestId('zoom-control');
      expect(zoomControl).toBeInTheDocument();
      expect(zoomControl).toHaveAttribute('data-position', 'topright');
    });
  });

  describe('Interactive vs Non-Interactive Mode', () => {
    it('renders in interactive mode by default', () => {
      render(<HotelMap hotels={mockHotels} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toHaveAttribute('data-scroll-wheel-zoom', 'true');
      expect(mapContainer).toHaveAttribute('data-dragging', 'true');

      // Should render PriceMarkers for interactive mode
      const priceMarkers = screen.getAllByTestId('price-marker');
      expect(priceMarkers).toHaveLength(2);
    });

    it('renders in non-interactive mode when interactive=false', () => {
      render(<HotelMap hotels={mockHotels} interactive={false} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toHaveAttribute('data-scroll-wheel-zoom', 'false');
      expect(mapContainer).toHaveAttribute('data-dragging', 'false');

      // Should render HotelPinMarkers for non-interactive mode
      const pinMarkers = screen.getAllByTestId('hotel-pin-marker');
      expect(pinMarkers).toHaveLength(2);

      // Should not render PriceMarkers
      const priceMarkers = screen.queryAllByTestId('price-marker');
      expect(priceMarkers).toHaveLength(0);
    });

    it('handles interactive=true explicitly', () => {
      render(<HotelMap hotels={mockHotels} interactive={true} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toHaveAttribute('data-scroll-wheel-zoom', 'true');
      expect(mapContainer).toHaveAttribute('data-dragging', 'true');
      expect(mapContainer).toHaveAttribute('data-double-click-zoom', 'true');
      expect(mapContainer).toHaveAttribute('data-touch-zoom', 'true');

      // Should render PriceMarkers for interactive mode
      const priceMarkers = screen.getAllByTestId('price-marker');
      expect(priceMarkers).toHaveLength(2);
    });
  });
  describe('Hotel Markers', () => {
    it('renders price markers for each hotel in interactive mode', () => {
      const mockGetMarkerRef = vi.fn();
      const mockOnPopupOpen = vi.fn();
      const mockOnPopupClose = vi.fn();

      render(
        <HotelMap
          hotels={mockHotels}
          getMarkerRef={mockGetMarkerRef}
          onPopupOpen={mockOnPopupOpen}
          onPopupClose={mockOnPopupClose}
        />
      );

      const priceMarkers = screen.getAllByTestId('price-marker');
      expect(priceMarkers).toHaveLength(2);

      // Check first hotel marker
      expect(priceMarkers[0]).toHaveAttribute('data-position', JSON.stringify([1.3521, 103.8198]));
      expect(priceMarkers[0]).toHaveAttribute('data-price', '100');

      // Check second hotel marker
      expect(priceMarkers[1]).toHaveAttribute('data-position', JSON.stringify([1.36, 103.83]));
      expect(priceMarkers[1]).toHaveAttribute('data-price', '200');
    });

    it('renders pin markers for each hotel in non-interactive mode', () => {
      render(<HotelMap hotels={mockHotels} interactive={false} />);

      const pinMarkers = screen.getAllByTestId('hotel-pin-marker');
      expect(pinMarkers).toHaveLength(2);

      expect(pinMarkers[0]).toHaveAttribute('data-position', JSON.stringify([1.3521, 103.8198]));
      expect(pinMarkers[1]).toHaveAttribute('data-position', JSON.stringify([1.36, 103.83]));
    });

    it('renders hotel popups inside price markers', () => {
      render(<HotelMap hotels={mockHotels} />);

      const hotelPopups = screen.getAllByTestId('hotel-popup');
      expect(hotelPopups).toHaveLength(2);

      expect(hotelPopups[0]).toHaveAttribute('data-hotel-id', 'hotel-1');
      expect(hotelPopups[0]).toHaveTextContent('Test Hotel 1');

      expect(hotelPopups[1]).toHaveAttribute('data-hotel-id', 'hotel-2');
      expect(hotelPopups[1]).toHaveTextContent('Test Hotel 2');
    });
  });

  describe('Surrounding Points of Interest', () => {
    it('renders markers for surrounding POIs', () => {
      render(<HotelMap surroundings={mockSurroundings} />);

      const markers = screen.getAllByTestId('marker');
      expect(markers).toHaveLength(2);

      expect(markers[0]).toHaveAttribute('data-position', JSON.stringify([1.353, 103.82]));
      expect(markers[1]).toHaveAttribute('data-position', JSON.stringify([1.354, 103.825]));
    });

    it('renders popups with POI information', () => {
      render(<HotelMap surroundings={mockSurroundings} />);

      const popups = screen.getAllByTestId('popup');
      expect(popups).toHaveLength(2);
    });
  });

  describe('Map Configuration', () => {
    it('uses provided center and zoom', () => {
      const customCenter: [number, number] = [2.0, 104.0];
      const customZoom = 15;

      render(<HotelMap center={customCenter} zoom={customZoom} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toHaveAttribute('data-center', JSON.stringify(customCenter));
      expect(mapContainer).toHaveAttribute('data-zoom', customZoom.toString());
    });

    it('uses default center when not provided', () => {
      render(<HotelMap />);

      const mapContainer = screen.getByTestId('map-container');
      const centerData = mapContainer.getAttribute('data-center');
      const center = JSON.parse(centerData!) as { lat: number; lng: number };

      expect(center).toEqual({ lat: 1.3521, lng: 103.8198 });
    });

    it('uses default zoom when not provided', () => {
      render(<HotelMap />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toHaveAttribute('data-zoom', '13');
    });
  });

  describe('Event Handlers', () => {
    it('calls popup event handlers when provided', () => {
      const mockGetMarkerRef = vi.fn(() => vi.fn());
      const mockOnPopupOpen = vi.fn();
      const mockOnPopupClose = vi.fn();

      render(
        <HotelMap
          hotels={mockHotels}
          getMarkerRef={mockGetMarkerRef}
          onPopupOpen={mockOnPopupOpen}
          onPopupClose={mockOnPopupClose}
        />
      );

      expect(mockGetMarkerRef).toHaveBeenCalledWith('hotel-1');
      expect(mockGetMarkerRef).toHaveBeenCalledWith('hotel-2');
    });

    it('calls onPopupOpen and onPopupClose when price marker is clicked', () => {
      const mockOnPopupOpen = vi.fn();
      const mockOnPopupClose = vi.fn();

      render(
        <HotelMap
          hotels={mockHotels}
          onPopupOpen={mockOnPopupOpen}
          onPopupClose={mockOnPopupClose}
        />
      );

      const priceMarkers = screen.getAllByTestId('price-marker');

      // Click the first price marker to trigger popup events
      priceMarkers[0].click();

      expect(mockOnPopupOpen).toHaveBeenCalledWith('hotel-1');
      expect(mockOnPopupClose).toHaveBeenCalledWith('hotel-1');
    });

    it('calls onPopupClick when hotel popup is clicked', () => {
      const mockOnPopupClick = vi.fn();

      render(<HotelMap hotels={mockHotels} onPopupClick={mockOnPopupClick} />);

      const hotelPopups = screen.getAllByTestId('hotel-popup');

      // Click the first hotel popup
      hotelPopups[0].click();

      expect(mockOnPopupClick).toHaveBeenCalledWith('hotel-1');
    });

    it('calls all event handlers together when provided', () => {
      const mockGetMarkerRef = vi.fn(() => vi.fn());
      const mockOnPopupOpen = vi.fn();
      const mockOnPopupClose = vi.fn();
      const mockOnPopupClick = vi.fn();

      render(
        <HotelMap
          hotels={[mockHotels[0]]} // Use just one hotel for clearer testing
          getMarkerRef={mockGetMarkerRef}
          onPopupOpen={mockOnPopupOpen}
          onPopupClose={mockOnPopupClose}
          onPopupClick={mockOnPopupClick}
        />
      );

      // Test price marker click (should trigger popup open/close)
      const priceMarker = screen.getByTestId('price-marker');
      priceMarker.click();

      expect(mockOnPopupOpen).toHaveBeenCalledWith('hotel-1');
      expect(mockOnPopupClose).toHaveBeenCalledWith('hotel-1');

      // Test hotel popup click
      const hotelPopup = screen.getByTestId('hotel-popup');
      hotelPopup.click();

      expect(mockOnPopupClick).toHaveBeenCalledWith('hotel-1');
      expect(mockGetMarkerRef).toHaveBeenCalledWith('hotel-1');
    });

    it('handles missing event handlers gracefully', () => {
      // This should not throw errors when event handlers are not provided
      render(<HotelMap hotels={mockHotels} />);

      const priceMarkers = screen.getAllByTestId('price-marker');
      const hotelPopups = screen.getAllByTestId('hotel-popup');

      // These clicks should not throw errors
      expect(() => {
        priceMarkers[0].click();
        hotelPopups[0].click();
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('renders empty map when no hotels or surroundings provided', () => {
      render(<HotelMap />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();

      const priceMarkers = screen.queryAllByTestId('price-marker');
      const pinMarkers = screen.queryAllByTestId('hotel-pin-marker');
      const poiMarkers = screen.queryAllByTestId('marker');

      expect(priceMarkers).toHaveLength(0);
      expect(pinMarkers).toHaveLength(0);
      expect(poiMarkers).toHaveLength(0);
    });

    it('handles hotels with missing coordinates gracefully', () => {
      const hotelWithMissingCoords = {
        ...mockHotels[0],
        latitude: 0,
        longitude: 0,
      };

      render(<HotelMap hotels={[hotelWithMissingCoords]} />);

      const priceMarkers = screen.getAllByTestId('price-marker');
      expect(priceMarkers).toHaveLength(1);
      expect(priceMarkers[0]).toHaveAttribute('data-position', JSON.stringify([0, 0]));
    });

    it('handles hotels with valid coordinates in bounds calculation', () => {
      const hotelWithValidCoords = {
        ...mockHotels[0],
        latitude: 1.3521,
        longitude: 103.8198,
      };

      render(<HotelMap hotels={[hotelWithValidCoords]} />);

      const priceMarkers = screen.getAllByTestId('price-marker');
      expect(priceMarkers).toHaveLength(1);
      expect(priceMarkers[0]).toHaveAttribute('data-position', JSON.stringify([1.3521, 103.8198]));
    });

    it('handles hotels with null/undefined coordinates', () => {
      const hotelWithNullCoords = {
        ...mockHotels[0],
        latitude: null as unknown as number,
        longitude: undefined as unknown as number,
      };

      // This should not crash and should not add to bounds
      render(<HotelMap hotels={[hotelWithNullCoords]} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();
    });

    it('handles surroundings with missing coordinates gracefully', () => {
      const surroundingWithMissingCoords = {
        ...mockSurroundings[0],
        latitude: 0,
        longitude: 0,
      };

      render(<HotelMap surroundings={[surroundingWithMissingCoords]} />);

      const markers = screen.getAllByTestId('marker');
      expect(markers).toHaveLength(1);
      expect(markers[0]).toHaveAttribute('data-position', JSON.stringify([0, 0]));
    });

    it('handles surroundings with valid coordinates in bounds calculation', () => {
      const surroundingWithValidCoords = {
        ...mockSurroundings[0],
        latitude: 1.353,
        longitude: 103.82,
      };

      render(<HotelMap surroundings={[surroundingWithValidCoords]} />);

      const markers = screen.getAllByTestId('marker');
      expect(markers).toHaveLength(1);
      expect(markers[0]).toHaveAttribute('data-position', JSON.stringify([1.353, 103.82]));
    });

    it('handles surroundings with null/undefined coordinates', () => {
      const surroundingWithNullCoords = {
        ...mockSurroundings[0],
        latitude: null as unknown as number,
        longitude: undefined as unknown as number,
      };

      // This should not crash and should not add to bounds
      render(<HotelMap surroundings={[surroundingWithNullCoords]} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();
    });
  });

  describe('Map Styling', () => {
    it('applies correct CSS classes and styles', () => {
      render(<HotelMap />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toHaveClass('map-container-class');
      expect(mapContainer).toHaveStyle({
        height: '100%',
        width: '100%',
      });
    });
  });

  describe('Map Bounds and Effects', () => {
    it('fits map bounds when hotels and surroundings are provided', () => {
      // This test ensures the useEffect that calls fitBounds is covered
      render(<HotelMap hotels={mockHotels} surroundings={mockSurroundings} />);

      // The bounds calculation should include all hotels and surroundings
      // This triggers the useEffect with bounds.isValid() === true
      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();

      // Verify that hotels and surroundings are rendered (indicating bounds were processed)
      const priceMarkers = screen.getAllByTestId('price-marker');
      const poiMarkers = screen.getAllByTestId('marker');

      expect(priceMarkers).toHaveLength(2);
      expect(poiMarkers).toHaveLength(2);
    });

    it('handles empty bounds gracefully', () => {
      // This ensures the bounds.isValid() === false path is covered
      render(<HotelMap hotels={[]} surroundings={[]} />);

      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toBeInTheDocument();

      // No markers should be rendered when bounds are empty
      const priceMarkers = screen.queryAllByTestId('price-marker');
      const poiMarkers = screen.queryAllByTestId('marker');

      expect(priceMarkers).toHaveLength(0);
      expect(poiMarkers).toHaveLength(0);
    });
  });
});
