import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { latLng, LatLngBounds, Map as LeafletMap, divIcon, Marker as LeafletMarker } from 'leaflet';
import * as L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  IconPlus,
  IconMinus,
  IconTrain,
  IconPlane,
  IconShoppingBag,
  IconStar,
  IconToolsKitchen,
  IconMapPin,
} from '@tabler/icons-react';

import mapStyles from './Map.module.css';
import PriceMarker from './PriceMarker';
import { HotelPopup } from './HotelPopup';
import type { Hotel } from '@/types/Hotel';

interface Surrounding {
  type: string;
  name: string;
  distance: string;
  latitude: number;
  longitude: number;
}

type MarkerRefHandler = (id: string) => (marker: L.Marker | null) => void;
type PopupHandler = (id: string) => void;

interface HotelMapProps {
  hotels?: Hotel[];
  surroundings?: Surrounding[];
  getMarkerRef?: MarkerRefHandler;
  onPopupOpen?: PopupHandler;
  onPopupClose?: PopupHandler;
  center?: [number, number];
  zoom?: number;
}

export function HotelMap({
  hotels = [],
  surroundings = [],
  getMarkerRef,
  onPopupOpen,
  onPopupClose,
  center: providedCenter,
  zoom: providedZoom = 13,
}: HotelMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const center = providedCenter ?? latLng(1.3521, 103.8198);

  const bounds = useMemo(() => {
    const b = new LatLngBounds([]);

    hotels.forEach((hotel) => {
      if (hotel.latitude && hotel.longitude) {
        b.extend([hotel.latitude, hotel.longitude]);
      }
    });

    surroundings.forEach((poi) => {
      if (poi.latitude && poi.longitude) {
        b.extend([poi.latitude, poi.longitude]);
      }
    });

    return b;
  }, [hotels, surroundings]);

  useEffect(() => {
    if (mapRef.current && bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bounds]);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={providedZoom}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
      zoomControl={false}
      className={mapStyles.mapContainer}
    >
      <ZoomControl
        position="topright"
        zoomInText={renderToStaticMarkup(
          <IconPlus size={20} stroke={2} color="var(--mantine-color-primary-8)" />
        )}
        zoomOutText={renderToStaticMarkup(
          <IconMinus size={20} stroke={2} color="var(--mantine-color-primary-8)" />
        )}
      />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {hotels.map((hotel) => (
        <PriceMarker
          key={hotel.id}
          position={[hotel.latitude, hotel.longitude]}
          price={hotel.price}
          markerRef={getMarkerRef ? getMarkerRef(hotel.id) : undefined}
          onPopupOpen={() => onPopupOpen?.(hotel.id)}
          onPopupClose={() => onPopupClose?.(hotel.id)}
        >
          <HotelPopup hotel={hotel} onClick={() => console.log(`Clicked on hotel: ${hotel.id}`)} />
        </PriceMarker>
      ))}

      {surroundings.map((poi, idx) => (
        <Marker
          key={`poi-${idx}`}
          position={[poi.latitude, poi.longitude]}
          icon={divIcon({
            className: 'custom-icon',
            html: renderToStaticMarkup(getPOIIcon(poi.type)),
            iconSize: [28, 28],
            iconAnchor: [14, 28],
          })}
        >
          <Popup>
            <strong>{poi.type}</strong>: {poi.name}
            <br />
            {poi.distance}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function getPOIIcon(type: string) {
  const iconMap: Record<string, React.ReactElement> = {
    Metro: <IconTrain size={20} color="#1c7ed6" />,
    Train: <IconTrain size={20} color="#1c7ed6" />,
    Airport: <IconPlane size={20} color="#1971c2" />,
    Shopping: <IconShoppingBag size={20} color="#2f9e44" />,
    Dining: <IconToolsKitchen size={20} color="#e8590c" />,
    Attraction: <IconStar size={20} color="#fab005" />,
  };

  return iconMap[type] ?? <IconMapPin size={20} />;
}
