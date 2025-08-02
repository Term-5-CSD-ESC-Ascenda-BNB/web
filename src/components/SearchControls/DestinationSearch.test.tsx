import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DestinationSearch } from './DestinationSearch';
import { useDestinationSearch } from '@/hooks/useDestinationSearch';
import { useCoords } from '@/context/coords-store';
import { MantineProvider } from '@mantine/core';

vi.mock('@/hooks/useDestinationSearch');
vi.mock('@/context/coords-store');

const mockUseDestinationSearch = useDestinationSearch as unknown as ReturnType<typeof vi.fn>;
const mockUseCoords = useCoords as unknown as ReturnType<typeof vi.fn>;

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>);

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

    renderWithMantine(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

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

    renderWithMantine(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);

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

    renderWithMantine(<DestinationSearch onDestinationChange={mockOnDestinationChange} />);
    const input = screen.getByPlaceholderText(/search for a destination/i);
    fireEvent.focus(input);

    expect(await screen.findByText(/error loading destinations/i)).toBeInTheDocument();
  });
});
