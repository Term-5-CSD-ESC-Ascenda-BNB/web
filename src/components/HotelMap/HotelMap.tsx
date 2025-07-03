import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import type { Hotel } from '@/types/Hotel';
import { useEffect, useMemo, useRef } from 'react';
import { latLng, LatLngBounds, Map as LeafletMap } from 'leaflet';
import PriceMarker from './PriceMarker';
import styles from './Popup.module.css';
import { CarouselCard, CarouselCardDetails } from '../CarouselCard';
import { Stack } from '@mantine/core';
import { ImageCarousel } from '../CarouselCard/ImageCarousel';
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
          <Popup className={styles.popup} minWidth={300} maxWidth={300}>
            {/* <div>
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
              <p>Rating: {hotel.rating}/5</p>
            </div> */}
            <Stack gap={0} w={300}>
              <div
                style={{
                  borderRadius: 'var(--mantine-radius-lg) var(--mantine-radius-lg) 0 0',
                  overflow: 'hidden',
                }}
              >
                <ImageCarousel images={hotel.images} aspectRatio={4 / 3} />
              </div>
              <div style={{ cursor: 'pointer', margin: '0.6rem 1rem' }}>
                <CarouselCardDetails
                  name={hotel.name}
                  address={hotel.address ?? ''}
                  rating={hotel.rating}
                  price={hotel.price}
                  score={hotel.score}
                  onClick={() => {}}
                />
              </div>
            </Stack>
          </Popup>
        </PriceMarker>
      ))}
    </MapContainer>
  );
}
