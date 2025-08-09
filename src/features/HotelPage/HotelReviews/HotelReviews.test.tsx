import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { HotelReviews } from './HotelReviews';
import type { TrustYouScore, AmenityRating } from '@/types/HotelDetails';

// Mock the child components
vi.mock('@/components/ReviewScoreLarge/ReviewScoreLarge', () => ({
  ReviewScoreLarge: ({ score }: { score: number }) => (
    <div data-testid="review-score-large" data-score={score}>
      Large Score: {score}
    </div>
  ),
}));

vi.mock('@/components/ReviewScoreSub/ReviewScoreSub', () => ({
  ReviewScoreSub: ({ score, size, color }: { score: number; size: number; color: string }) => (
    <div data-testid="review-score-sub" data-score={score} data-size={size} data-color={color}>
      Sub Score: {score}
    </div>
  ),
}));

// Mock utility function
vi.mock('@/utils/getReviewIcon', () => ({
  getReviewIcon: (label: string) => <span data-testid={`review-icon-${label}`}>🌟</span>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe('HotelReviews', () => {
  const mockTrustYou: TrustYouScore = {
    score: {
      overall: 85,
      solo: 80,
      couple: 90,
      family: 75,
      business: 88,
    },
  };

  const mockRatings: AmenityRating[] = [
    { name: 'Location', score: 45 }, // Will be 4.5 after /10
    { name: 'Service', score: 38 }, // Will be 3.8 after /10
    { name: 'WiFi', score: 42 }, // Will be 4.2 after /10
  ];

  it('modal opens with scores by type/category', () => {
    render(
      <HotelReviews
        trustyou={mockTrustYou}
        ratings={mockRatings}
        opened={true}
        onClose={() => {}}
      />,
      { wrapper: TestWrapper }
    );

    // Check traveler type scores are displayed
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('Couple')).toBeInTheDocument();
    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();

    // Check category scores are displayed
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
  });

  it('scores render correctly based on props', () => {
    render(
      <HotelReviews
        trustyou={mockTrustYou}
        ratings={mockRatings}
        opened={true}
        onClose={() => {}}
      />,
      { wrapper: TestWrapper }
    );

    // Check overall score
    const overallScore = screen.getByTestId('review-score-large');
    expect(overallScore).toHaveAttribute('data-score', '85');

    // Check traveler scores are converted correctly
    const subScores = screen.getAllByTestId('review-score-sub');
    const soloScore = subScores.find((el) => el.getAttribute('data-score') === '80');
    const coupleScore = subScores.find((el) => el.getAttribute('data-score') === '90');

    expect(soloScore).toBeInTheDocument();
    expect(coupleScore).toBeInTheDocument();

    // Check category scores are divided by 10
    const locationScore = subScores.find((el) => el.getAttribute('data-score') === '4.5');
    const serviceScore = subScores.find((el) => el.getAttribute('data-score') === '3.8');

    expect(locationScore).toBeInTheDocument();
    expect(serviceScore).toBeInTheDocument();
  });
});
