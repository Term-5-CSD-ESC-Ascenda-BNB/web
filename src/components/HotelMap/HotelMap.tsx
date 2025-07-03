import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Hotel } from '@/types/Hotel';
import { useEffect, useMemo, useRef } from 'react';
import { latLng, LatLngBounds, Map as LeafletMap } from 'leaflet';
import PriceMarker from './PriceMarker';
import { Paper } from '@mantine/core';

interface HotelMapProps {
  hotels: Hotel[];
}

export function HotelMap({ hotels }: HotelMapProps) {
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
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {hotels.map((hotel) => (
        <PriceMarker
          key={hotel.id}
          position={[hotel.latitude, hotel.longitude]}
          price={hotel.price}
        >
          <Popup>
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
            <p>Rating: {hotel.rating}/5</p>
          </Popup>
        </PriceMarker>
      ))}
    </MapContainer>
  );
}
