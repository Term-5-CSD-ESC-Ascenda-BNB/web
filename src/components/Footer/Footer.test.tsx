import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

// Mock @tanstack/react-router
const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate: mockNavigate }),
}));

describe('Footer (presentational)', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('displays copyright notice', () => {
    render(<Footer />);
    expect(screen.getByText('© 2025 Wayfare. All rights reserved.')).toBeInTheDocument();
  });

  it('shows contact section with email and phone', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText(/contact@wayfare\.com/)).toBeInTheDocument();
    expect(screen.getByText(/\+65 6789 1234/)).toBeInTheDocument();
  });

  it('lists navigation links', () => {
    render(<Footer />);
    ['About Us', 'Hotels', 'FAQs', 'My Bookings'].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('lists legal links', () => {
    render(<Footer />);
    ['Terms of Service', 'Privacy Policy', 'Cookie Policy'].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
