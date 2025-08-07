import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@/tests/utils';
import { SearchParamsSchema } from '@/schemas/searchParams';
import { useSearchState } from './useSearchState';

const mockNavigate = vi.fn();
const initialParams = {
  uid: 'user1',
  term: 'Test City',
  date: ['2025-08-09', '2025-08-10'],
  guests: 2,
  rooms: 1,
  page: 1,
};

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useSearch: () => initialParams,
}));

describe('useSearchState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the current searchParams from useSearch', () => {
    const { result } = renderHook(() => useSearchState());
    expect(result.current.searchParams).toEqual(initialParams);
  });

  it('updateSearchParams merges updates and calls navigate with parsed values', () => {
    // Create spy locally in the test
    const parseSpyFn = vi.spyOn(SearchParamsSchema, 'parse');
    parseSpyFn.mockImplementation((x: unknown) => x as ReturnType<typeof SearchParamsSchema.parse>);

    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.updateSearchParams({ guests: 5, page: 3 });
    });

    // 3) Parse should be called with merged object
    expect(parseSpyFn).toHaveBeenCalledWith({
      ...initialParams,
      guests: 5,
      page: 3,
    });

    // 4) navigate should be called with correct args
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/search',
      search: {
        ...initialParams,
        guests: 5,
        page: 3,
      },
    });
  });
});
