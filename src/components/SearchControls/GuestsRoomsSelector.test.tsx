import { render, screen, fireEvent } from '@/tests/utils';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { describe, it, expect, vi } from 'vitest';

// Mock icons to avoid DOM noise
vi.mock('@tabler/icons-react', () => ({
  IconUsers: () => <span data-testid="icon-users" />,
  IconBed: () => <span data-testid="icon-bed" />,
  IconChevronDown: () => <span data-testid="icon-chevron-down" />,
}));

// Mock CounterSelector component to simulate interaction
vi.mock('./CounterSelector', () => ({
  CounterSelector: ({
    label,
    value,
    onValueChange,
  }: {
    label: string;
    value: number;
    onValueChange: (delta: number) => void;
  }) => (
    <div>
      <span>{label}</span>
      <span data-testid={`${label.toLowerCase()}-value`}>{value}</span>
      <button onClick={() => onValueChange(-1)} data-testid={`decrement-${label.toLowerCase()}`}>
        -
      </button>
      <button onClick={() => onValueChange(1)} data-testid={`increment-${label.toLowerCase()}`}>
        +
      </button>
    </div>
  ),
}));

describe('GuestsRoomsSelector', () => {
  it('renders with correct initial values', () => {
    render(<GuestsRoomsSelector guests={1} rooms={1} setGuests={() => {}} setRooms={() => {}} />);

    expect(screen.getByText('1 guest • 1 room')).toBeInTheDocument();
  });

  it('calls setGuests and setRooms when buttons are clicked', () => {
    const setGuests = vi.fn();
    const setRooms = vi.fn();

    render(<GuestsRoomsSelector guests={2} rooms={2} setGuests={setGuests} setRooms={setRooms} />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByTestId('increment-guests'));
    expect(setGuests).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByTestId('decrement-rooms'));
    expect(setRooms).toHaveBeenCalledWith(1);
  });
});
