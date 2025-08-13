import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { ExceptionalSection } from './ExceptionalSection';

// Stub Exceptional to observe props
vi.mock('./Exceptional', () => ({
  Exceptional: ({ header, body }: { header: string; body: string }) => (
    <div data-testid="exceptional" data-header={header} data-body={body} />
  ),
}));

describe('ExceptionalSection', () => {
  it('renders section title', () => {
    render(<ExceptionalSection />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Exceptional Stays, Exceptional Standards'
    );
  });

  it('renders a divider', () => {
    render(<ExceptionalSection />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('renders four exceptional items with correct headers and bodies', () => {
    render(<ExceptionalSection />);
    const items = screen.getAllByTestId('exceptional');
    expect(items).toHaveLength(4);

    const expected = [
      {
        header: 'Verified Listings',
        body: 'Every property is vetted for quality, so you can book with confidence — no surprises, just stays that meet our standards.',
      },
      {
        header: 'Flexible Cancellations',
        body: 'Plans change — and that’s okay. Enjoy peace of mind with flexible cancellation policies on select stays.',
      },
      {
        header: '24/7 Support',
        body: 'Need help, day or night? Our dedicated support team is always here to assist — anytime, anywhere.',
      },
      {
        header: 'Exclusive Offers',
        body: 'Unlock special deals and members-only perks when you book directly through our platform.',
      },
    ];

    items.forEach((item, i) => {
      expect(item).toHaveAttribute('data-header', expected[i].header);
      expect(item).toHaveAttribute('data-body', expected[i].body);
    });
  });
});
