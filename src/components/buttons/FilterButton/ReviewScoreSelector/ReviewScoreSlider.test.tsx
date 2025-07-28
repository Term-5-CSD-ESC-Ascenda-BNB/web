import React from 'react';
import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TextProps, SliderProps } from '@mantine/core';

vi.mock(
  '@mantine/core',
  // We annotate importOriginal so TS knows it returns the real module.
  async (importOriginal: () => Promise<typeof import('@mantine/core')>) => {
    const actual = await importOriginal();

    const Text: React.FC<TextProps & { children?: React.ReactNode }> = ({ children }) => (
      <div data-testid="label">{children}</div>
    );
    const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange, marks }) => (
      <input
        data-testid="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={String(value)}
        onChange={(e) => onChange && onChange(Number(e.currentTarget.value))}
        data-marks={marks!.map((m) => m.value).join(',')}
      />
    );

    return {
      ...actual,
      Text,
      Slider,
    };
  }
);

import { ReviewScoreSlider } from './ReviewScoreSlider';

describe('ReviewScoreSlider', () => {
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it('renders default label and marks', () => {
    render(<ReviewScoreSlider value={5} onChange={onChange} />);

    expect(screen.getByTestId('label')).toHaveTextContent('Minimum Review Score');
    expect(screen.getByTestId('slider')).toHaveAttribute('data-marks', '0,2,4,6,8,10');
  });

  it('renders custom label and props', () => {
    render(
      <ReviewScoreSlider
        value={7.5}
        onChange={onChange}
        label="Custom Label"
        min={1}
        max={20}
        step={0.5}
      />
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveTextContent('Custom Label');

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveAttribute('min', '1');
    expect(slider).toHaveAttribute('max', '20');
    expect(slider).toHaveAttribute('step', '0.5');
    expect(slider).toHaveAttribute('value', '7.5');
  });

  it('calls onChange when slider value changes', () => {
    render(<ReviewScoreSlider value={2} onChange={onChange} />);

    const slider = screen.getByTestId('slider');
    fireEvent.change(slider, { target: { value: '4' } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
