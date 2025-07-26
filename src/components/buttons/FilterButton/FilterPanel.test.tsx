import { render, screen, userEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { FilterState } from './FilterPanel';
import { FilterPanel } from './FilterPanel';

vi.mock(
  './PriceRangeSlider/PriceRangeSlider',
  async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
    const actual = await importOriginal();
    return {
      ...actual,
      PriceRangeSlider: ({
        value,
        onChange,
      }: {
        value: [number, number];
        onChange: (v: [number, number]) => void;
      }) => (
        <button data-testid="price-slider" onClick={() => onChange([value[0] + 1, value[1] + 1])}>
          Price
        </button>
      ),
    };
  }
);

vi.mock(
  './RatingSelector/RatingSelector',
  async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
    const actual = await importOriginal();
    return {
      ...actual,
      RatingSelector: ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
        <button data-testid="rating-selector" onClick={() => onChange(value + 1)}>
          Rating
        </button>
      ),
    };
  }
);

vi.mock(
  './ReviewScoreSelector/ReviewScoreSlider',
  async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
    const actual = await importOriginal();
    return {
      ...actual,
      ReviewScoreSlider: ({
        value,
        onChange,
      }: {
        value: number;
        onChange: (v: number) => void;
      }) => (
        <button data-testid="review-score-slider" onClick={() => onChange(value + 1)}>
          Score
        </button>
      ),
    };
  }
);

describe('FilterPanel', () => {
  const initialFilters: FilterState = {
    priceRange: [0, 1000],
    minRating: 0,
    minReviewScore: 0,
  };
  const defaultFilters = initialFilters;

  let onFiltersChange: ReturnType<typeof vi.fn>;
  let onApply: ReturnType<typeof vi.fn>;
  let onReset: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onFiltersChange = vi.fn();
    onApply = vi.fn();
    onReset = vi.fn();
  });

  it('calls onFiltersChange with updated priceRange when PriceRangeSlider changes', async () => {
    render(
      <FilterPanel
        filters={initialFilters}
        onFiltersChange={onFiltersChange}
        onApply={onApply}
        onReset={onReset}
        defaultFilters={defaultFilters}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByTestId('price-slider'));
    expect(onFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      priceRange: [initialFilters.priceRange[0] + 1, initialFilters.priceRange[1] + 1],
    });
  });

  it('calls onFiltersChange with updated minRating when RatingSelector changes', async () => {
    render(
      <FilterPanel
        filters={initialFilters}
        onFiltersChange={onFiltersChange}
        onApply={onApply}
        onReset={onReset}
        defaultFilters={defaultFilters}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByTestId('rating-selector'));
    expect(onFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      minRating: initialFilters.minRating + 1,
    });
  });

  it('calls onFiltersChange with updated minReviewScore when ReviewScoreSlider changes', async () => {
    render(
      <FilterPanel
        filters={initialFilters}
        onFiltersChange={onFiltersChange}
        onApply={onApply}
        onReset={onReset}
        defaultFilters={defaultFilters}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByTestId('review-score-slider'));
    expect(onFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      minReviewScore: initialFilters.minReviewScore + 1,
    });
  });

  it('calls onReset when Reset button clicked', async () => {
    render(
      <FilterPanel
        filters={initialFilters}
        onFiltersChange={onFiltersChange}
        onApply={onApply}
        onReset={onReset}
        defaultFilters={defaultFilters}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('calls onApply when Apply button clicked', async () => {
    render(
      <FilterPanel
        filters={initialFilters}
        onFiltersChange={onFiltersChange}
        onApply={onApply}
        onReset={onReset}
        defaultFilters={defaultFilters}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Apply' }));
    expect(onApply).toHaveBeenCalledTimes(1);
  });
});
