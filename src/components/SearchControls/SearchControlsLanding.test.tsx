import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchControlsLanding } from './SearchControlsLanding';
import { defaultDate } from '@/schemas/searchParams';
import React from 'react';

interface DestinationSearchProps {
  onDestinationChange: (uid: string, term: string) => void;
  error?: boolean;
}

interface DatePickerProps {
  date: [string, string];
  setDate: (date: [string, string]) => void;
  error?: boolean;
}

interface GuestsRoomsSelectorProps {
  guests: number;
  rooms: number;
  setGuests: (guests: number) => void;
  setRooms: (rooms: number) => void;
}

interface SearchButtonProps {
  onClick: () => void;
}

// Mock the router hook using vi.hoisted
const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(() => mockNavigate),
}));

// Mock the DestinationSearch component
vi.mock('./DestinationSearch', () => ({
  DestinationSearch: ({ onDestinationChange, error }: DestinationSearchProps) => (
    <div data-testid="destination-search">
      <input
        onChange={(e) => onDestinationChange('test-uid', e.target.value)}
        placeholder="Enter destination"
        data-testid="destination-input"
        style={{ borderColor: error ? 'red' : 'initial' }}
      />
    </div>
  ),
}));

// Mock the DatePicker component
vi.mock('./DatePicker', () => ({
  DatePicker: ({ date, setDate, error }: DatePickerProps) => {
    const [internalValue, setInternalValue] = React.useState(
      `${date[0]} - ${date[1]}` // Always has values now since date is [string, string]
    );

    return (
      <div data-testid="date-picker">
        <input
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            const [start, end] = e.target.value.split(' - ');
            // Only update if both parts exist, otherwise keep current values
            if (start && end) {
              setDate([start, end]);
            }
          }}
          placeholder="Select dates"
          data-testid="date-input"
          style={{ borderColor: error ? 'red' : 'initial' }}
        />
      </div>
    );
  },
}));

// Mock the GuestsRoomsSelector component
vi.mock('./GuestsRoomsSelector', () => ({
  GuestsRoomsSelector: ({ guests, rooms, setGuests, setRooms }: GuestsRoomsSelectorProps) => (
    <div data-testid="guests-rooms-selector">
      <button onClick={() => setGuests(guests + 1)} data-testid="increase-guests">
        Guests: {guests}
      </button>
      <button onClick={() => setRooms(rooms + 1)} data-testid="increase-rooms">
        Rooms: {rooms}
      </button>
    </div>
  ),
}));

// Mock the SearchButton component
vi.mock('@/components/buttons', () => ({
  SearchButton: ({ onClick }: SearchButtonProps) => (
    <button onClick={onClick} data-testid="search-button">
      Search
    </button>
  ),
}));

describe('SearchControlsLanding', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for validation tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('rendering', () => {
    it('renders all child components', () => {
      render(<SearchControlsLanding />);

      expect(screen.getByTestId('destination-search')).toBeInTheDocument();
      expect(screen.getByTestId('date-picker')).toBeInTheDocument();
      expect(screen.getByTestId('guests-rooms-selector')).toBeInTheDocument();
      expect(screen.getByTestId('search-button')).toBeInTheDocument();
    });

    it('initializes form with default values', () => {
      render(<SearchControlsLanding />);

      // Check that default destination is shown (from schema)
      expect(screen.getByPlaceholderText('Enter destination')).toBeInTheDocument();

      // Check that default dates are shown (generated dynamically)
      const [defaultCheckin, defaultCheckout] = defaultDate();
      expect(
        screen.getByDisplayValue(`${defaultCheckin} - ${defaultCheckout}`)
      ).toBeInTheDocument();

      // Check default guests and rooms values
      expect(screen.getByText('Guests: 1')).toBeInTheDocument();
      expect(screen.getByText('Rooms: 1')).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    it('updates destination when DestinationSearch changes', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      const destinationInput = screen.getByTestId('destination-input');
      await user.type(destinationInput, 'Tokyo, Japan');

      expect(destinationInput).toHaveValue('Tokyo, Japan');
    });

    it('updates date when DatePicker changes', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Generate dates dynamically
      const today = new Date();
      const checkin = new Date(today);
      checkin.setDate(today.getDate() + 5);
      const checkout = new Date(today);
      checkout.setDate(today.getDate() + 7);

      const checkinStr = checkin.toISOString().split('T')[0];
      const checkoutStr = checkout.toISOString().split('T')[0];

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, `${checkinStr} - ${checkoutStr}`);

      expect(dateInput).toHaveValue(`${checkinStr} - ${checkoutStr}`);
    });

    it('updates guests when GuestsRoomsSelector changes', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      const increaseGuestsButton = screen.getByTestId('increase-guests');
      await user.click(increaseGuestsButton);

      expect(screen.getByText('Guests: 2')).toBeInTheDocument();
    });

    it('updates rooms when GuestsRoomsSelector changes', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      const increaseRoomsButton = screen.getByTestId('increase-rooms');
      await user.click(increaseRoomsButton);

      expect(screen.getByText('Rooms: 2')).toBeInTheDocument();
    });
  });

  describe('navigation functionality', () => {
    it('navigates to search page with correct data when search button is clicked with valid form', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Fill in required fields with dynamic dates
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Singapore');

      const today = new Date();
      const checkin = new Date(today);
      checkin.setDate(today.getDate() + 5);
      const checkout = new Date(today);
      checkout.setDate(today.getDate() + 7);

      const checkinStr = checkin.toISOString().split('T')[0];
      const checkoutStr = checkout.toISOString().split('T')[0];

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, `${checkinStr} - ${checkoutStr}`);

      // Click search
      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/search',
        search: expect.objectContaining({
          uid: 'test-uid',
          term: 'Singapore',
          date: [checkinStr, checkoutStr],
          guests: 1,
          rooms: 1,
        }) as unknown,
      });
    });

    it('navigates with modified values', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Generate dynamic dates
      const today = new Date();
      const checkin = new Date(today);
      checkin.setDate(today.getDate() + 10);
      const checkout = new Date(today);
      checkout.setDate(today.getDate() + 12);

      const checkinStr = checkin.toISOString().split('T')[0];
      const checkoutStr = checkout.toISOString().split('T')[0];

      // Fill in required fields
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Tokyo');

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, `${checkinStr} - ${checkoutStr}`);

      // Modify guests and rooms
      const increaseGuestsButton = screen.getByTestId('increase-guests');
      await user.click(increaseGuestsButton);
      await user.click(increaseGuestsButton); // guests = 3

      const increaseRoomsButton = screen.getByTestId('increase-rooms');
      await user.click(increaseRoomsButton); // rooms = 2

      // Click search
      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/search',
        search: expect.objectContaining({
          uid: 'test-uid',
          term: 'Tokyo',
          date: [checkinStr, checkoutStr],
          guests: 3,
          rooms: 2,
        }) as unknown,
      });
    });
  });

  describe('form validation', () => {
    it('prevents navigation when destination is empty', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Clear destination, keep default dates
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockNavigate).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Validation failed:',
        expect.objectContaining({
          uid: 'Destination is required',
        })
      );
    });

    it('allows navigation when all required fields are valid', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Fill in destination (dates are already valid by default)
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Singapore');

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockNavigate).toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('error states', () => {
    it('shows error state for destination when validation fails', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Clear destination
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);

      // Try to search without destination
      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      // Check if the destination input has error styling
      expect(destinationInput).toHaveStyle({ borderColor: 'red' });
    });
  });

  describe('component integration', () => {
    it('passes correct props to DestinationSearch', () => {
      render(<SearchControlsLanding />);

      const destinationSearch = screen.getByTestId('destination-search');
      expect(destinationSearch).toBeInTheDocument();

      // Check that the destination input is present
      expect(screen.getByPlaceholderText('Enter destination')).toBeInTheDocument();
    });

    it('passes correct props to DatePicker', () => {
      render(<SearchControlsLanding />);

      const datePicker = screen.getByTestId('date-picker');
      expect(datePicker).toBeInTheDocument();

      // Check that the date input is present
      expect(screen.getByPlaceholderText('Select dates')).toBeInTheDocument();
    });

    it('passes correct props to GuestsRoomsSelector', () => {
      render(<SearchControlsLanding />);

      const guestsRoomsSelector = screen.getByTestId('guests-rooms-selector');
      expect(guestsRoomsSelector).toBeInTheDocument();

      // Check that the default values are shown
      expect(screen.getByText('Guests: 1')).toBeInTheDocument();
      expect(screen.getByText('Rooms: 1')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles invalid date format gracefully', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Singapore');

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, 'invalid-date');

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      // Should still navigate because schema will provide default dates
      expect(mockNavigate).toHaveBeenCalled();
    });

    it('handles SearchParamsSchema parsing correctly', async () => {
      const user = userEvent.setup();
      render(<SearchControlsLanding />);

      // Fill in valid data with dynamic dates
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Singapore');

      const today = new Date();
      const checkin = new Date(today);
      checkin.setDate(today.getDate() + 5);
      const checkout = new Date(today);
      checkout.setDate(today.getDate() + 7);

      const checkinStr = checkin.toISOString().split('T')[0];
      const checkoutStr = checkout.toISOString().split('T')[0];

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, `${checkinStr} - ${checkoutStr}`);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      // Verify that navigate was called with parsed search params
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/search',
        search: expect.any(Object) as unknown,
      });
    });
  });
});
