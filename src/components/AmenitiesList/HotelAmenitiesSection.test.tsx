import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { HotelAmenitiesSection } from './HotelAmenitiesSection';

vi.mock('@/utils/getAmenityIcon', () => ({
  getAmenityIcon: (amenity: string) => <span data-testid={`icon-${amenity}`}>📍</span>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('HotelAmenitiesSection', () => {
  it('correctly filters and formats keys', () => {
    const amenities = {
      wifi: true,
      freeParking: true,
      smartTV: true,
      airConditioning: false,
      pool: undefined,
      gym: true,
    };

    render(<HotelAmenitiesSection amenities={amenities} />, { wrapper: TestWrapper });

    expect(screen.getByText('Wifi')).toBeInTheDocument();
    expect(screen.getByText('Free Parking')).toBeInTheDocument();
    expect(screen.getByText('Smart T V')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();

    expect(screen.queryByText('Air Conditioning')).not.toBeInTheDocument();
    expect(screen.queryByText('Pool')).not.toBeInTheDocument();
  });

  it('"View all" button appears only if needed', () => {
    const fewAmenities = {
      wifi: true,
      parking: true,
      pool: true,
      gym: true,
      spa: true,
    };

    const { rerender } = render(<HotelAmenitiesSection amenities={fewAmenities} />, {
      wrapper: TestWrapper,
    });

    expect(screen.queryByText(/View all/)).not.toBeInTheDocument();

    const manyAmenities = {
      wifi: true,
      parking: true,
      pool: true,
      gym: true,
      spa: true,
      restaurant: true,
      bar: true,
      laundry: true,
      concierge: true,
      roomService: true,
      businessCenter: true,
      airConditioning: true,
    };

    rerender(<HotelAmenitiesSection amenities={manyAmenities} />);

    expect(screen.getByText('View all 12 amenities')).toBeInTheDocument();
  });

  it('modal opens on click', () => {
    const manyAmenities = {
      wifi: true,
      parking: true,
      pool: true,
      gym: true,
      spa: true,
      restaurant: true,
      bar: true,
      laundry: true,
      concierge: true,
      roomService: true,
      businessCenter: true,
      airConditioning: true,
    };

    render(<HotelAmenitiesSection amenities={manyAmenities} />, { wrapper: TestWrapper });

    const viewAllButton = screen.getByText('View all 12 amenities');
    fireEvent.click(viewAllButton);

    expect(document.querySelector('.mantine-Modal-root')).toBeInTheDocument();
  });
});
