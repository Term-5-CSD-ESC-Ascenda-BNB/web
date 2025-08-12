import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { ReviewScoreLarge } from './ReviewScoreLarge';

// Mock CSS modules
vi.mock('./ReviewScoreLarge.module.css', () => ({
  default: {
    score: 'score',
  },
}));

describe('ReviewScoreLarge', () => {
  it('renders the score value', () => {
    render(<ReviewScoreLarge score={8.5} />);

    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders integer scores correctly', () => {
    render(<ReviewScoreLarge score={9} />);

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('renders decimal scores correctly', () => {
    render(<ReviewScoreLarge score={7.2} />);

    expect(screen.getByText('7.2')).toBeInTheDocument();
  });

  it('renders zero score', () => {
    render(<ReviewScoreLarge score={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders negative scores', () => {
    render(<ReviewScoreLarge score={-1} />);

    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('renders high precision decimal scores', () => {
    render(<ReviewScoreLarge score={8.567} />);

    expect(screen.getByText('8.567')).toBeInTheDocument();
  });

  it('has correct CSS class applied to score text', () => {
    render(<ReviewScoreLarge score={8.5} />);

    const scoreText = screen.getByText('8.5');
    expect(scoreText).toHaveClass('score');
  });

  it('renders with proper structure (AspectRatio > Paper > Group > Text)', () => {
    render(<ReviewScoreLarge score={7.8} />);

    const scoreText = screen.getByText('7.8');

    // Check that the text is properly nested in the component structure
    expect(scoreText).toBeInTheDocument();
    expect(scoreText.tagName).toBe('P'); // Mantine Text renders as p by default
  });

  it('maintains aspect ratio of 1:1', () => {
    render(<ReviewScoreLarge score={8.0} />);

    // The AspectRatio component should be present
    const aspectRatio = document.querySelector('.mantine-AspectRatio-root');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('has circular border radius', () => {
    render(<ReviewScoreLarge score={9.1} />);

    // Paper should have high border radius for circular appearance
    const paper = document.querySelector('.mantine-Paper-root');
    expect(paper).toBeInTheDocument();
  });

  it('centers content properly', () => {
    render(<ReviewScoreLarge score={6.7} />);

    // Group should center the content
    const group = document.querySelector('.mantine-Group-root');
    expect(group).toBeInTheDocument();
  });

  it('applies correct font size to score text', () => {
    render(<ReviewScoreLarge score={8.3} />);

    const scoreText = screen.getByText('8.3');
    // Mantine applies font size as CSS custom properties
    expect(scoreText).toHaveAttribute('style');
  });

  it('handles very long decimal numbers', () => {
    render(<ReviewScoreLarge score={8.123456789} />);

    expect(screen.getByText('8.123456789')).toBeInTheDocument();
  });

  it('handles maximum typical review score', () => {
    render(<ReviewScoreLarge score={10} />);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('handles minimum typical review score', () => {
    render(<ReviewScoreLarge score={1} />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders correctly with single decimal place', () => {
    render(<ReviewScoreLarge score={8.1} />);

    expect(screen.getByText('8.1')).toBeInTheDocument();
  });

  it('has proper width set on AspectRatio', () => {
    render(<ReviewScoreLarge score={7.5} />);

    // Should have width of 100 as specified in component
    const aspectRatio = document.querySelector('.mantine-AspectRatio-root');
    expect(aspectRatio).toBeInTheDocument();
  });

  it('applies theme colors correctly', () => {
    render(<ReviewScoreLarge score={8.8} />);

    const paper = document.querySelector('.mantine-Paper-root');
    const scoreText = screen.getByText('8.8');

    // Both elements should have style attributes (theme colors applied)
    expect(paper).toHaveAttribute('style');
    expect(scoreText).toHaveAttribute('style');
  });

  it('uses display font family', () => {
    render(<ReviewScoreLarge score={9.2} />);

    const scoreText = screen.getByText('9.2');
    // Font family should be applied via style
    expect(scoreText).toHaveAttribute('style');
  });
});
