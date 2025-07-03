import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { PriceTag } from './PriceTag';

interface PriceMarkerProps {
  position: [number, number];
  price: number;
  children?: React.ReactNode;
}

export default function PriceMarker({ position, price, children }: PriceMarkerProps) {
  // Memoize icon so it only rebuilds when `price` changes
  const icon = useMemo(() => {
    return L.divIcon({
      className: '', // empty: styles come from the inner markup
      html: ReactDOMServer.renderToString(<PriceTag price={price} />),
      iconSize: [56, 30],
      iconAnchor: [28, 30],
      popupAnchor: [0, -10],
    });
  }, [price]);

  return (
    <Marker position={position} icon={icon} riseOnHover={true}>
      {children}
    </Marker>
  );
}
