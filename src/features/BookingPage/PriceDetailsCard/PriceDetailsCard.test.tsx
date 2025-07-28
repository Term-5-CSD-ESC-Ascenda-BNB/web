import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/tests/utils'; // your custom render wrapper
import { PriceDetailsCard } from './PriceDetailsCard';

describe('PriceDetailsCard', () => {
  it('renders price details with correct total', () => {
    render(
      <PriceDetailsCard
        roomType="Deluxe Room"
        rooms={1}
        roomPrice={100}
        checkin="2025-08-01"
        checkout="2025-08-04"
        currency="$"
      />
    );

    // $100 x 3 nights = $300
    expect(screen.getByText('Price Details')).toBeInTheDocument();
    expect(screen.getByText('1 room ($100) x 3 nights')).toBeInTheDocument();
    expect(screen.getAllByText('$300')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$300')[1]).toBeInTheDocument();
    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });
});
