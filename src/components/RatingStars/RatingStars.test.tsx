import { render, screen } from '@/tests/utils';
import { RatingStars } from './RatingStars';
import { expect, describe, it, vi } from 'vitest';

// Mock the Tabler icons
vi.mock('@tabler/icons-react', () => ({
  IconStarFilled: () => <span data-testid="star-filled" />,
  IconStarHalfFilled: () => <span data-testid="star-half" />,
  IconStar: () => <span data-testid="star-empty" />,
}));

describe('RatingStars', () => {
  it('renders the correct number of filled stars for whole numbers', () => {
    render(<RatingStars rating={3} />);

    const filledStars = screen.queryAllByTestId('star-filled');
    const halfStars = screen.queryAllByTestId('star-half');
    const emptyStars = screen.queryAllByTestId('star-empty');

    expect(filledStars).toHaveLength(3);
    expect(halfStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(2);
  });

  it('renders the correct number of stars for half values', () => {
    render(<RatingStars rating={3.5} />);

    const filledStars = screen.queryAllByTestId('star-filled');
    const halfStars = screen.queryAllByTestId('star-half');
    const emptyStars = screen.queryAllByTestId('star-empty');

    expect(filledStars).toHaveLength(3);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(1);
  });

  it('rounds to nearest half star', () => {
    render(<RatingStars rating={3.2} />);

    const filledStars = screen.queryAllByTestId('star-filled');
    const halfStars = screen.queryAllByTestId('star-half');

    expect(filledStars).toHaveLength(3);
    expect(halfStars).toHaveLength(0);
  });

  it('handles rating greater than 5', () => {
    render(<RatingStars rating={7} />);

    const filledStars = screen.queryAllByTestId('star-filled');
    const emptyStars = screen.queryAllByTestId('star-empty');

    expect(filledStars).toHaveLength(5);
    expect(emptyStars).toHaveLength(0);
  });

  it('hides empty stars when showEmpty is false', () => {
    render(<RatingStars rating={3} showEmpty={false} />);

    const filledStars = screen.queryAllByTestId('star-filled');
    const emptyStars = screen.queryAllByTestId('star-empty');

    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(0);
  });

  it('handles ratings less than 1', () => {
    render(<RatingStars rating={0.5} />);

    const filledStars = screen.queryAllByTestId('star-filled');
    const halfStars = screen.queryAllByTestId('star-half');
    const emptyStars = screen.queryAllByTestId('star-empty');

    expect(filledStars).toHaveLength(1);
    expect(halfStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(4);
  });
});
