import { useEffect, useState } from 'react';
import { CarouselCard } from '@/components/CarouselCard/CarouselCard.tsx';
import mockData from '@/.mock_data/hotels.json';
import type { Hotel } from '@/types/Hotel';
import styles from './search.module.css';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  /*
  const fetchHotels = async (): Promise<Hotel[]> => {
    const res = await axios.get('https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU');
    return res.data.hotels || [];
  };

  const {
    data: hotels = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['hotels', 'RsBU'],
    queryFn: fetchHotels,
  });

  if (isLoading) return <div>Loading hotels...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  */

  // Define a type for hotel if not already defined
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulate fetching data, temporary until actual API is implemented
    setHotels(mockData.slice(0, 18));
  }, []);

  return (
    <>
      <div className={styles['root-container']}>
        {/* Map panel */}
        <div className={styles['map-container']}>
          <span style={{ fontSize: 32 }}>Map</span>
        </div>
        {/* Search results panel */}
        <div className={styles['results-container']}>
          {/* TODO: Proper search bar and filter + menu button */}
          <div
            style={{
              marginBottom: 24,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <input placeholder="Somewhere, Someplace" style={{ flex: 1, padding: 8 }} disabled />
            <input placeholder="30 Jun - 30 Aug" style={{ width: 180, padding: 8 }} disabled />
            <input placeholder="2 guests" style={{ width: 100, padding: 8 }} disabled />
            <button disabled>Filter</button>
            <button disabled>Menu</button>
          </div>
          {/* Results grid */}
          {/* <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {hotels.map((hotel) => {
              // Build image URLs from image_details
              const images: string[] = [];
              if (hotel.image_details) {
                const { prefix, suffix, count } = hotel.image_details;
                for (let i = 0; i < count; i++) {
                  images.push(`${prefix}${i}${suffix}`);
                }
              }
              return (
                <CarouselCard
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  description={hotel.description ?? ''}
                  rating={hotel.rating}
                  images={images}
                />
              );
            })}
          </div> */}
          <div className={styles['grid-list']}>
            {hotels.map((hotel) => {
              const images: string[] = [];
              if (hotel.image_details && hotel.hires_image_index) {
                const { prefix, suffix } = hotel.image_details;
                const indices = hotel.hires_image_index
                  .split(',')
                  .map((i) => i.trim())
                  .slice(0, 5);
                for (const idx of indices) {
                  images.push(`${prefix}${idx}${suffix}`);
                }
              }
              return (
                <div key={hotel.id} className={styles['grid-item']}>
                  <CarouselCard
                    id={hotel.id}
                    name={hotel.name}
                    address={hotel.address ?? ''}
                    rating={hotel.rating}
                    images={images}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles['footer']}>
        <footer>
          <p>© 2023 Your Company Name. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
