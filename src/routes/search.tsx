import { CarouselCard, CarouselCardSkeleton } from '@/components/CarouselCard';
import { useHotels } from '@/hooks/useHotels';
import styles from './search.module.css';
import { SearchControls } from '@/components/SearchControls/SearchControls';

export const Route = createFileRoute({ component: RouteComponent });

function RouteComponent() {
  const { hotels, isLoading, getHotelImages } = useHotels();

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className={styles['grid-item']}>
          <CarouselCardSkeleton />
        </div>
      ));
  };

  const renderHotelCards = () => {
    return hotels.map((hotel) => (
      <div key={hotel.id} className={styles['grid-item']}>
        <CarouselCard
          id={hotel.id}
          name={hotel.name}
          address={hotel.address ?? ''}
          rating={hotel.rating}
          images={getHotelImages(hotel)}
        />
      </div>
    ));
  };

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
            <SearchControls />
            <button disabled>Menu</button>
          </div>
          {/* Results grid */}
          <div className={styles['grid-list']}>
            {isLoading ? renderSkeletons() : renderHotelCards()}
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
