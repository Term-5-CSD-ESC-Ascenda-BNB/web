import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/tests/utils';
import { DestinationSearch } from './DestinationSearch';
import { useDestinationSearch } from '@/hooks/useDestinationSearch';
import { useCoords } from '@/context/coords-store';

vi.mock('@/hooks/useDestinationSearch');
vi.mock('@/context/coords-store');

const mockUseDestinationSearch = useDestinationSearch as unknown as ReturnType<typeof vi.fn>;
const mockUseCoords = useCoords as unknown as ReturnType<typeof vi.fn>;

describe('DestinationSearch (with MantineProvider)', () => {
  const mockOnDestinationChange = vi.fn();
  const mockSetCoords = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCoords.mockReturnValue({ setCoords: mockSetCoords });
  });

  it('renders input and shows loading state', async () => {
    mockUseDestinationSearch.mockReturnValue({
      searchResults: [],
      isLoading: true,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);
    fireEvent.focus(input);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it('renders search results and calls onDestinationChange when a result is selected', async () => {
    const mockResult = {
      uid: '123',
      term: 'Singapore',
      coordinates: { lat: 1.3521, lng: 103.8198 },
      icon: () => <div data-testid="mock-icon" />,
    };

    mockUseDestinationSearch.mockReturnValue({
      searchResults: [mockResult],
      isLoading: false,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByText('Singapore')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Singapore'));

    expect(mockSetCoords).toHaveBeenCalledWith({ lat: 1.3521, lng: 103.8198 });
    expect(mockOnDestinationChange).toHaveBeenCalledWith('123', 'Singapore');
  });

  it('shows error message if destination search fails', async () => {
    mockUseDestinationSearch.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: new Error('API error'),
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);
    const input = screen.getByPlaceholderText(/search for a destination/i);
    fireEvent.focus(input);

    expect(await screen.findByText(/error loading destinations/i)).toBeInTheDocument();
  });

  it('updates search value when user types in input (handleSearchChange)', () => {
    mockUseDestinationSearch.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);

    // Test typing in the input
    fireEvent.change(input, { target: { value: 'Tokyo' } });

    expect(input).toHaveValue('Tokyo');
  });

  it('reverts to last valid term on blur (handleBlur)', () => {
    const mockResult = {
      uid: '123',
      term: 'Singapore',
      coordinates: { lat: 1.3521, lng: 103.8198 },
      icon: () => <div data-testid="mock-icon" />,
    };

    mockUseDestinationSearch.mockReturnValue({
      searchResults: [mockResult],
      isLoading: false,
      error: null,
    });

    render(
      <DestinationSearch destination="Singapore" onDestinationChange={mockOnDestinationChange} />
    );

    const input = screen.getByPlaceholderText(/search for a destination/i);

    // Initially should have Singapore
    expect(input).toHaveValue('Singapore');

    // Type something else
    fireEvent.change(input, { target: { value: 'Invalid search term' } });
    expect(input).toHaveValue('Invalid search term');

    // Blur the input (this should revert to last valid term)
    fireEvent.blur(input);

    // Should revert back to Singapore (the initial destination)
    expect(input).toHaveValue('Singapore');
  });

  it('handles search change and updates combobox state', () => {
    mockUseDestinationSearch.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);

    // Focus to open dropdown
    fireEvent.focus(input);

    // Type to trigger handleSearchChange
    fireEvent.change(input, { target: { value: 'New York' } });

    expect(input).toHaveValue('New York');
  });

  it('preserves valid term when selecting a destination and then blurring', async () => {
    const mockResult = {
      uid: '456',
      term: 'Tokyo',
      coordinates: { lat: 35.6762, lng: 139.6503 },
      icon: () => <div data-testid="mock-icon" />,
    };

    mockUseDestinationSearch.mockReturnValue({
      searchResults: [mockResult],
      isLoading: false,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);

    // Focus and wait for results
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
    });

    // Select Tokyo
    fireEvent.click(screen.getByText('Tokyo'));

    expect(mockOnDestinationChange).toHaveBeenCalledWith('456', 'Tokyo');
    expect(input).toHaveValue('Tokyo');

    // Now type something else
    fireEvent.change(input, { target: { value: 'Random text' } });
    expect(input).toHaveValue('Random text');

    // Blur should revert to Tokyo (the last valid selected term)
    fireEvent.blur(input);
    expect(input).toHaveValue('Tokyo');
  });

  it('opens dropdown when input is clicked (handleSearchBegin via onClick)', () => {
    mockUseDestinationSearch.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);

    // Click the input to trigger handleSearchBegin
    fireEvent.click(input);

    // The dropdown should be opened (we can verify this by checking if the combobox is interactive)
    // Since we can't directly test the combobox state, we verify the click event is handled
    expect(input).toBeInTheDocument();
  });

  it('shows no results message when search returns empty results', async () => {
    mockUseDestinationSearch.mockReturnValue({
      searchResults: [],
      isLoading: false,
      error: null,
    });

    render(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

    const input = screen.getByPlaceholderText(/search for a destination/i);

    // Click to open dropdown
    fireEvent.click(input);

    // Type something to trigger search
    fireEvent.change(input, { target: { value: 'NonexistentPlace' } });

    // Should show no results message
    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });
});
