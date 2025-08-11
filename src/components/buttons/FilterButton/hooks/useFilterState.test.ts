import type { FilterState } from '../FilterPanel';
import { useFilterState } from './useFilterState';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@/tests/utils';

describe('useFilterState', () => {
  const defaultFilters: FilterState = {
    priceRange: [0, 1000],
    minRating: 0,
    minReviewScore: 0,
  };

  it('initializes appliedFilters and draftFilters from default when no initial provided', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useFilterState({ onFiltersChange: onChange }));

    expect(result.current.appliedFilters).toEqual(defaultFilters);
    expect(result.current.draftFilters).toEqual(defaultFilters);
    expect(result.current.countAppliedFilters()).toBe(0);
  });

  it('initializes from initialFilters if given', () => {
    const onChange = vi.fn();
    const initial: FilterState = {
      priceRange: [100, 500],
      minRating: 3,
      minReviewScore: 4,
    };
    const { result } = renderHook(() =>
      useFilterState({ initialFilters: initial, onFiltersChange: onChange })
    );

    expect(result.current.appliedFilters).toEqual(initial);
    expect(result.current.draftFilters).toEqual(initial);
    // priceRange differs → +1, rating differs → +1, reviewScore differs → +1
    expect(result.current.countAppliedFilters()).toBe(3);
  });

  it('setDraftFilters updates only draftFilters', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useFilterState({ onFiltersChange: onChange }));

    const newDraft: FilterState = {
      priceRange: [200, 800],
      minRating: 2,
      minReviewScore: 5,
    };
    act(() => {
      result.current.setDraftFilters(newDraft);
    });

    expect(result.current.draftFilters).toEqual(newDraft);
    // appliedFilters remains default
    expect(result.current.appliedFilters).toEqual(defaultFilters);
  });

  it('handleApplyFilters applies draft, calls onFiltersChange, and resets draft', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useFilterState({ onFiltersChange: onChange }));

    const newDraft: FilterState = {
      priceRange: [50, 900],
      minRating: 1,
      minReviewScore: 7,
    };

    act(() => {
      result.current.setDraftFilters(newDraft);
    });

    act(() => {
      result.current.handleApplyFilters();
    });

    // appliedFilters should update
    expect(result.current.appliedFilters).toEqual(newDraft);
    // callback called once with the new filters
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(newDraft);
    // draftFilters should also mirror the appliedFilters
    expect(result.current.draftFilters).toEqual(newDraft);
  });

  it('handleResetFilters resets to default, calls onFiltersChange, and drafts update', () => {
    const onChange = vi.fn();
    // Start with some custom initialFilters
    const initial: FilterState = {
      priceRange: [100, 600],
      minRating: 4,
      minReviewScore: 2,
    };
    const { result } = renderHook(() =>
      useFilterState({ initialFilters: initial, onFiltersChange: onChange })
    );

    act(() => {
      result.current.handleResetFilters();
    });

    // appliedFilters should be back to default
    expect(result.current.appliedFilters).toEqual(defaultFilters);
    // callback called with default
    expect(onChange).toHaveBeenCalledWith(defaultFilters);
    // draftFilters should match appliedFilters (i.e. default)
    expect(result.current.draftFilters).toEqual(defaultFilters);
  });

  it('resetDraftFilters restores draft to last appliedFilters', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useFilterState({ onFiltersChange: onChange }));

    const custom: FilterState = {
      priceRange: [300, 700],
      minRating: 5,
      minReviewScore: 9,
    };

    // 1) Apply new draft
    act(() => {
      result.current.setDraftFilters(custom);
    });
    // Verify draft updated
    expect(result.current.draftFilters).toEqual(custom);

    // 2) Apply filters
    act(() => {
      result.current.handleApplyFilters();
    });
    // Verify applied and draft both updated
    expect(result.current.appliedFilters).toEqual(custom);
    expect(result.current.draftFilters).toEqual(custom);

    // 3) Change draft again
    act(() => {
      result.current.setDraftFilters(defaultFilters);
    });
    expect(result.current.draftFilters).toEqual(defaultFilters);

    // 4) Reset draft back to applied
    act(() => {
      result.current.resetDraftFilters();
    });
    expect(result.current.draftFilters).toEqual(custom);
  });
});
