import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { POIMarker } from './POIMarker';

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  Marker: ({
    position,
    icon,
    children,
  }: {
    position: [number, number];
    icon: { options: { iconSize: number[]; html: string } };
    children: React.ReactNode;
  }) => (
    <div
      data-testid="poi-marker"
      data-position={position.join(',')}
      data-icon-size={icon.options.iconSize.join(',')}
      data-icon-html={icon.options.html}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  divIcon: (options: {
    className: string;
    html: string;
    iconSize: number[];
    iconAnchor: number[];
  }) => ({ options }),
}));

// Mock react-dom/server
vi.mock('react-dom/server', () => ({
  renderToStaticMarkup: () => '<rendered-poi-icon>',
}));

// Mock utility functions
vi.mock('./mapHelpers', () => ({
  getPOIIcon: (category: string) => <span data-testid={`poi-icon-${category}`}>📍</span>,
}));

vi.mock('@/utils/getSurroundingCategory', () => ({
  getCategory: (type: string) => {
    const mapping: Record<string, string> = {
      restaurant: 'Dining',
      museum: 'Landmarks',
      train_station: 'Transport',
    };
    return mapping[type] || 'Others';
  },
}));

describe('POIMarker', () => {
  it('renders with correct icon and popup', () => {
    const mockPoi = {
      type: 'restaurant',
      name: 'Pizza Place',
      distance: '200m',
      latitude: 40.713,
      longitude: -74.0062,
    };

    render(<POIMarker poi={mockPoi} index={0} />);

    const marker = screen.getByTestId('poi-marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('data-position', '40.713,-74.0062');
    expect(marker).toHaveAttribute('data-icon-size', '28,28');
    expect(marker).toHaveAttribute('data-icon-html', '<rendered-poi-icon>');

    // Check popup content
    const popup = screen.getByTestId('popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent('restaurant: Pizza Place');
    expect(popup).toHaveTextContent('200m');
  });
});
