import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

vi.mock('@mantine/core', () => ({
  Stack: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@tabler/icons-react', () => ({
  IconBrandFacebook: () => <span>Facebook Icon</span>,
  IconBrandTiktok: () => <span>TikTok Icon</span>,
  IconBrandX: () => <span>X Icon</span>,
  IconBrandInstagram: () => <span>Instagram Icon</span>,
  IconPhone: () => <span>Phone Icon</span>,
  IconMail: () => <span>Mail Icon</span>,
}));

vi.mock('../Logo/Logo', () => ({
  Logo: ({ c }: { c: string }) => <div data-testid="logo">Mock Logo - {c}</div>,
}));

describe('Footer (presentational)', () => {
  it('renders logo and copyright', () => {
    render(<Footer />);
    expect(screen.getByTestId('logo')).toHaveTextContent('Mock Logo - gray.1');
    expect(screen.getByText(/© 2025 Wayfare/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText(/contact@wayfare.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+65 6789 1234/i)).toBeInTheDocument();
  });

  it('renders all 4 social icons', () => {
    render(<Footer />);
    expect(screen.getByText('Facebook Icon')).toBeInTheDocument();
    expect(screen.getByText('TikTok Icon')).toBeInTheDocument();
    expect(screen.getByText('X Icon')).toBeInTheDocument();
    expect(screen.getByText('Instagram Icon')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Hotels/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQs/i)).toBeInTheDocument();
    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookie Policy/i)).toBeInTheDocument();
  });
});
