import { fireEvent, render, screen } from '@/tests/utils';
import { CounterSelector } from './CounterSelector';
import { expect, describe, it, vi } from 'vitest';
import { IconUsers } from '@tabler/icons-react';

describe('CounterSelector', () => {
  let onValueChange: ReturnType<typeof vi.fn>;

  const setup = (props = {}) => {
    onValueChange = vi.fn();
    const defaultProps = {
      label: 'Guests',
      icon: <IconUsers data-testid="icon" />,
      value: 2,
      minValue: 1,
      maxValue: 10,
      onValueChange,
      ...props,
    };
    render(<CounterSelector {...defaultProps} />);
  };

  it('renders the label, value, and icon', () => {
    setup();

    expect(screen.getByText('Guests')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onValueChange(-1) when minus button is clicked', () => {
    setup();

    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];

    fireEvent.click(minusButton);
    expect(onValueChange).toHaveBeenCalledWith(-1);
  });

  it('calls onValueChange(1) when plus button is clicked', () => {
    setup();

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];

    fireEvent.click(plusButton);
    expect(onValueChange).toHaveBeenCalledWith(1);
  });

  it('disables minus button when value is at minValue', () => {
    setup({ value: 1 });

    const minusButton = screen.getAllByRole('button')[0];
    expect(minusButton).toBeDisabled();
  });

  it('disables plus button when value is at maxValue', () => {
    setup({ value: 10 });

    const plusButton = screen.getAllByRole('button')[1];
    expect(plusButton).toBeDisabled();
  });
});
