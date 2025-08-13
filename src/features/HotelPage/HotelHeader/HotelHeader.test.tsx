import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { HotelHeader } from './HotelHeader';
import type { AmenityRating } from '@/types/HotelDetails';

vi.mock('@/components/LocationDisplay/LocationDisplay', () => ({
  LocationDisplay: ({ address }: { address: string }) => <div>{address}</div>,
}));

vi.mock('@/components/RatingStars/RatingStars', () => ({
  RatingStars: ({ rating }: { rating: number }) => <div>{rating} stars</div>,
}));

vi.mock('@/components/SaveButton/SaveButton', () => ({
  SaveButton: () => <button>Save</button>,
}));

vi.mock('@/components/ShareButton/ShareButton', () => ({
  ShareButton: () => <button>Share</button>,
}));

vi.mock('@/components/ReviewScoreLarge/ReviewScoreLarge', () => ({
  ReviewScoreLarge: ({ score }: { score: number }) => (
    <div data-testid="review-score-large">Score: {score}</div>
  ),
}));

vi.mock('@/features/HotelPage/HotelReviews/HotelReviews', () => ({
  HotelReviews: () => <div data-testid="hotel-reviews" />,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('HotelHeader', () => {
  const mockSetModalOpen = vi.fn();

  const baseProps = {
    name: 'Grand Hotel Paradise',
    address: '123 Main St, Paradise City, PC 12345',
    rating: 4.5,
    ratings: [] as AmenityRating[],
    modalOpen: false,
    setModalOpen: mockSetModalOpen,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name, address, and stars', () => {
    render(<HotelHeader {...baseProps} trustyouScore={null} />, { wrapper: TestWrapper });

    expect(screen.getByText('Grand Hotel Paradise')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Paradise City, PC 12345')).toBeInTheDocument();
    expect(screen.getByText('4.5 stars')).toBeInTheDocument();
  });

  it('shows ReviewScoreLarge only if trustyouScore is present', () => {
    // Without trustyou score
    const { rerender } = render(<HotelHeader {...baseProps} trustyouScore={null} />, {
      wrapper: TestWrapper,
    });
    expect(screen.queryByTestId('review-score-large')).not.toBeInTheDocument();

    // With trustyou score
    rerender(
      <HotelHeader {...baseProps} trustyouScore={85} trustyou={{ score: { overall: 85 } }} />
    );
    expect(screen.getByTestId('review-score-large')).toBeInTheDocument();
  });

  it('modal opens/closes on click', () => {
    render(
      <HotelHeader {...baseProps} trustyouScore={85} trustyou={{ score: { overall: 85 } }} />,
      { wrapper: TestWrapper }
    );

    const reviewScore = screen.getByTestId('review-score-large');
    const clickableContainer = reviewScore.closest('[style*="cursor: pointer"]');

    fireEvent.click(clickableContainer!);
    expect(mockSetModalOpen).toHaveBeenCalledWith(true);
  });
});
