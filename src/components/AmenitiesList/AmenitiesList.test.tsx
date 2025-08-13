import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { AmenitiesList } from './AmenitiesList';

vi.mock('@/utils/getAmenityIcon', () => ({
  getAmenityIcon: (amenity: string) => <span data-testid={`icon-${amenity}`}>📍</span>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('AmenitiesList', () => {
  it('renders amenity icons', () => {
    const amenities = ['Wifi', 'Free Parking', 'Pool', 'Gym'];

    render(<AmenitiesList amenities={amenities} />, { wrapper: TestWrapper });

    expect(screen.getByTestId('icon-Wifi')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Free Parking')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Pool')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Gym')).toBeInTheDocument();
  });

  it('button appears with label', () => {
    const amenities = ['Wifi', 'Pool'];

    render(<AmenitiesList amenities={amenities} />, { wrapper: TestWrapper });

    expect(screen.getByText('View all 30 amenities')).toBeInTheDocument();
  });
});
