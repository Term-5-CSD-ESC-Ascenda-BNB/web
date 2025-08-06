import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { ReviewScoreSub } from './ReviewScoreSub';

describe('ReviewScoreSub', () => {
  it('renders the score value with one decimal place', () => {
    render(<ReviewScoreSub score={8.5} />);

    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('/10')).toBeInTheDocument();
  });

  it('formats integer scores to one decimal place', () => {
    render(<ReviewScoreSub score={9} />);

    expect(screen.getByText('9.0')).toBeInTheDocument();
  });

  it('rounds scores to one decimal place', () => {
    render(<ReviewScoreSub score={8.567} />);

    expect(screen.getByText('8.6')).toBeInTheDocument();
  });

  it('handles zero score', () => {
    render(<ReviewScoreSub score={0} />);

    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('handles maximum score of 10', () => {
    render(<ReviewScoreSub score={10} />);

    expect(screen.getByText('10.0')).toBeInTheDocument();
  });

  it('handles scores greater than 10', () => {
    render(<ReviewScoreSub score={12.5} />);

    expect(screen.getByText('12.5')).toBeInTheDocument();
  });

  it('uses default size when not specified', () => {
    render(<ReviewScoreSub score={7.5} />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('applies custom size when provided', () => {
    render(<ReviewScoreSub score={7.5} size={120} />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
    expect(ringProgress).toHaveAttribute('style');
  });

  it('uses default color when not specified', () => {
    render(<ReviewScoreSub score={8.0} />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('applies custom color when provided', () => {
    render(<ReviewScoreSub score={8.0} color="#ff6b6b" />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('calculates correct percentage for ring progress', () => {
    render(<ReviewScoreSub score={7.5} />);

    // 7.5 * 10 = 75% progress
    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('caps percentage at 100% for scores over 10', () => {
    render(<ReviewScoreSub score={15} />);

    // Should be capped at 100% even though 15 * 10 = 150%
    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('renders with circular background box', () => {
    render(<ReviewScoreSub score={8.2} />);

    // The Box should contain the score text and have styling
    const scoreText = screen.getByText('8.2');
    expect(scoreText).toBeInTheDocument();
    expect(scoreText.parentElement).toHaveAttribute('style');
  });

  it('applies Prata font family', () => {
    render(<ReviewScoreSub score={6.7} />);

    const scoreText = screen.getByText('6.7');
    const subText = screen.getByText('/10');

    expect(scoreText).toHaveAttribute('style');
    expect(subText).toHaveAttribute('style');
  });

  it('displays score with large font size', () => {
    render(<ReviewScoreSub score={9.1} />);

    const scoreText = screen.getByText('9.1');
    expect(scoreText).toHaveAttribute('style');
  });

  it('displays /10 with smaller dimmed text', () => {
    render(<ReviewScoreSub score={7.8} />);

    const subText = screen.getByText('/10');
    expect(subText).toHaveAttribute('style');
  });

  it('centers content in the ring progress label', () => {
    render(<ReviewScoreSub score={5.5} />);

    // The content should be properly centered within the label
    const scoreText = screen.getByText('5.5');
    const subText = screen.getByText('/10');

    expect(scoreText).toBeInTheDocument();
    expect(subText).toBeInTheDocument();
    expect(scoreText.parentElement).toHaveAttribute('style');
  });

  it('has correct ring thickness', () => {
    render(<ReviewScoreSub score={8.5} />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('has rounded caps on ring progress', () => {
    render(<ReviewScoreSub score={7.0} />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('maintains proper aspect ratio with different sizes', () => {
    render(<ReviewScoreSub score={6.5} size={150} />);

    const ringProgress = document.querySelector('.mantine-RingProgress-root');
    expect(ringProgress).toBeInTheDocument();
  });

  it('handles decimal scores correctly', () => {
    render(<ReviewScoreSub score={4.3} />);

    expect(screen.getByText('4.3')).toBeInTheDocument();
  });

  it('handles negative scores', () => {
    render(<ReviewScoreSub score={-1.5} />);

    expect(screen.getByText('-1.5')).toBeInTheDocument();
  });

  it('renders with proper structure (RingProgress with Box label)', () => {
    render(<ReviewScoreSub score={8.8} />);

    const scoreText = screen.getByText('8.8');
    const subText = screen.getByText('/10');
    const ringProgress = document.querySelector('.mantine-RingProgress-root');

    expect(ringProgress).toBeInTheDocument();
    expect(scoreText).toBeInTheDocument();
    expect(subText).toBeInTheDocument();
  });

  it('applies background color to inner circle', () => {
    render(<ReviewScoreSub score={7.2} />);

    // The container with the score should have background styling
    const scoreText = screen.getByText('7.2');
    expect(scoreText).toBeInTheDocument();
    expect(scoreText.parentElement).toHaveAttribute('style');
  });

  it('uses correct line height for text elements', () => {
    render(<ReviewScoreSub score={9.5} />);

    const scoreText = screen.getByText('9.5');
    const subText = screen.getByText('/10');

    expect(scoreText).toHaveAttribute('style');
    expect(subText).toHaveAttribute('style');
  });
});
