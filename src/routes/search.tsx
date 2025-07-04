import { useHotels } from '@/hooks/useHotels';
import styles from './search.module.css';
import { SearchControls } from '@/components/SearchControls/SearchControls';
import { Group } from '@mantine/core';
import { HotelMap } from '@/components/HotelMap/HotelMap';
import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { Footer } from '@/components/Footer/Footer';
import { useMarkerHover } from '@/hooks/useMarkerHover';
import { MenuButton } from '@/components/MenuButton/MenuButton';
import { Logo } from '@/components/Logo/Logo';

export const Route = createFileRoute({ component: RouteComponent });

function RouteComponent() {
  const { hotels, isLoading } = useHotels();
  const { makeMarkerRef, handleMouseEnter, handleMouseLeave, handlePopupOpen, handlePopupClose } =
    useMarkerHover();

  return (
    <>
      <div className={styles['logo']}>
        <Logo fontSize={'1.5rem'} />
      </div>
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
          {/* // TODO: Proper search bar and filter + menu button */}

          <Group wrap="nowrap" justify="space-between" mb={24}>
            <SearchControls flex={1} />
            <MenuButton />
          </Group>

          {/* Results grid */}
          <HotelGrid
            hotels={hotels}
            isLoading={isLoading}
            onHotelMouseEnter={handleMouseEnter}
            onHotelMouseLeave={handleMouseLeave}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
