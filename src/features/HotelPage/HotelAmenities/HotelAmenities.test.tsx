import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { HotelAmenities } from './HotelAmenities';

vi.mock('@/components/AmenitiesList/HotelAmenitiesSection', () => ({
  HotelAmenitiesSection: ({ amenities }: { amenities: Record<string, boolean | undefined> }) => (
    <div data-testid="hotel-amenities-section" data-amenities={JSON.stringify(amenities)} />
  ),
}));

describe('HotelAmenities', () => {
  it('passes amenities down correctly', () => {
    const mockAmenities = {
      wifi: true,
      parking: false,
      pool: true,
      gym: undefined,
    };

    const { getByTestId } = render(<HotelAmenities amenities={mockAmenities} />);

    const amenitiesSection = getByTestId('hotel-amenities-section');
    expect(amenitiesSection).toHaveAttribute('data-amenities', JSON.stringify(mockAmenities));
  });
});
