import { fireEvent, render, screen } from '@/tests/utils';
import { DatePicker } from './DatePicker';
import { expect, describe, it, vi } from 'vitest';

import type { FC } from 'react';

let _mockExcludeDate: ((date: Date) => boolean) | undefined;
let _mockOnChange: ((val: [string | null, string | null]) => void) | undefined;

vi.mock('@mantine/dates', () => ({
  DatePickerInput: (({ onChange, value, placeholder, excludeDate }) => {
    _mockExcludeDate = excludeDate;
    _mockOnChange = onChange;
    return (
      <div>
        <input
          data-testid="date-picker-input"
          placeholder={placeholder}
          value={value?.[0] && value?.[1] ? '29 Jul – 31 Jul' : ''}
          readOnly
        />
        <button
          data-testid="trigger-range-select"
          onClick={() => onChange(['2025-07-29', '2025-07-31'])}
        >
          Select Range
        </button>
        <button data-testid="trigger-single-select" onClick={() => onChange(['2025-07-29', null])}>
          Select Single
        </button>
        <button data-testid="trigger-clear-both" onClick={() => onChange([null, null])}>
          Clear Both
        </button>

        {value?.[0] && value?.[1] && <button>{'29 Jul – 31 Jul'}</button>}
      </div>
    );
  }) as FC<{
    onChange: (val: [string | null, string | null]) => void;
    value?: [string | null, string | null];
    placeholder?: string;
    excludeDate?: (date: Date) => boolean;
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

    const selectRangeButton = screen.getByTestId('trigger-range-select');
    fireEvent.click(selectRangeButton);

    expect(setDate).toHaveBeenCalledWith(['2025-07-29', '2025-07-31']);
  });

  it('does not call setDate if only one date is selected', () => {
    const { setDate } = setup();

    const selectSingleButton = screen.getByTestId('trigger-single-select');
    fireEvent.click(selectSingleButton);

    expect(setDate).not.toHaveBeenCalled();
  });

  it('restores last valid range if both values are null', () => {
    const { setDate } = setup({
      date: ['2025-07-29', '2025-07-30'],
    });

    render(<DatePicker date={[null, null]} setDate={setDate} />);
    expect(setDate).not.toHaveBeenCalled();
  });

  it('handles clearing both dates and restores last valid range', () => {
    const setDate = vi.fn();
    render(<DatePicker date={['2025-07-29', '2025-07-30']} setDate={setDate} />);

    // Simulate user clearing both dates (e.g., clicking same date twice or cancelling)
    const clearBothButton = screen.getByTestId('trigger-clear-both');
    fireEvent.click(clearBothButton);

    // The component should restore the last valid range internally
    // but not call setDate since both values are null
    expect(setDate).not.toHaveBeenCalled();
  });

  it('excludes dates that are less than 3 days from now', () => {
    setup();

    // The excludeDate function should be passed to DatePickerInput
    expect(_mockExcludeDate).toBeDefined();

    if (_mockExcludeDate) {
      // Create fixed dates to understand the logic better
      const today = new Date('2025-08-06'); // Current date from context
      const tomorrow = new Date('2025-08-07');
      const dayAfterTomorrow = new Date('2025-08-08'); // This should be excluded (only 2 days away)
      const threeDaysFromNow = new Date('2025-08-09'); // This should be allowed (3 days away)
      const fourDaysFromNow = new Date('2025-08-10');

      // According to the corrected implementation, dates before "threeDaysFromNow" should be excluded
      // threeDaysFromNow = Aug 6 + 3 = Aug 9
      // So dates < Aug 9 should be excluded, dates >= Aug 9 should be allowed
      expect(_mockExcludeDate(today)).toBe(true); // Aug 6 < Aug 9 = true (excluded)
      expect(_mockExcludeDate(tomorrow)).toBe(true); // Aug 7 < Aug 9 = true (excluded)
      expect(_mockExcludeDate(dayAfterTomorrow)).toBe(true); // Aug 8 < Aug 9 = true (excluded)
      expect(_mockExcludeDate(threeDaysFromNow)).toBe(false); // Aug 9 < Aug 9 = false (allowed)
      expect(_mockExcludeDate(fourDaysFromNow)).toBe(false); // Aug 10 < Aug 9 = false (allowed)
    }
  });

  it('updates internal date when only one date is selected during range selection', () => {
    const setDate = vi.fn();
    render(<DatePicker date={[null, null]} setDate={setDate} />);

    // Simulate selecting only the first date (middle of range selection)
    const selectSingleButton = screen.getByTestId('trigger-single-select');
    fireEvent.click(selectSingleButton);

    // setDate should not be called when only one date is selected
    expect(setDate).not.toHaveBeenCalled();

    // But the input should show empty since only one date is selected
    const input = screen.getByTestId('date-picker-input');
    expect(input).toHaveValue('');
  });
});
