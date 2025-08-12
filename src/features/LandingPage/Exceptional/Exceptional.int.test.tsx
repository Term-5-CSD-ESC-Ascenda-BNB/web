import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { ExceptionalSection } from './ExceptionalSection';

describe('ExceptionalSection integration', () => {
  it('renders four Exceptional items with correct content', () => {
    render(<ExceptionalSection />);

    // Section title
    expect(screen.getByText('Exceptional Stays, Exceptional Standards')).toBeInTheDocument();

    // Four items
    const items = screen.getAllByTestId('exceptional-item');
    expect(items).toHaveLength(4);

    expect(items[0]).toHaveTextContent('Verified Listings');
    expect(items[0]).toHaveTextContent(
      'Every property is vetted for quality, so you can book with confidence — no surprises, just stays that meet our standards.'
    );

    expect(items[3]).toHaveTextContent('Exclusive Offers');
    expect(items[3]).toHaveTextContent(
      'Unlock special deals and members-only perks when you book directly through our platform.'
    );
  });

  it('renders icons for each Exceptional item', () => {
    render(<ExceptionalSection />);
    const icons = screen.getAllByTestId('exceptional-icon');
    expect(icons).toHaveLength(4);
  });
});
