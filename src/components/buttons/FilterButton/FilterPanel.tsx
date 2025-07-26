import React from 'react';
import { Stack, Button, Group } from '@mantine/core';
import { PriceRangeSlider } from './PriceRangeSlider/PriceRangeSlider';
import { RatingSelector } from './RatingSelector/RatingSelector';
import { ReviewScoreSlider } from './ReviewScoreSelector/ReviewScoreSlider';

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  minReviewScore: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  defaultFilters: FilterState;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  onApply,
  onReset,
  defaultFilters,
}: FilterPanelProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Stack gap={'md'}>
      <PriceRangeSlider
        value={filters.priceRange}
        onChange={(value) => updateFilter('priceRange', value)}
        maxPrice={defaultFilters.priceRange[1]}
      />

      <RatingSelector
        value={filters.minRating}
        onChange={(value) => updateFilter('minRating', value)}
      />

      <ReviewScoreSlider
        value={filters.minReviewScore}
        onChange={(value) => updateFilter('minReviewScore', value)}
      />

      <Group justify="space-between" mt="md">
        <Button variant="light" size="xs" onClick={onReset}>
          Reset
        </Button>
        <Button size="xs" onClick={onApply}>
          Apply
        </Button>
      </Group>
    </Stack>
  );
}
