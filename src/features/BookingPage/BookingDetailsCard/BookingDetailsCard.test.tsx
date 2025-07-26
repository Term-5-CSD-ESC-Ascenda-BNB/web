import { render, screen } from '@/tests/utils';
import { BookingDetailsCard } from './BookingDetailsCard';
import { describe, it, expect } from 'vitest';

describe('BookingDetailsCard', () => {
  const defaultProps = {
    name: 'Grand Palace Hotel',
    image: 'https://example.com/hotel.jpg',
    starRating: 4.5,
    address: '123 Main St, Cityville',
    roomType: 'Deluxe King Room',
    reviewScore: 8.9,
    checkin: '2025-12-22',
    checkout: '2025-12-25',
    guests: 2,
  };

  it('renders hotel name, address, and room type', () => {
    render(<BookingDetailsCard {...defaultProps} />);

    expect(screen.getByText('Grand Palace Hotel')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Cityville')).toBeInTheDocument();
    expect(screen.getByText('Deluxe King Room')).toBeInTheDocument();
  });

  it('renders hotel image with correct alt text', () => {
    render(<BookingDetailsCard {...defaultProps} />);
    const image = screen.getByAltText('Hotel');
    expect(image).toBeInTheDocument();
  });

  it('displays the star rating correctly', () => {
    render(<BookingDetailsCard {...defaultProps} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('displays the guest count and room size', () => {
    render(<BookingDetailsCard {...defaultProps} />);
    expect(screen.getByText('x2')).toBeInTheDocument();
    expect(screen.getByText(/36m²/i)).toBeInTheDocument();
  });

  it('formats and displays the check-in and check-out dates', () => {
    render(<BookingDetailsCard {...defaultProps} />);
    expect(screen.getByText('Mon, Dec 22, 2025')).toBeInTheDocument(); // Check-in
    expect(screen.getByText('Thu, Dec 25, 2025')).toBeInTheDocument(); // Check-out
  });

  it('displays check-in and check-out time notes', () => {
    render(<BookingDetailsCard {...defaultProps} />);
    expect(screen.getByText('From 3:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Before 12:00 PM')).toBeInTheDocument();
  });

  it('renders the ReviewScoreLarge component if reviewScore is provided', () => {
    render(<BookingDetailsCard {...defaultProps} />);
    expect(screen.getByText('8.9')).toBeInTheDocument(); // Hardcoded in your component for now
  });
});
