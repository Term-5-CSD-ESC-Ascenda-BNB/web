import { render, screen } from '@/tests/utils';
import { RoomOptions } from './RoomOptions';
import { expect, describe, it, vi } from 'vitest';

vi.mock('./RoomOptionCard', () => {
  return {
    RoomOptionCard: ({ option }: { option: { title: string } }) => (
      <div data-testid="room-option-card">{option.title}</div>
    ),
  };
});

describe('RoomOptions', () => {
  const options = [
    {
      title: 'Option 1',
      refundable: true,
      reschedulable: true,
      breakfast: 'Included',
      prepay: true,
      price: 100,
      totalPrice: 120,
    },
    {
      title: 'Option 2',
      refundable: false,
      reschedulable: false,
      breakfast: 'Not included',
      prepay: false,
      price: 200,
      totalPrice: 220,
    },
  ];

  it('renders heading', () => {
    render(<RoomOptions options={options} />);
    expect(screen.getByText('Options:')).toBeInTheDocument();
  });

  it('renders correct number of RoomOptionCard components', () => {
    render(<RoomOptions options={options} />);
    const cards = screen.getAllByTestId('room-option-card');
    expect(cards).toHaveLength(options.length);

    options.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
