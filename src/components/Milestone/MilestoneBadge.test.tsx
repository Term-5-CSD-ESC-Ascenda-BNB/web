import { render, screen } from '@/tests/utils';
import { MilestoneBadge } from './MilestoneBadge';
import { describe, it, expect } from 'vitest';

describe('MilestoneBadge', () => {
  it('renders image, country, and date text', () => {
    render(
      <MilestoneBadge image="https://example.com/image.jpg" country="Japan" date="March 2025" />
    );

    const img = screen.getByRole('img');
    const countryText = screen.getByText('Japan');
    const dateText = screen.getByText('March 2025');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(countryText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
  });

  it('renders fallback text if no image provided (optional)', () => {
    render(<MilestoneBadge image="" country="France" date="April 2024" />);

    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('April 2024')).toBeInTheDocument();
  });
});
