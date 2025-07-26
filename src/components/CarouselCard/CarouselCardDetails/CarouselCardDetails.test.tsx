import { render, screen, userEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CarouselCardDetails } from './CarouselCardDetails';

vi.mock('@/components/LocationDisplay/LocationDisplay', () => ({
  LocationDisplay: ({ address }: { address: string }) => (
    <div data-testid="location-display">{address}</div>
  ),
}));

vi.mock('@/components/RatingStars/RatingStars', () => ({
  RatingStars: ({
    rating,
    showEmpty,
    size,
  }: {
    rating: number;
    showEmpty: boolean;
    size: number;
  }) => <div data-testid="rating-stars">{`${rating}-${showEmpty}-${size}`}</div>,
}));

vi.mock('@/components/ReviewScoreSmall/ReviewScoreSmall', () => ({
  ReviewScoreSmall: ({ score }: { score: number }) => <div data-testid="review-score">{score}</div>,
}));

vi.mock('@/components/CarouselCard/PriceDisplay/PriceDisplay', () => ({
  PriceDisplay: ({ price }: { price: number }) => <div data-testid="price-display">{price}</div>,
}));

describe('CarouselCardDetails', () => {
  const defaultProps = {
    name: 'Test Hotel',
    address: '123 Main St',
    rating: 4.5,
    price: 300,
    score: 9.2,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all details correctly', () => {
    render(<CarouselCardDetails {...defaultProps} />);

    // Hotel name
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();

    // LocationDisplay
    expect(screen.getByTestId('location-display')).toHaveTextContent(defaultProps.address);

    // RatingStars: rating-showEmpty-size
    expect(screen.getByTestId('rating-stars')).toHaveTextContent(`${defaultProps.rating}-false-20`);

    // ReviewScoreSmall
    expect(screen.getByTestId('review-score')).toHaveTextContent(defaultProps.score.toString());

    // PriceDisplay
    expect(screen.getByTestId('price-display')).toHaveTextContent(defaultProps.price.toString());
  });

  it('calls onClick when the card is clicked', async () => {
    const user = userEvent.setup();
    render(<CarouselCardDetails {...defaultProps} />);

    // The root Stack has role="button"
    const button = screen.getByRole('button');
    await user.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
