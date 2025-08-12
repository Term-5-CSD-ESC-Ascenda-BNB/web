import type { SearchParams } from '@/schemas/searchParams';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { SearchParamsSchema } from '@/schemas/searchParams';

/**
 * This hook accepts changes to the search parameters and navigates to the new URL accordingly.
 */
export function useSearchState() {
  const navigate = useNavigate();
  const currentSearchParams = useSearch({ from: '/search' });

  const updateSearchParams = (updates: Partial<SearchParams>) => {
    const newParams = { ...currentSearchParams, ...updates };

    void navigate({
      to: '/search',
      search: SearchParamsSchema.parse(newParams),
    });
  };

  return {
    searchParams: currentSearchParams,
    updateSearchParams,
  };
}
