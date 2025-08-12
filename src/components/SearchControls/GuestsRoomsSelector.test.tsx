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

  it('automatically reduces rooms when guests are decreased below room count', () => {
    const setGuests = vi.fn();
    const setRooms = vi.fn();

    // Start with 3 guests and 3 rooms - this is the edge case
    render(<GuestsRoomsSelector guests={3} rooms={3} setGuests={setGuests} setRooms={setRooms} />);

    fireEvent.click(screen.getByRole('button'));

    // Decrease guests by 1 (from 3 to 2), which would make rooms (3) > guests + delta (2)
    fireEvent.click(screen.getByTestId('decrement-guests'));

    // Should call setGuests with 2 (3 + (-1))
    expect(setGuests).toHaveBeenCalledWith(2);

    // Should also call setRooms with 2 because rooms (3) > guests + delta (2)
    expect(setRooms).toHaveBeenCalledWith(2);
  });

  it('does not reduce rooms when guests decrease but rooms are still valid', () => {
    const setGuests = vi.fn();
    const setRooms = vi.fn();

    // Start with 5 guests and 2 rooms
    render(<GuestsRoomsSelector guests={5} rooms={2} setGuests={setGuests} setRooms={setRooms} />);

    fireEvent.click(screen.getByRole('button'));

    // Decrease guests by 1 (from 5 to 4), rooms (2) <= guests (4) so no room adjustment needed
    fireEvent.click(screen.getByTestId('decrement-guests'));

    // Should call setGuests with 4
    expect(setGuests).toHaveBeenCalledWith(4);

    // Should NOT call setRooms because rooms (2) <= guests + delta (4)
    expect(setRooms).not.toHaveBeenCalled();
  });
});
