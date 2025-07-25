import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { latLng, LatLngBounds, Map as LeafletMap, divIcon } from 'leaflet';
import * as L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconPlus, IconMinus } from '@tabler/icons-react';

import mapStyles from './Map.module.css';
import PriceMarker from './PriceMarker';
import { HotelPopup } from './HotelPopup';
import type { Hotel } from '@/types/Hotel';
import {
  IconTrain,
  IconToolsKitchen,
  IconShoppingBag,
  IconStar,
  IconMapPin,
} from '@tabler/icons-react'; // use only 1 per category

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

      {surroundings.map((poi, idx) => {
        const category = getCategory(poi.type);
        return (
          <Marker
            key={`poi-${idx}`}
            position={[poi.latitude, poi.longitude]}
            icon={divIcon({
              className: 'custom-icon',
              html: renderToStaticMarkup(getPOIIcon(category)),
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
        );
      })}
    </MapContainer>
  );
}

// === Helpers ===

function getPOIIcon(category: Category) {
  const icon = getCategoryIcon(category);
  const bgColor = getCategoryColor(category);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: '50%',
        width: 28,
        height: 28,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {icon}
    </div>
  );
}

type Category = 'Transport' | 'Dining' | 'Shopping' | 'Landmarks' | 'Others';

function getCategory(type: string): Category {
  const t = type.toLowerCase();

  if (
    ['bus', 'subway', 'station', 'train', 'taxi', 'public_transport', 'platform'].some((s) =>
      t.includes(s)
    )
  )
    return 'Transport';

  if (
    ['restaurant', 'cafe', 'fast_food', 'food_court', 'bakery', 'ice_cream'].some((s) =>
      t.includes(s)
    )
  )
    return 'Dining';

  if (
    ['supermarket', 'mall', 'store', 'convenience', 'toys', 'electronics', 'retail', 'shop'].some(
      (s) => t.includes(s)
    )
  )
    return 'Shopping';

  if (
    [
      'hotel',
      'guest_house',
      'museum',
      'school',
      'park',
      'monument',
      'temple',
      'church',
      'police',
    ].some((s) => t.includes(s))
  )
    return 'Landmarks';

  return 'Others';
}

function getCategoryColor(category: Category): string {
  switch (category) {
    case 'Transport':
      return '#1c7ed6'; // Blue
    case 'Dining':
      return '#e8590c'; // Orange
    case 'Shopping':
      return '#2f9e44'; // Green
    case 'Landmarks':
      return '#fab005'; // Yellow
    default:
      return '#868e96'; // Gray for Others
  }
}

function getCategoryIcon(category: Category): React.ReactElement {
  switch (category) {
    case 'Transport':
      return <IconTrain size={18} color="white" />;
    case 'Dining':
      return <IconToolsKitchen size={18} color="white" />;
    case 'Shopping':
      return <IconShoppingBag size={18} color="white" />;
    case 'Landmarks':
      return <IconStar size={18} color="white" />;
    default:
      return <IconMapPin size={18} color="white" />;
  }
}
