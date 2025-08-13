import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HotelPinMarker } from './HotelPinMarker';

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  Marker: ({
    position,
    icon,
  }: {
    position: [number, number];
    icon: { options: { iconSize: number[]; html: string } };
  }) => (
    <div
      data-testid="marker"
      data-position={position.join(',')}
      data-icon-size={icon.options.iconSize.join(',')}
      data-icon-html={icon.options.html}
    />
  ),
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
  default: {
    renderToString: (element: React.ReactElement) => '<div>mocked-hotel-icon</div>',
  },
}));

// Mock tabler icons
vi.mock('@tabler/icons-react', () => ({
  IconBed: ({ size, color }: { size: number; color: string }) => (
    <span data-testid="icon-bed" data-size={size} data-color={color}>
      🏨
    </span>
  ),
}));

describe('HotelPinMarker', () => {
  it('renders with correct icon size and color', () => {
    const position: [number, number] = [40.7128, -74.006];

    render(<HotelPinMarker position={position} />);

    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('data-position', '40.7128,-74.006');
    expect(marker).toHaveAttribute('data-icon-size', '32,32');
    expect(marker).toHaveAttribute('data-icon-html', '<div>mocked-hotel-icon</div>');
  });
});
