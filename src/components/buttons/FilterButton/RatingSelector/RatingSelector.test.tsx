import React from 'react';
import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import type { TextProps, RatingProps } from '@mantine/core';

// Partially mock Mantine so we preserve other exports like createTheme
vi.mock('@mantine/core', async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
  const actual = await importOriginal();

  const Text: React.FC<TextProps & { children?: React.ReactNode }> = ({ children }) => (
    <div data-testid="label">{children}</div>
  );

  // Stub Rating as a clickable button reflecting its value
  const Rating: React.FC<RatingProps> = ({ value = 0, onChange }) => (
    <button data-testid="rating" data-value={value} onClick={() => onChange?.(value)} />
  );

  return {
    ...actual,
    Text,
    Rating,
  };
});

// 2) Import component under test after the mock
import { RatingSelector } from './RatingSelector';

describe('RatingSelector', () => {
  it('renders default label', () => {
    const onChange = vi.fn();
    render(<RatingSelector value={3} onChange={onChange} />);
    expect(screen.getByTestId('label')).toHaveTextContent('Minimum Rating');
  });

  it('renders custom label when provided', () => {
    const onChange = vi.fn();
    render(<RatingSelector value={2} onChange={onChange} label="Custom Label" />);
    expect(screen.getByTestId('label')).toHaveTextContent('Custom Label');
  });

  it('passes value to Rating and reflects it in DOM', () => {
    const onChange = vi.fn();
    render(<RatingSelector value={4} onChange={onChange} />);
    const ratingBtn = screen.getByTestId('rating');
    expect(ratingBtn).toHaveAttribute('data-value', '4');
  });

  it('calls onChange with the correct value when Rating is clicked', () => {
    const onChange = vi.fn();
    render(<RatingSelector value={5} onChange={onChange} />);
    const ratingBtn = screen.getByTestId('rating');
    fireEvent.click(ratingBtn);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(5);
  });
});
