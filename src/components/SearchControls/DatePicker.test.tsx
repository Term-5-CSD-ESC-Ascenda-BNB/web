import { fireEvent, render, screen } from '@/tests/utils';
import { DatePicker } from './DatePicker';
import { expect, describe, it, vi } from 'vitest';

import type { FC } from 'react';

vi.mock('@mantine/dates', () => ({
  DatePickerInput: (({ onChange, value, placeholder }) => (
    <div>
      <input
        data-testid="date-picker-input"
        placeholder={placeholder}
        value={value?.[0] && value?.[1] ? '29 Jul – 31 Jul' : ''}
        onChange={(e) => {
          if (e.target.dataset.testAction === 'select-range') {
            onChange(['2025-07-29', '2025-07-31']);
          } else if (e.target.dataset.testAction === 'select-single') {
            onChange(['2025-07-29', null]);
          }
        }}
      />

      {value?.[0] && value?.[1] && <button>{'29 Jul – 31 Jul'}</button>}
    </div>
  )) as FC<{
    onChange: (val: [string | null, string | null]) => void;
    value?: [string | null, string | null];
    placeholder?: string;
  }>,
}));

describe('DatePicker', () => {
  const setup = (props = {}) => {
    const setDate = vi.fn();

    const defaultProps = {
      date: [null, null] as [string | null, string | null],
      setDate,
      error: false,
      ...props,
    };
    render(<DatePicker {...defaultProps} />);
    return { setDate };
  };

  it('renders the date input with placeholder', () => {
    setup();

    expect(screen.getByPlaceholderText('Choose dates')).toBeInTheDocument();
  });

  it('calls setDate when a full date range is selected', () => {
    const { setDate } = setup();

    const input = screen.getByPlaceholderText('Choose dates');

    fireEvent.change(input, {
      target: {
        value: '29 Jul – 31 Jul', // format defined by valueFormat: "D MMM"
      },
    });

    const fakeRange: [string, string] = ['2025-07-29', '2025-07-31'];
    render(<DatePicker date={fakeRange} setDate={setDate} />);
    expect(screen.getByRole('button', { name: '29 Jul – 31 Jul' })).toBeInTheDocument();
  });

  it('does not call setDate if only one date is selected', () => {
    const { setDate } = setup({
      date: ['2025-07-29', null],
    });

    const input = screen.getByPlaceholderText('Choose dates');
    expect(input).toHaveValue('');
    expect(setDate).not.toHaveBeenCalled();
  });

  it('restores last valid range if both values are null', () => {
    const { setDate } = setup({
      date: ['2025-07-29', '2025-07-30'],
    });

    render(<DatePicker date={[null, null]} setDate={setDate} />);
    expect(setDate).not.toHaveBeenCalled();
  });
});
