// PriceDetailsCard.test.tsx
import { render, screen, within } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { PriceDetailsCard } from './PriceDetailsCard';

describe('PriceDetailsCard', () => {
  const defaultProps = {
    roomType: 'Deluxe Room',
    rooms: 2,
    roomPrice: 800,
    checkin: '2025-09-01',
    checkout: '2025-09-05',
    currency: 'SGD',
    nights: 4,
  };

  it('renders price details title and dividers', () => {
    render(<PriceDetailsCard {...defaultProps} />);
    expect(screen.getByText('Price Details')).toBeInTheDocument();
    expect(screen.getAllByRole('separator').length).toBeGreaterThan(0);
  });

  it('displays calculated room price per room per night', () => {
    render(<PriceDetailsCard {...defaultProps} />);
    const expectedText = `SGD${(defaultProps.roomPrice / defaultProps.rooms / defaultProps.nights).toFixed(2)} x ${defaultProps.rooms} room x ${defaultProps.nights} nights`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('displays total room price', () => {
    render(<PriceDetailsCard {...defaultProps} />);
    const totalText = `SGD${defaultProps.roomPrice.toFixed(2)}`;
    expect(screen.getAllByText(totalText).length).toBeGreaterThanOrEqual(2); // appears twice (row & total)
  });

  it('displays Add-Ons section with 0', () => {
    render(<PriceDetailsCard {...defaultProps} />);
    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('SGD0')).toBeInTheDocument();
  });

  it('displays total section correctly', () => {
    render(<PriceDetailsCard {...defaultProps} />);

    const totalSection = screen.getByText('Total').closest('div'); // parent container of "Total"
    expect(totalSection).toBeInTheDocument();
    expect(
      within(totalSection!).getByText(`SGD${defaultProps.roomPrice.toFixed(2)}`)
    ).toBeInTheDocument();
  });
});
