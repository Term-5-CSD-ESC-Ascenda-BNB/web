// src/components/PriceRangeSlider/PriceRangeSlider.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import type { TextProps, RangeSliderProps } from '@mantine/core';

// Partially mock Mantine to preserve other exports like createTheme
vi.mock('@mantine/core', async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
  const actual = await importOriginal();

  const Text: React.FC<TextProps & { children?: React.ReactNode }> = ({ children }) => (
    <div data-testid="label">{children}</div>
  );
  const RangeSlider: React.FC<RangeSliderProps> = ({ value, onChange, min, max, step, marks }) => (
    <input
      data-testid="range-slider"
      type="range"
      min={min}
      max={max}
      step={step}
      value={(value?.[0] ?? min ?? 0) as unknown as string}
      onChange={(e) =>
        onChange?.([Number((e.target as HTMLInputElement).value), value?.[1] ?? max ?? 100])
      }
      data-marks={marks!.map((m) => m.value).join(',')}
    />
  );

  return {
    ...actual,
    Text,
    RangeSlider,
  };
});

import { PriceRangeSlider } from './PriceRangeSlider';

describe('PriceRangeSlider', () => {
  it('renders default label and computed marks', () => {
    const onChange = vi.fn();
    render(<PriceRangeSlider value={[20, 80]} maxPrice={100} onChange={onChange} />);

    expect(screen.getByTestId('label')).toHaveTextContent('Price Range');
    const slider = screen.getByTestId('range-slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('step', '10');
    expect(slider).toHaveAttribute('data-marks', '0,25,50,75,100');
  });

  it('renders custom label and recalculates marks', () => {
    const onChange = vi.fn();
    render(<PriceRangeSlider value={[10, 90]} maxPrice={200} onChange={onChange} label="Cost" />);

    expect(screen.getByTestId('label')).toHaveTextContent('Cost');
    expect(screen.getByTestId('range-slider')).toHaveAttribute('data-marks', '0,50,100,150,200');
  });

  it('calls onChange with updated range when slider value changes', () => {
    const onChange = vi.fn();
    render(<PriceRangeSlider value={[20, 80]} maxPrice={100} onChange={onChange} />);

    const slider = screen.getByTestId('range-slider');
    fireEvent.change(slider, { target: { value: '30' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([30, 80]);
  });
});
