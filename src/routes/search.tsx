import { useMarkerHover } from '@/hooks';
import styles from './search.module.css';
import { SearchControls } from '@/components/SearchControls/SearchControls';
import { Group, Skeleton, Stack, Text } from '@mantine/core';
import { HotelMap } from '@/features/SearchPage/HotelMap/HotelMap';
import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { MenuButton } from '@/components/buttons/MenuButton/MenuButton';
import { Logo } from '@/components/Logo/Logo';
import { SortableSelect } from '@/components/SortableSelect/SortableSelect';
import { FilterButton } from '@/components/buttons/FilterButton/FilterButton';
import type { FilterState } from '@/components/buttons/FilterButton/FilterPanel';
import { SearchParamsSchema } from '@/schemas/searchParams';
import { useHotels } from '@/features/SearchPage/useHotels';
import { SearchPagination } from '@/features/SearchPage/SearchPagination/SearchPagination';
import { ErrorAlert } from '@/components/ErrorAlert/ErrorAlert';

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: SearchParamsSchema,
});

function RouteComponent() {
  const { data, isLoading, error, isError } = useHotels();
  const hotels = data?.hotels || [];

  const { makeMarkerRef, handleMouseEnter, handleMouseLeave, handlePopupOpen, handlePopupClose } =
    useMarkerHover();

  const handleFiltersChange = (filters: FilterState) => {
    // TODO
    console.log('Filters changed:', filters);
  };

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    // TODO
    console.log('Sort changed:', field, order);
  };

  return (
    <>
      <div className={styles['root-container']}>
        {/* Logo */}
        <div className={styles['logo']}>
          <Logo fz={'1.5rem'} />
        </div>

        {/* Left panel - Map view */}
        <div className={styles['map-container']}>
          <HotelMap
            hotels={hotels}
            getMarkerRef={makeMarkerRef}
            onPopupOpen={handlePopupOpen}
            onPopupClose={handlePopupClose}
          />
        </div>

        {/* Right panel - Search results */}
        <Stack gap={12} className={styles['results-container']}>
          <Group wrap="nowrap" justify="space-between" align="flex-start">
            <SearchControls />
            <MenuButton />
          </Group>

          <Group justify="flex-start" gap={'xs'}>
            {isLoading ? <Skeleton h={20} w={80} /> : <Text mr="xs">{hotels.length} results</Text>}

            <Text c={'dimmed'}>Sort by:</Text>
            <SortableSelect
              fields={['Rating', 'Price', 'Name']}
              w={120}
              onSortChange={handleSortChange}
            />
            <FilterButton onFiltersChange={handleFiltersChange} />
          </Group>

          {/* Results grid */}
          {isError && <ErrorAlert title={'Error fetching hotels'} message={error.message} />}

          {!isError && (
            <HotelGrid
              hotels={hotels}
              isLoading={isLoading}
              onHotelMouseEnter={handleMouseEnter}
              onHotelMouseLeave={handleMouseLeave}
              flex={1}
            />
          )}

          <SearchPagination totalPages={Math.ceil(hotels.length / 18)} mb={'xl'} />
        </Stack>
      </div>
    </>
  );
}
