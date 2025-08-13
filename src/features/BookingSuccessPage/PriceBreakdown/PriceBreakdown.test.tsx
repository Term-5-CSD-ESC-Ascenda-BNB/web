import { render, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import PriceBreakdown from './PriceBreakdown';

describe('PriceBreakdown Component', () => {
  it('renders booking details correctly', () => {
    render(
      <PriceBreakdown
        bookingId="B123"
        startDate="2025-09-01"
        endDate="2025-09-05"
        nights={4}
        roomDescription="Deluxe Room"
        price={800}
        currency="SGD"
        rooms={2}
      />
    );

    expect(screen.getByText('Booking ID:')).toBeInTheDocument();
    expect(screen.getByText('B123')).toBeInTheDocument();
    expect(screen.getByText('Deluxe Room')).toBeInTheDocument();
    expect(screen.getByText('SGD800')).toBeInTheDocument();
  });
});
