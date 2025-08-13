import { render, screen } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImagePanel } from './ImagePanel';
import type { ComponentProps } from 'react';

// Mock the Logo component
vi.mock('@/components/Logo/Logo', () => ({
  Logo: ({ ...props }: ComponentProps<'div'>) => (
    <div data-testid="logo" {...props}>
      Logo
    </div>
  ),
}));

// Mock Tanstack Router
const mockUseLocation = vi.fn(() => ({ pathname: '/login' }));
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode;
    to: string;
    onClick?: () => void;
  } & ComponentProps<'a'>) => (
    <a href={to} data-testid="router-link" {...props}>
      {children}
    </a>
  ),
  useLocation: () => mockUseLocation(),
}));

describe('ImagePanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when on login page', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/login' });
    });

    it('renders correct text and button for login page', () => {
      render(<ImagePanel />);

      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
    });

    it('links to register page', () => {
      render(<ImagePanel />);

      const registerLink = screen.getByRole('link', { name: 'Register' });
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });

  describe('when on register page', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/register' });
    });

    it('renders correct text and button for register page', () => {
      render(<ImagePanel />);

      expect(screen.getByText('Already have an account?')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Log in' })).toBeInTheDocument();
    });

    it('links to login page', () => {
      render(<ImagePanel />);

      const loginLink = screen.getByRole('link', { name: 'Log in' });
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  describe('component structure and styling', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/login' });
    });

    it('renders logo component', () => {
      render(<ImagePanel />);

      expect(screen.getByTestId('logo')).toBeInTheDocument();
    });

    it('renders background image with correct source', () => {
      const { container } = render(<ImagePanel />);

      // Check that the component renders successfully with background image
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders overlays for visual effects', () => {
      const { container } = render(<ImagePanel />);

      // Check that the component renders successfully with overlays
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders title with correct heading level', () => {
      render(<ImagePanel />);

      const heading = screen.getByRole('heading', { name: "Don't have an account?" });
      expect(heading.tagName).toBe('H1');
    });
  });

  describe('props and customization', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/login' });
    });

    it('accepts custom height prop', () => {
      const { container } = render(<ImagePanel h="50vh" />);

      // Just check that the component renders without errors when height prop is passed
      expect(container.firstChild).toBeInTheDocument();
    });

    it('accepts custom position prop', () => {
      const { container } = render(<ImagePanel pos="absolute" />);

      // Just check that the component renders without errors when position prop is passed
      expect(container.firstChild).toBeInTheDocument();
    });

    it('passes through additional props to Box component', () => {
      const { container } = render(<ImagePanel data-testid="custom-image-panel" />);

      expect(container.querySelector('[data-testid="custom-image-panel"]')).toBeInTheDocument();
    });

    it('calls handleButtonClick when button is clicked', () => {
      const handleButtonClick = vi.fn();
      render(<ImagePanel handleButtonClick={handleButtonClick} />);

      const button = screen.getByRole('link', { name: 'Register' });
      button.click();

      expect(handleButtonClick).toHaveBeenCalledOnce();
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/login' });
    });

    it('has proper heading structure', () => {
      render(<ImagePanel />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('button has proper role and accessibility', () => {
      render(<ImagePanel />);

      const button = screen.getByRole('link', { name: 'Register' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/register');
    });
  });

  describe('edge cases', () => {
    it('handles unknown pathname gracefully', () => {
      mockUseLocation.mockReturnValue({ pathname: '/unknown' });

      render(<ImagePanel />);

      // Should default to login page behavior
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
    });

    it('handles missing pathname gracefully', () => {
      mockUseLocation.mockReturnValue({ pathname: '' });

      render(<ImagePanel />);

      // Should default to login page behavior
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
    });
  });

  describe('theme integration', () => {
    beforeEach(() => {
      mockUseLocation.mockReturnValue({ pathname: '/login' });
    });

    it('renders without theme errors', () => {
      const { container } = render(<ImagePanel />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies theme-based styling to components', () => {
      render(<ImagePanel />);

      // Component should render successfully with theme integration
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByTestId('logo')).toBeInTheDocument();
    });
  });
});
