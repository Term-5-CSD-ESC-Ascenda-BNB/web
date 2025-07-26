import { useState } from 'react';
import { type FilterState } from '../FilterPanel';

const defaultFilters: FilterState = {
  priceRange: [0, 1000],
  minRating: 0,
  minReviewScore: 0,
};

interface UseFilterStateProps {
  initialFilters?: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function useFilterState({ initialFilters, onFiltersChange }: UseFilterStateProps) {
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(
    initialFilters || defaultFilters
  );
  const [draftFilters, setDraftFilters] = useState<FilterState>(initialFilters || defaultFilters);

  const countAppliedFilters = () => {
    let count = 0;

    if (
      appliedFilters.priceRange[0] !== defaultFilters.priceRange[0] ||
      appliedFilters.priceRange[1] !== defaultFilters.priceRange[1]
    ) {
      count++;
    }

    if (appliedFilters.minRating > defaultFilters.minRating) {
      count++;
    }

    if (appliedFilters.minReviewScore > defaultFilters.minReviewScore) {
      count++;
    }

    return count;
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    onFiltersChange(draftFilters);
  };

  const handleResetFilters = () => {
    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const resetDraftFilters = () => {
    setDraftFilters(appliedFilters);
  };

  return {
    appliedFilters,
    draftFilters,
    setDraftFilters,
    countAppliedFilters,
    handleApplyFilters,
    handleResetFilters,
    resetDraftFilters,
    defaultFilters,
  };
}
