import { Marker } from 'react-leaflet';
import { divIcon, Marker as LeafletMarker } from 'leaflet';
import { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { PriceTag } from './PriceTag';
import styles from './PriceMarker.module.css';

interface PriceMarkerProps {
  position: [number, number];
  price: number;
  children?: React.ReactNode;
  markerRef?: React.Ref<LeafletMarker>;
}

export default function PriceMarker({ position, price, children, markerRef }: PriceMarkerProps) {
  // Memoize icon so it only rebuilds when `price` changes
  const icon = useMemo(() => {
    return divIcon({
      className: styles.priceMarker,
      html: ReactDOMServer.renderToString(<PriceTag price={price} />),
      iconSize: [56, 30],
      iconAnchor: [28, 30],
      popupAnchor: [0, -20],
    });
  }, [price]);

  return (
    <Marker position={position} icon={icon} riseOnHover={true} ref={markerRef}>
      {children}
    </Marker>
  );
}
