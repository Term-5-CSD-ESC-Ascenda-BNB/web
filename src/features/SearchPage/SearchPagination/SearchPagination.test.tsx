// src/components/SearchPagination/SearchPagination.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchPagination } from './SearchPagination';

// --- 1) Mock react-router hooks
const mockSearch = vi.fn();
const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  useSearch: () => mockSearch() as unknown,
  useNavigate: () => mockNavigate,
}));

// --- 2) Stub the Zod schema parser
vi.mock('@/schemas/searchParams', () => ({
  SearchParamsSchema: {
    safeParse: (x: unknown) => {
      if (typeof x === 'object' && x !== null) {
        const obj = x as { page?: unknown };
        const keys = Object.keys(obj);

        // Return false for completely empty objects (first test case)
        if (keys.length === 0) {
          return { success: false, error: { message: 'Invalid' } };
        }

        // Valid if page is a number OR if page is undefined but object has other properties
        if (typeof obj.page === 'number' || (obj.page === undefined && keys.length > 0)) {
          return { success: true, data: x };
        }
      }
      return { success: false, error: { message: 'Invalid' } };
    },
  },
}));

// --- 3) Partially mock Mantine components to preserve other exports like createTheme
vi.mock('@mantine/core', async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
  const actual = await importOriginal();

  return {
    ...actual,
    Center: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="center">{children}</div>
    ),
    Pagination: ({
      total,
      value,
      onChange,
    }: {
      total: number;
      value: number;
      onChange: (p: number) => void;
    }) => (
      <button
        data-testid="pagination"
        data-total={total}
        data-value={value}
        onClick={() => onChange(value + 1)}
      />
    ),
  };
});

describe('SearchPagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null and logs an error when params are invalid', () => {
    mockSearch.mockReturnValue({}); // no page → safeParse fails
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<SearchPagination totalPages={10} />);
    // Should not render the pagination button
    expect(screen.queryByTestId('pagination')).toBeNull();
    // Should have logged the parsing error
    expect(errorSpy).toHaveBeenCalledWith('Invalid search parameters:', expect.any(Object));

    errorSpy.mockRestore();
  });

  it('renders Pagination with correct props and navigates on change', () => {
    const initialParams = { page: 2, foo: 'bar' };
    mockSearch.mockReturnValue(initialParams);

    render(<SearchPagination totalPages={5} />);
    const btn = screen.getByTestId('pagination');

    // totalPages → total, page → value
    expect(btn).toHaveAttribute('data-total', '5');
    expect(btn).toHaveAttribute('data-value', '2');

    // Simulate clicking to go to page 3
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/search',
      search: { ...initialParams, page: 3 },
    });
  });

  it('defaults to page 1 when page is not provided in search params', () => {
    const initialParams = { foo: 'bar' }; // no page property
    mockSearch.mockReturnValue(initialParams);

    render(<SearchPagination totalPages={3} />);
    const btn = screen.getByTestId('pagination');

    // Should default to page 1
    expect(btn).toHaveAttribute('data-total', '3');
    expect(btn).toHaveAttribute('data-value', '1');

    // Simulate clicking to go to page 2
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/search',
      search: { ...initialParams, page: 2 },
    });
  });
});
