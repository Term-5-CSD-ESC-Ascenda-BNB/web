import { useHotels, useMarkerHover } from '@/hooks';
import styles from './search.module.css';
import { SearchControls } from '@/components/SearchControls/SearchControls';
import { Group, Skeleton, Stack, Text } from '@mantine/core';
import { HotelMap } from '@/components/HotelMap/HotelMap';
import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { Footer } from '@/components/Footer/Footer';
import { MenuButton } from '@/components/MenuButton/MenuButton';
import { Logo } from '@/components/Logo/Logo';
import { SortableSelect } from '@/components/SortableSelect/SortableSelect';

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
        <div className={styles['map-container']}>
          <HotelMap
            hotels={hotels}
            getMarkerRef={makeMarkerRef}
            onPopupOpen={handlePopupOpen}
            onPopupClose={handlePopupClose}
          />
        </div>

        <Stack gap={12} className={styles['results-container']}>
          <Group wrap="nowrap" justify="space-between" align="flex-start">
            <SearchControls flex={1} />
            <MenuButton />
          </Group>

          <Group justify="flex-start" gap={'xs'}>
            <Text mr={'xs'}>
              {isLoading ? <Skeleton h={20} w={80} /> : `${hotels.length} results`}
            </Text>

            <Text c={'dimmed'}>Sort by:</Text>
            <SortableSelect fields={['Rating', 'Price', 'Name']} w={120} />
          </Group>

          {/* Results grid */}
          <HotelGrid
            hotels={hotels}
            isLoading={isLoading}
            onHotelMouseEnter={handleMouseEnter}
            onHotelMouseLeave={handleMouseLeave}
          />
        </Stack>
      </div>

      <Footer />
    </>
  );
}
