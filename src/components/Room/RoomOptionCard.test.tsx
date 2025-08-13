import { render, screen } from '@/tests/utils';
import { RoomOptionCard } from './RoomOptionCard';
import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core');
  return {
    ...actual,
    NumberInput: ({
      defaultValue,
      value,
      onChange,
      onValueChange,
    }: {
      defaultValue?: number;
      value?: number | string;
      onChange?: (value: number) => void;
      onValueChange?: (value: number) => void;
    }) => {
      return (
        <input
          data-testid="number-input"
          type="number"
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => {
            const num = Number(e.currentTarget.value);
            if (onChange) onChange(num);
            if (onValueChange) onValueChange(num);
          }}
        />
      );
    },
  };
});

vi.mock('@tabler/icons-react', () => ({
  IconToolsKitchen2: () => <span data-testid="icon-breakfast" />,
  IconCreditCard: () => <span data-testid="icon-creditcard" />,
  IconCalendarCheck: () => <span data-testid="icon-calendar-check" />,
  IconX: () => <span data-testid="icon-x" />,
}));

describe('RoomOptionCard', () => {
  const option = {
    title: 'Heritage Room Twin',
    refundable: false,
    refundableUntil: undefined,
    reschedulable: true,
    breakfast: 'Not included',
    prepay: true,
    price: 5446.26,
    totalPrice: 5446.26,
  };

  it('shows correct icons and text for options', () => {
    render(<RoomOptionCard option={option} />);

    expect(screen.getByTestId('icon-breakfast')).toBeInTheDocument();
    expect(screen.getByText('Not included')).toBeInTheDocument();

    expect(screen.getByTestId('icon-x')).toBeInTheDocument();
    expect(screen.getByText('Non-Refundable')).toBeInTheDocument();

    expect(screen.getByTestId('icon-creditcard')).toBeInTheDocument();
    expect(screen.getByText('Prepay Online')).toBeInTheDocument();
  });

  it('renders nightly rate and total price', () => {
    render(<RoomOptionCard option={option} />);

    expect(
      screen.getByText(
        (_, element) => element?.textContent === `Nightly Rate: SGD $${option.price}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === `Total (incl. fees & taxes): SGD $${option.totalPrice}`
      )
    ).toBeInTheDocument();
  });

  it('number input works', async () => {
    render(<RoomOptionCard option={option} />);

    const input = screen.getByRole('spinbutton');

    expect(input).toHaveValue(1);

    await userEvent.clear(input);
    await userEvent.type(input, '3');

    expect(input).toHaveValue(3);
  });
});
