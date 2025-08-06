import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IconHome, IconSearch, IconUser } from '@tabler/icons-react';
import { MenuNavLink } from './MenuLink';

// Mock @tanstack/react-router
const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    children,
    className,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        mockNavigate({ to });
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

describe('MenuNavLink', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders with icon and label', () => {
    render(<MenuNavLink to="/" icon={IconHome} label="Home" />);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check that icon is rendered (SVG element)
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('navigates to the correct route when clicked', async () => {
    const user = userEvent.setup();

    render(<MenuNavLink to="/search" icon={IconSearch} label="Search" />);

    const link = screen.getByRole('link');
    await user.click(link);

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/search' });
  });

  it('applies custom className when provided', () => {
    render(<MenuNavLink to="/about" icon={IconUser} label="About" className="custom-class" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('forwards additional props to the Link component', () => {
    render(
      <MenuNavLink
        to="/booking"
        icon={IconHome}
        label="Booking"
        data-testid="booking-link"
        aria-label="Navigate to booking"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-testid', 'booking-link');
    expect(link).toHaveAttribute('aria-label', 'Navigate to booking');
  });

  it('renders icon with correct size', () => {
    render(<MenuNavLink to="/" icon={IconHome} label="Home" />);

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });

  it('displays the correct label text', () => {
    const labelText = 'Booking Success';

    render(<MenuNavLink to="/bookingsuccess" icon={IconHome} label={labelText} />);

    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it('has correct link href attribute', () => {
    render(<MenuNavLink to="/about" icon={IconHome} label="About" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('works with different icon components', () => {
    // Use a real icon for this test to avoid type issues
    render(<MenuNavLink to="/search" icon={IconSearch} label="Search Test" />);

    expect(screen.getByText('Search Test')).toBeInTheDocument();
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders with proper structure (Group containing icon and text)', () => {
    render(<MenuNavLink to="/about" icon={IconHome} label="Structure Test" />);

    const link = screen.getByRole('link');
    const group = link.firstElementChild;

    // Mantine Group component should be present
    expect(group).toBeInTheDocument();

    // Should contain both icon and text
    expect(screen.getByText('Structure Test')).toBeInTheDocument();
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('works with relative paths', () => {
    render(<MenuNavLink to=".." icon={IconHome} label="Go Back" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '..');
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('works with authentication routes', () => {
    render(<MenuNavLink to="/login" icon={IconUser} label="Login" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/login');
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
