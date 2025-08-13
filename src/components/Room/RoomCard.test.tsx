import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { RoomCard } from './RoomCard';

vi.mock('@/utils/getRoomFeatureIcon', () => ({
  getRoomFeatureIcon: (label: string) => <span data-testid="feature-icon">{label}</span>,
}));

const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

const mockProps = {
  name: 'Heritage Twin Room',
  images: [
    'https://i.travelapi.com/lodging/1000000/900000/893000/892940/640dedec_b.jpg',
    'https://i.travelapi.com/lodging/1000000/900000/893000/892940/c9ae1636_b.jpg',
  ],
  features: [
    'Air conditioning',
    'Daily housekeeping',
    'Non-Smoking',
    'Wireless internet access',
    'Premium bedding',
  ],
  size: '409 sq ft',
  occupancy: 'Sleeps 2',
  bedType: '2 Twin Beds',
  wifi: 'No WiFi',
  view: 'courtyard views',
  tv: '55-inch TV',
  bath: 'Private bath',
  options: [
    {
      title: 'Heritage Room Twin',
      refundable: false,
      refundableUntil: undefined,
      reschedulable: true,
      breakfast: 'Not included',
      prepay: true,
      price: 5446.26,
      totalPrice: 5446.26,
    },
    {
      title: 'Heritage Room Twin',
      refundable: true,
      refundableUntil: 'Sep 26',
      reschedulable: false,
      breakfast: 'Not included',
      prepay: true,
      price: 6807.83,
      totalPrice: 6807.83,
    },
  ],
  hotelId: 'hotel-123',
  destinationId: 'dest-456',
  hotelName: 'Hotel Test',
  hotelAddress: '123 Test Street',
  hotelImage: 'hotel.jpg',
  starRating: 4,
  trustYouScore: 90,
  checkin: '2025-09-01',
  checkout: '2025-09-03',
  guests: 2,
  nights: 2,
  currency: 'USD',
  rooms: 1,
};

describe('RoomCard', () => {
  it('renders images, features, and all room options', () => {
    render(<RoomCard {...mockProps} />);

    const img = screen.getByAltText('Heritage Twin Room');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.images[0]);

    const features = screen.getAllByTestId('feature-icon');
    expect(features.length).toBeGreaterThan(0);

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(screen.getAllByLabelText('Heritage Room Twin')).toHaveLength(2);
  });

  it('changes selected room option when clicked', () => {
    render(<RoomCard {...mockProps} />);

    const optionCards = screen.getAllByTestId('option-card');

    expect(optionCards[0]).toHaveStyle({ backgroundColor: '#F1F0FB' });
    expect(optionCards[1]).not.toHaveStyle({ backgroundColor: '#F1F0FB' });

    fireEvent.click(screen.getAllByLabelText('Heritage Room Twin')[1]);

    expect(optionCards[0]).not.toHaveStyle({ backgroundColor: '#F1F0FB' });
    expect(optionCards[1]).toHaveStyle({ backgroundColor: '#F1F0FB' });
  });

  it('shows correct price for selected option', () => {
    render(<RoomCard {...mockProps} />);

    expect(screen.getByText('+ $5446.26')).toBeInTheDocument();

    fireEvent.click(screen.getAllByLabelText('Heritage Room Twin')[1]);

    expect(screen.getByText('+ $6807.83')).toBeInTheDocument();
  });
});
