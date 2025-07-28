// src/components/FilterButton/FilterButton.test.tsx
import React from 'react';
import { render, screen, userEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { FilterState } from './FilterPanel';

const mockSetDraft = vi.fn();
const mockCount = vi.fn();
const mockApply = vi.fn();
const mockReset = vi.fn();
const mockResetDraft = vi.fn();
const defaultFilters: FilterState = {
  priceRange: [0, 1000],
  minRating: 0,
  minReviewScore: 0,
};

//  useFilterState hook
vi.mock('./hooks/useFilterState', () => ({
  useFilterState: ({ initialFilters }: { initialFilters?: FilterState }) => ({
    draftFilters: initialFilters ?? defaultFilters,
    setDraftFilters: mockSetDraft,
    countAppliedFilters: mockCount,
    handleApplyFilters: mockApply,
    handleResetFilters: mockReset,
    resetDraftFilters: mockResetDraft,
    defaultFilters,
  }),
}));

type FilterPanelProps = {
  onApply: () => void;
  onReset: () => void;
};

// Stub FilterPanel to observe apply/reset behavior
vi.mock('./FilterPanel', () => ({
  FilterPanel: ({ onApply, onReset }: FilterPanelProps) => (
    <div data-testid="panel">
      <button onClick={onApply}>Apply</button>
      <button onClick={onReset}>Reset</button>
    </div>
  ),
}));

import { FilterButton } from './FilterButton';

describe('FilterButton', () => {
  const onFiltersChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hides indicator when no filters applied', () => {
    mockCount.mockReturnValue(0);
    render(<FilterButton onFiltersChange={onFiltersChange} />);
    expect(screen.queryByText('0')).toBeNull();
  });

  it('shows indicator when filters applied', () => {
    mockCount.mockReturnValue(5);
    render(<FilterButton onFiltersChange={onFiltersChange} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('toggles popover and resets draft on close', async () => {
    mockCount.mockReturnValue(0);
    const user = userEvent.setup();
    render(<FilterButton onFiltersChange={onFiltersChange} />);

    // initially closed
    expect(screen.queryByTestId('panel')).toBeNull();

    // open
    await user.click(screen.getByTestId('filter-button'));
    expect(screen.getByTestId('panel')).toBeInTheDocument();

    // close
    await user.click(screen.getByTestId('filter-button'));
    expect(screen.queryByTestId('panel')).toBeNull();
    expect(mockResetDraft).toHaveBeenCalledTimes(1);
  });

  it('applies filters and closes on Apply', async () => {
    mockCount.mockReturnValue(2);
    const user = userEvent.setup();
    render(<FilterButton onFiltersChange={onFiltersChange} />);

    // open
    await user.click(screen.getByTestId('filter-button'));
    expect(screen.getByTestId('panel')).toBeInTheDocument();

    // apply
    await user.click(screen.getByText('Apply'));
    expect(mockApply).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('panel')).toBeNull();
  });

  it('resets filters and stays open on Reset', async () => {
    mockCount.mockReturnValue(3);
    const user = userEvent.setup();
    render(<FilterButton onFiltersChange={onFiltersChange} />);

    // open
    await user.click(screen.getByTestId('filter-button'));
    expect(screen.getByTestId('panel')).toBeInTheDocument();

    // reset
    await user.click(screen.getByText('Reset'));
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('panel')).toBeInTheDocument();
  });
});
