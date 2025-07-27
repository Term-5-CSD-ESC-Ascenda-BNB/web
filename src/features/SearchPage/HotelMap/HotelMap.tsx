import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import type { MockHotel } from '@/types/MockHotel';
import { useEffect, useMemo, useRef } from 'react';
import { latLng, LatLngBounds, Map as LeafletMap } from 'leaflet';
import PriceMarker from './PriceMarker';
import { HotelPopup } from './HotelPopup';
import mapStyles from './Map.module.css';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconMinus, IconPlus } from '@tabler/icons-react';

interface HotelMapProps {
  hotels: MockHotel[];
  getMarkerRef: (id: string) => (marker: L.Marker | null) => void;
  onPopupOpen: (id: string) => void;
  onPopupClose: (id: string) => void;
}

export function HotelMap({ hotels, getMarkerRef, onPopupOpen, onPopupClose }: HotelMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const center = latLng(1.3521, 103.8198);

  // Calculate bounds for all hotels
  const bounds = useMemo(() => {
    if (hotels.length === 0) return null;

    const bounds = new LatLngBounds([]);
    hotels.forEach((hotel) => {
      if (hotel.latitude && hotel.longitude) {
        bounds.extend([hotel.latitude, hotel.longitude]);
      }
    });
    return bounds;
  }, [hotels]);

  // Fit map to bounds when hotels change
  useEffect(() => {
    if (mapRef.current && bounds && bounds.isValid()) {
      const map = mapRef.current;
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bounds]);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      wheelPxPerZoomLevel={120}
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
          markerRef={getMarkerRef(hotel.id)}
          onPopupOpen={() => onPopupOpen(hotel.id)}
          onPopupClose={() => onPopupClose(hotel.id)}
        >
          <HotelPopup
            hotel={hotel}
            onClick={(hotelId) => {
              console.log(`Clicked on hotel: ${hotelId}`);
            }}
          />
        </PriceMarker>
      ))}
    </MapContainer>
  );
}
