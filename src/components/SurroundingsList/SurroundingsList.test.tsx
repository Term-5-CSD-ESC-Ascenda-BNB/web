import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { SurroundingsList, type Surrounding } from './SurroundingsList';

vi.mock('@/utils/getSurroundingIcon', () => ({
  getSurroundingIcon: (type: string) => <span data-testid={`icon-${type}`}>🏢</span>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('SurroundingsList', () => {
  it('renders POI list with icons', () => {
    const mockSurroundings: Surrounding[] = [
      { type: 'restaurant', name: 'Pizza Place', distance: '200m' },
      { type: 'museum', name: 'Art Gallery', distance: '500m' },
      { type: 'park', name: 'Central Park', distance: '1km' },
    ];

    render(<SurroundingsList surroundings={mockSurroundings} />, { wrapper: TestWrapper });

    // Check POI names and distances are rendered
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
    expect(screen.getByText('(200m)')).toBeInTheDocument();
    expect(screen.getByText('Art Gallery')).toBeInTheDocument();
    expect(screen.getByText('(500m)')).toBeInTheDocument();

    // Check icons are rendered
    expect(screen.getByTestId('icon-restaurant')).toBeInTheDocument();
    expect(screen.getByTestId('icon-museum')).toBeInTheDocument();
    expect(screen.getByTestId('icon-park')).toBeInTheDocument();
  });

  it('handles empty case', () => {
    // Test with undefined
    const { rerender } = render(<SurroundingsList surroundings={undefined!} />, {
      wrapper: TestWrapper,
    });
    expect(screen.getByText('No nearby places found.')).toBeInTheDocument();

    // Test with empty array
    rerender(<SurroundingsList surroundings={[]} />);
    expect(screen.getByText('No nearby places found.')).toBeInTheDocument();
  });
});
