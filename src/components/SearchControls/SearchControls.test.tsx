import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchControls } from './SearchControls';
import React from 'react';

interface DestinationSearchProps {
  destination: string;
  onDestinationChange: (uid: string, term: string) => void;
}

interface DatePickerProps {
  date: [string | null, string | null];
  setDate: (date: [string | null, string | null]) => void;
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
const mockUseSearch = vi.hoisted(() => vi.fn());
const mockGetRouteApi = vi.hoisted(() =>
  vi.fn(() => ({
    useSearch: mockUseSearch,
  }))
);

vi.mock('@tanstack/react-router', () => ({
  getRouteApi: mockGetRouteApi,
}));

// Mock the useSearchState hook
const mockUpdateSearchParams = vi.fn();
vi.mock('@/features/SearchPage/useSearchState', () => ({
  useSearchState: vi.fn(() => ({
    updateSearchParams: mockUpdateSearchParams,
  })),
}));

// Mock the DestinationSearch component
vi.mock('./DestinationSearch', () => ({
  DestinationSearch: ({ destination, onDestinationChange }: DestinationSearchProps) => (
    <div data-testid="destination-search">
      <input
        value={destination}
        onChange={(e) => onDestinationChange('test-uid', e.target.value)}
        placeholder="Enter destination"
        data-testid="destination-input"
      />
    </div>
  ),
}));

// Mock the DatePicker component
vi.mock('./DatePicker', () => ({
  DatePicker: ({ date, setDate }: DatePickerProps) => {
    const [internalValue, setInternalValue] = React.useState(
      date[0] && date[1] ? `${date[0]} - ${date[1]}` : ''
    );

    return (
      <div data-testid="date-picker">
        <input
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            const [start, end] = e.target.value.split(' - ');
            setDate([start || null, end || null]);
          }}
          placeholder="Select dates"
          data-testid="date-input"
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
vi.mock('../buttons', () => ({
  SearchButton: ({ onClick }: SearchButtonProps) => (
    <button onClick={onClick} data-testid="search-button">
      Search
    </button>
  ),
}));

describe('SearchControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for validation tests
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Set default mock implementation
    mockUseSearch.mockReturnValue({
      uid: 'RsBU',
      term: 'Singapore, Singapore',
      date: ['2025-08-10', '2025-08-11'] as [string | null, string | null],
      guests: 2,
      rooms: 1,
    });
  });

  describe('rendering', () => {
    it('renders all child components', () => {
      render(<SearchControls />);

      expect(screen.getByTestId('destination-search')).toBeInTheDocument();
      expect(screen.getByTestId('date-picker')).toBeInTheDocument();
      expect(screen.getByTestId('guests-rooms-selector')).toBeInTheDocument();
      expect(screen.getByTestId('search-button')).toBeInTheDocument();
    });

    it('initializes form with search params', () => {
      render(<SearchControls />);

      expect(screen.getByDisplayValue('Singapore, Singapore')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2025-08-10 - 2025-08-11')).toBeInTheDocument();
      expect(screen.getByText('Guests: 2')).toBeInTheDocument();
      expect(screen.getByText('Rooms: 1')).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    it('updates destination when DestinationSearch changes', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Tokyo, Japan');

      expect(destinationInput).toHaveValue('Tokyo, Japan');
    });

    it('updates date when DatePicker changes', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, '2025-09-01 - 2025-09-03');

      expect(dateInput).toHaveValue('2025-09-01 - 2025-09-03');
    });

    it('updates guests when GuestsRoomsSelector changes', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const increaseGuestsButton = screen.getByTestId('increase-guests');
      await user.click(increaseGuestsButton);

      expect(screen.getByText('Guests: 3')).toBeInTheDocument();
    });

    it('updates rooms when GuestsRoomsSelector changes', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const increaseRoomsButton = screen.getByTestId('increase-rooms');
      await user.click(increaseRoomsButton);

      expect(screen.getByText('Rooms: 2')).toBeInTheDocument();
    });
  });

  describe('search functionality', () => {
    it('calls updateSearchParams with correct data when search button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockUpdateSearchParams).toHaveBeenCalledWith({
        uid: 'RsBU',
        term: 'Singapore, Singapore',
        date: ['2025-08-10', '2025-08-11'],
        guests: 2,
        rooms: 1,
        page: 1,
      });
    });

    it('updates search params with modified values', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      // Modify destination
      const destinationInput = screen.getByTestId('destination-input');
      await user.clear(destinationInput);
      await user.type(destinationInput, 'Tokyo, Japan');

      // Modify guests
      const increaseGuestsButton = screen.getByTestId('increase-guests');
      await user.click(increaseGuestsButton);

      // Click search
      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockUpdateSearchParams).toHaveBeenCalledWith({
        uid: 'test-uid',
        term: 'Tokyo, Japan',
        date: ['2025-08-10', '2025-08-11'],
        guests: 3,
        rooms: 1,
        page: 1,
      });
    });
  });

  describe('form validation', () => {
    it('prevents search when destination is empty', async () => {
      const user = userEvent.setup();

      // Mock empty search params for this test
      mockUseSearch.mockReturnValueOnce({
        uid: '',
        term: '',
        date: ['2025-08-10', '2025-08-11'],
        guests: 2,
        rooms: 1,
      });

      render(<SearchControls />);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockUpdateSearchParams).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Validation failed:',
        expect.objectContaining({
          uid: 'Destination is required',
        })
      );
    });

    it('prevents search when date range is incomplete', async () => {
      const user = userEvent.setup();

      // Mock invalid date search params for this test
      mockUseSearch.mockReturnValueOnce({
        uid: 'RsBU',
        term: 'Singapore, Singapore',
        date: [null, null],
        guests: 2,
        rooms: 1,
      });

      render(<SearchControls />);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockUpdateSearchParams).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Validation failed:',
        expect.objectContaining({
          date: 'Date range is required',
        })
      );
    });

    it('allows search when all required fields are valid', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockUpdateSearchParams).toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('component integration', () => {
    it('passes correct props to DestinationSearch', () => {
      render(<SearchControls />);

      const destinationSearch = screen.getByTestId('destination-search');
      expect(destinationSearch).toBeInTheDocument();

      // Check that the destination value is passed correctly
      expect(screen.getByDisplayValue('Singapore, Singapore')).toBeInTheDocument();
    });

    it('passes correct props to DatePicker', () => {
      render(<SearchControls />);

      const datePicker = screen.getByTestId('date-picker');
      expect(datePicker).toBeInTheDocument();

      // Check that the date value is passed correctly
      expect(screen.getByDisplayValue('2025-08-10 - 2025-08-11')).toBeInTheDocument();
    });

    it('passes correct props to GuestsRoomsSelector', () => {
      render(<SearchControls />);

      const guestsRoomsSelector = screen.getByTestId('guests-rooms-selector');
      expect(guestsRoomsSelector).toBeInTheDocument();

      // Check that the guests and rooms values are passed correctly
      expect(screen.getByText('Guests: 2')).toBeInTheDocument();
      expect(screen.getByText('Rooms: 1')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles partial date selection gracefully', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const dateInput = screen.getByTestId('date-input');
      await user.clear(dateInput);
      await user.type(dateInput, '2025-09-01 - ');

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      // Should not call updateSearchParams due to validation
      expect(mockUpdateSearchParams).not.toHaveBeenCalled();
    });

    it('resets page to 1 when performing new search', async () => {
      const user = userEvent.setup();
      render(<SearchControls />);

      const searchButton = screen.getByTestId('search-button');
      await user.click(searchButton);

      expect(mockUpdateSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
        })
      );
    });
  });
});
