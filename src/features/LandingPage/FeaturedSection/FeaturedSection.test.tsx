import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeaturedSection } from './FeaturedSection';
import type { HotelResult } from '@/schemas/hotelResults';
import { SearchParamsSchema } from '@/schemas/searchParams';
import type { z } from 'zod';

type SearchParams = z.infer<typeof SearchParamsSchema>;

interface NavigationCall {
  to: string;
  search: SearchParams;
}

// Mock the HotelGrid component
vi.mock('@/components/HotelGrid/HotelGrid', () => ({
  HotelGrid: ({
    hotels,
    isLoading,
    onHotelClick,
  }: {
    hotels: HotelResult[];
    isLoading: boolean;
    onHotelClick: (hotelId: string) => void;
  }) => {
    if (isLoading) {
      return <div data-testid="hotel-grid-loading">Loading hotels...</div>;
    }

    return (
      <div data-testid="hotel-grid">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            data-testid={`hotel-${hotel.id}`}
            onClick={() => onHotelClick(hotel.id)}
          >
            {hotel.name}
          </div>
        ))}
      </div>
    );
  },
}));

// Mock the navigation
const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('FeaturedSection', () => {
  const mockHotels: HotelResult[] = [
    {
      id: 'hotel1',
      name: 'Luxury Hotel Singapore',
      address: '123 Marina Bay',
      rating: 5,
      score: 4.8,
      searchRank: 1,
      price: 300,
      latitude: 1.2966,
      longitude: 103.8564,
      image_details: {
        suffix: '.jpg',
        count: 10,
        prefix: 'https://example.com/hotel1',
      },
    },
    {
      id: 'hotel2',
      name: 'Budget Hotel Singapore',
      address: '456 Chinatown',
      rating: 3,
      score: 3.5,
      searchRank: 2,
      price: 100,
      latitude: 1.2854,
      longitude: 103.8565,
      image_details: {
        suffix: '.jpg',
        count: 5,
        prefix: 'https://example.com/hotel2',
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Featured Hotels');
  });

  it('passes hotels to HotelGrid when not loading', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    expect(screen.getByTestId('hotel-grid')).toBeInTheDocument();
    expect(screen.getByTestId('hotel-hotel1')).toHaveTextContent('Luxury Hotel Singapore');
    expect(screen.getByTestId('hotel-hotel2')).toHaveTextContent('Budget Hotel Singapore');
  });

  it('shows loading state when isLoading is true', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={[]} isLoading={true} />);

    expect(screen.getByTestId('hotel-grid-loading')).toBeInTheDocument();
    expect(screen.getByTestId('hotel-grid-loading')).toHaveTextContent('Loading hotels...');
  });

  it('renders the "View more" link', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    const viewMoreLink = screen.getByRole('link', { name: /view more/i });
    expect(viewMoreLink).toBeInTheDocument();
    expect(viewMoreLink).toHaveAttribute('href', 'search');
  });

  it('navigates to hotel page when hotel is clicked', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    const hotelCard = screen.getByTestId('hotel-hotel1');
    fireEvent.click(hotelCard);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/hotels/hotel1',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        search: expect.objectContaining({
          uid: 'RsBU',
          term: 'Singapore, Singapore',
          guests: 1,
          rooms: 1,
          page: 1,
        }),
      })
    );
  });

  it('generates correct search parameters for hotel navigation', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    const hotelCard = screen.getByTestId('hotel-hotel2');
    fireEvent.click(hotelCard);

    const [navigationCall] = mockNavigate.mock.calls;
    const navigationArgs = navigationCall[0] as NavigationCall;
    const { to, search } = navigationArgs;

    expect(to).toBe('/hotels/hotel2');
    expect(search).toMatchObject({
      uid: 'RsBU',
      term: 'Singapore, Singapore',
      guests: 1,
      rooms: 1,
      page: 1,
    });

    // Check that dates are properly formatted
    expect(search.date).toHaveLength(2);
    expect(search.date[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(search.date[1]).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    // Check default sorting values
    expect(search.sortBy).toBe('rating');
    expect(search.sortOrder).toBe('desc');
  });

  it('handles empty hotels array', () => {
    render(<FeaturedSection title="No Hotels Available" hotels={[]} isLoading={false} />);

    expect(screen.getByTestId('hotel-grid')).toBeInTheDocument();
    expect(screen.queryByTestId(/^hotel-hotel/)).not.toBeInTheDocument();
  });

  it('uses correct default search parameters', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    const hotelCard = screen.getByTestId('hotel-hotel1');
    fireEvent.click(hotelCard);

    const [navigationCall] = mockNavigate.mock.calls;
    const navigationArgs = navigationCall[0] as NavigationCall;
    const { search } = navigationArgs;

    // Test the default values match what's expected
    expect(search.uid).toBe('RsBU');
    expect(search.term).toBe('Singapore, Singapore');
    expect(search.guests).toBe(1);
    expect(search.rooms).toBe(1);
    expect(search.page).toBe(1);
  });

  it('renders with proper layout structure', () => {
    render(<FeaturedSection title="Featured Hotels" hotels={mockHotels} isLoading={false} />);

    // Check that the title is present
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Featured Hotels');

    // Check that the "View more" link is present
    const viewMoreLink = screen.getByRole('link', { name: /view more/i });
    expect(viewMoreLink).toBeInTheDocument();

    // Check that the hotel grid is present
    const hotelGrid = screen.getByTestId('hotel-grid');
    expect(hotelGrid).toBeInTheDocument();
  });
});
