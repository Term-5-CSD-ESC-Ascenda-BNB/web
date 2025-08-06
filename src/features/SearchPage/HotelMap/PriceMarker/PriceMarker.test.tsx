import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// 1) Stub react-leaflet's Marker to capture props
vi.mock('react-leaflet', () => ({
  Marker: ({
    position,
    icon,
    riseOnHover,
    eventHandlers,
    children,
  }: {
    position: [number, number];
    icon: { opts: Record<string, unknown> };
    riseOnHover: boolean;
    eventHandlers: Record<string, () => void>;
    children?: React.ReactNode;
  }) => (
    <div
      data-testid="marker"
      data-position={JSON.stringify(position)}
      data-icon={JSON.stringify(icon.opts)}
      data-rise-on-hover={String(riseOnHover)}
      data-event-handlers={JSON.stringify(Object.keys(eventHandlers))}
    >
      {children}
    </div>
  ),
}));

// 2) Stub leaflet's divIcon to return a predictable object
vi.mock('leaflet', () => ({
  divIcon: (opts: Record<string, unknown>) => ({ opts }),
  Marker: class {},
}));

// 3) Stub ReactDOMServer.renderToString
vi.mock('react-dom/server', () => ({
  default: {
    renderToString: (el: { props: { price: number } }) => `<div>${el.props.price}</div>`,
  },
}));

// 4) Stub PriceTag to render price in a span
vi.mock('./PriceTag/PriceTag', () => ({
  PriceTag: ({ price }: { price: number }) => <span data-testid="price-tag">{price}</span>,
}));

// 5) Stub CSS module
vi.mock('./PriceMarker.module.css', () => ({
  default: {
    priceMarker: 'price-marker-class',
  },
}));

import PriceMarker from './PriceMarker';

describe('PriceMarker', () => {
  const position: [number, number] = [12.34, 56.78];
  const price = 999;
  let onOpen: ReturnType<typeof vi.fn>;
  let onClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onOpen = vi.fn();
    onClose = vi.fn();
  });

  it('renders Marker with correct props and children', () => {
    render(
      <PriceMarker
        position={position}
        price={price}
        markerRef={null}
        onPopupOpen={onOpen}
        onPopupClose={onClose}
      >
        <div data-testid="child">Hello</div>
      </PriceMarker>
    );

    const marker = screen.getByTestId('marker');
    // position prop
    expect(marker).toHaveAttribute('data-position', JSON.stringify(position));
    // riseOnHover
    expect(marker).toHaveAttribute('data-rise-on-hover', 'true');
    // event handlers
    const handlers = JSON.parse(marker.getAttribute('data-event-handlers')!) as string[];
    expect(handlers).toContain('popupopen');
    expect(handlers).toContain('popupclose');
    // icon opts
    const iconOpts = JSON.parse(marker.getAttribute('data-icon')!) as {
      className: string;
      iconSize: [number, number];
      iconAnchor: [number, number];
      popupAnchor: [number, number];
      html: string;
    };
    expect(iconOpts).toMatchObject({
      className: 'price-marker-class',
      iconSize: [56, 30],
      iconAnchor: [28, 30],
      popupAnchor: [0, -20],
    });
    // html rendered includes stubbed PriceTag output
    expect(iconOpts.html).toBe(`<div>${price}</div>`);
    // children
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });
});
