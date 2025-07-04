import { CarouselCard, CarouselCardSkeleton } from '@/components/CarouselCard';
import { useHotels } from '@/hooks/useHotels';
import styles from './search.module.css';
import { SearchControls } from '@/components/SearchControls/SearchControls';
import { Group, SimpleGrid } from '@mantine/core';
import { HotelMap } from '@/components/HotelMap/HotelMap';
import { Footer } from '@/components/Footer/Footer';
import { useMarkerHover } from '@/hooks/useMarkerHover';

export const Route = createFileRoute({ component: RouteComponent });

function RouteComponent() {
  const { hotels, isLoading } = useHotels();
  const { makeMarkerRef, handleMouseEnter, handleMouseLeave, handlePopupOpen, handlePopupClose } =
    useMarkerHover();

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
          images={hotel.images}
          price={hotel.price}
          score={hotel.score}
          onMouseEnter={() => handleMouseEnter(hotel.id)}
          onMouseLeave={() => handleMouseLeave(hotel.id)}
        />
      </div>
    ));
  };

  return (
    <>
      <div className={styles['root-container']}>
        {/* Map panel */}
        <div className={styles['map-container']}>
          {/* <span style={{ fontSize: 32 }}>Map</span> */}
          <HotelMap
            hotels={hotels}
            getMarkerRef={makeMarkerRef}
            onPopupOpen={handlePopupOpen}
            onPopupClose={handlePopupClose}
          />
        </div>
        {/* Search results panel */}
        <div className={styles['results-container']}>
          {/* TODO: Proper search bar and filter + menu button */}

          <Group wrap="nowrap" justify="space-between" mb={24}>
            <SearchControls flex={1} />
            <button disabled>Menu</button>
          </Group>

          {/* Results grid */}
          <SimpleGrid type="container" cols={{ base: 2, '620px': 3 }} mb={'xl'}>
            {isLoading ? renderSkeletons() : renderHotelCards()}
          </SimpleGrid>
        </div>
      </div>

      <Footer />
    </>
  );
}
