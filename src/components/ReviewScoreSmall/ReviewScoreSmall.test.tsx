import { render, screen } from '@/tests/utils';
import { ReviewScoreSmall } from './ReviewScoreSmall';
import { expect, describe, it } from 'vitest';

describe('ReviewScoreSmall', () => {
  it('renders score correctly with integer value', () => {
    render(<ReviewScoreSmall score={8} />);

    // Score should be displayed with one decimal place
    expect(screen.getByText('8.0')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
  });

  it('renders score correctly with decimal value', () => {
    render(<ReviewScoreSmall score={7.5} />);

    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
  });

  it('displays score with one decimal place even when more decimals provided', () => {
    render(<ReviewScoreSmall score={9.876} />);

    expect(screen.getByText('9.9')).toBeInTheDocument(); // Should round to 9.9
    expect(screen.queryByText('9.876')).not.toBeInTheDocument();
  });

  it('renders with proper structure and text elements', () => {
    render(<ReviewScoreSmall score={5} />);

    const container = screen.getByText('5.0').closest('div');
    expect(container).toBeInTheDocument();

    // Check the structure has the expected elements
    const scoreText = screen.getByText('5.0');
    const denominatorText = screen.getByText('/10');

    expect(scoreText).toHaveTextContent('5.0');
    expect(denominatorText).toHaveTextContent('/10');

    // They should be in the same Group component
    expect(scoreText.parentElement).toBe(denominatorText.parentElement);
  });
});
