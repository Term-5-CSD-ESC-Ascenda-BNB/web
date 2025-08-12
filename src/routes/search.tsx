import { useMarkerHover } from '@/hooks';
import styles from './search.module.css';
import { SearchControls } from '@/components/SearchControls/SearchControls';
import { Group, Skeleton, Stack, Text } from '@mantine/core';
import { HotelMap } from '@/features/SearchPage/HotelMap/HotelMap';
import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { MenuButton } from '@/components/menu/MenuButton/MenuButton';
import { Logo } from '@/components/Logo/Logo';
import { SortableSelect } from '@/components/SortableSelect/SortableSelect';
import { FilterButton } from '@/components/buttons/FilterButton/FilterButton';
import type { FilterState } from '@/components/buttons/FilterButton/FilterPanel';
import {
  SearchParamsSchema,
  SORT_BY_FIELDS,
  type SearchParams,
  type SortBy,
} from '@/schemas/searchParams';
import { useHotels } from '@/features/SearchPage/useHotels';
import { SearchPagination } from '@/features/SearchPage/SearchPagination/SearchPagination';
import { ErrorAlert } from '@/components/ErrorAlert/ErrorAlert';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSearchState } from '@/features/SearchPage/useSearchState';
import { defaultFilters } from '@/components/buttons/FilterButton/hooks/useFilterState';

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: SearchParamsSchema,
});

const RESULTS_PER_PAGE = 18;

function RouteComponent() {
  // On mount, fetch hotels based on search parameters
  const { data, isLoading, error, isError } = useHotels();
  const hotels = data?.hotels || [];
  const hotelsLength = data?.hotelsTotalLength || 0;

  // Handle marker and card hover events
  const { makeMarkerRef, handleMouseEnter, handleMouseLeave, handlePopupOpen, handlePopupClose } =
    useMarkerHover();

  /**
   *  Update search parameters
   */

  const { updateSearchParams } = useSearchState();

  // Handle filter changes
  const handleFiltersChange = (filters: FilterState) => {
    const updatedSearchParams: Partial<SearchParams> = {};
    const MAX_PRICE = defaultFilters.priceRange[1];

    // Only add price range if it's not the default/full range
    if (filters.priceRange[0] > 0) {
      updatedSearchParams.minPrice = filters.priceRange[0];
    } else {
      updatedSearchParams.minPrice = undefined; // Reset if default
    }

    if (filters.priceRange[1] < MAX_PRICE) {
      updatedSearchParams.maxPrice = filters.priceRange[1];
    } else {
      updatedSearchParams.maxPrice = undefined; // Reset if default
    }

    // Only add rating if it's set (assuming 0 or undefined means no filter)
    if (filters.minRating && filters.minRating > 0) {
      updatedSearchParams.minRating = filters.minRating;
    }

    // Only add review score if it's set
    if (filters.minReviewScore && filters.minReviewScore > 0) {
      updatedSearchParams.minScore = filters.minReviewScore;
    }

    updateSearchParams(updatedSearchParams);
  };

  // Handle sorting changes
  const handleSortChange = (field: SortBy, order: 'asc' | 'desc') => {
    const updatedSearchParams: Partial<SearchParams> = {
      sortBy: field,
      sortOrder: order,
    };

    updateSearchParams(updatedSearchParams);
  };

  /**
   * Navigate to hotel details page
   */

  const searchParams = useSearch({ from: '/search' });
  const navigate = useNavigate();

  const handleNavigateToHotel = (hotelId: string) => {
    console.log(`Navigating to hotel ${hotelId}`);

    void navigate({
      to: `/hotels/${hotelId}`,
      search: SearchParamsSchema.parse(searchParams),
    });
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
            onPopupClick={handleNavigateToHotel}
          />
        </div>

        {/* Right panel - Search results */}
        <Stack gap={12} className={styles['results-container']}>
          <Group wrap="nowrap" justify="space-between" align="flex-start">
            <SearchControls />
            <MenuButton />
          </Group>

          <Group justify="flex-start" gap={'xs'}>
            {isLoading || hotels.length === 0 ? (
              <Skeleton h={20} w={80} />
            ) : (
              <Text mr="xs">{hotelsLength} results</Text>
            )}

            <Text c={'dimmed'}>Sort by:</Text>
            <SortableSelect fields={[...SORT_BY_FIELDS]} w={120} onSortChange={handleSortChange} />
            <FilterButton onFiltersChange={handleFiltersChange} />
          </Group>

          {/* Results grid */}
          {isError && <ErrorAlert title={'Error fetching hotels'} message={error.message} />}

          {!isError && (
            <HotelGrid
              hotels={hotels}
              isLoading={isLoading || hotels.length === 0}
              onHotelMouseEnter={handleMouseEnter}
              onHotelMouseLeave={handleMouseLeave}
              onHotelClick={handleNavigateToHotel}
              flex={1}
            />
          )}

          <SearchPagination totalPages={Math.ceil(hotelsLength / RESULTS_PER_PAGE)} mb={'xl'} />
        </Stack>
      </div>
    </>
  );
}
