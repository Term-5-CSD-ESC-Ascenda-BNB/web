import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { latLng, LatLngBounds, Map as LeafletMap, divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { HotelPinMarker } from './HotelPinMarker';

import mapStyles from './Map.module.css';
import PriceMarker from './PriceMarker';
import { HotelPopup } from './HotelPopup';
import type { Hotel } from '@/types/Hotel';

import { getSurroundingIcon } from '@/utils/getSurroundingIcon';
import { getCategory, getCategoryColor } from '@/utils/getSurroundingCategory';

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
  interactive?: boolean;
}

export function HotelMap({
  hotels = [],
  surroundings = [],
  getMarkerRef,
  onPopupOpen,
  onPopupClose,
  center: providedCenter,
  zoom: providedZoom = 13,
  interactive = true,
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
      scrollWheelZoom={interactive ?? true}
      dragging={interactive ?? true}
      doubleClickZoom={interactive ?? true}
      touchZoom={interactive ?? true}
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

      {hotels.map((hotel) => {
        const position: [number, number] = [hotel.latitude, hotel.longitude];

        // Use pin marker for mini map (interactive=false)
        if (!interactive) {
          return <HotelPinMarker key={hotel.id} position={position} />;
        }

        return (
          <PriceMarker
            key={hotel.id}
            position={position}
            price={hotel.price}
            markerRef={getMarkerRef ? getMarkerRef(hotel.id) : undefined}
            onPopupOpen={() => onPopupOpen?.(hotel.id)}
            onPopupClose={() => onPopupClose?.(hotel.id)}
          >
            <HotelPopup
              hotel={hotel}
              onClick={() => console.log(`Clicked on hotel: ${hotel.id}`)}
            />
          </PriceMarker>
        );
      })}

      {surroundings.map((poi, idx) => {
        const category = getCategory(poi.type);
        const color = getCategoryColor(category);
        const icon = getSurroundingIcon(poi.type);

        const html = renderToStaticMarkup(
          <div
            style={{
              backgroundColor: color,
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

        return (
          <Marker
            key={`poi-${idx}`}
            position={[poi.latitude, poi.longitude]}
            icon={divIcon({
              className: 'custom-icon',
              html,
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
