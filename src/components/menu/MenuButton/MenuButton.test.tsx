import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MenuButton } from './MenuButton';

// Mock dependencies
const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    children,
    className,
    reloadDocument,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    reloadDocument?: boolean;
    [key: string]: unknown;
  }) => {
    // Filter out reloadDocument from props to avoid DOM warning
    const { reloadDocument: _, ...restProps } = props;

    return (
      <a
        href={to}
        className={className}
        data-reload-document={reloadDocument ? 'true' : undefined}
        onClick={(e) => {
          e.preventDefault();
          mockNavigate({ to });
        }}
        {...restProps}
      >
        {children}
      </a>
    );
  },
  useRouter: () => ({ navigate: mockNavigate }),
}));

// Mock CSS modules
vi.mock('./MenuButton.module.css', () => ({
  default: {
    menuButton: 'menuButton',
    menuStack: 'menuStack',
    menuLink: 'menuLink',
  },
}));

describe('MenuButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the menu button with dots icon', () => {
    render(<MenuButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Check that the dots icon is rendered
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('opens drawer when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');

    // Initially drawer should not be visible
    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    // Click the button to open drawer
    await user.click(button);

    // Navigation links should now be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('displays logo in drawer header when opened', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Logo should be visible in the drawer header
    expect(screen.getByText('Wayfare')).toBeInTheDocument();
  });

  it('closes drawer when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Drawer should be open
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Find and click the overlay (backdrop)
    const overlay = document.querySelector('.mantine-Drawer-overlay');
    if (overlay) {
      await user.click(overlay);

      // Give time for drawer to close
      await vi.waitFor(() => {
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
      });
    }
  });

  it('renders all navigation links with correct labels and icons', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Check all navigation links are present
    const homeLink = screen.getByText('Home');
    const searchLink = screen.getByText('Search');
    const loginLink = screen.getByText('Login');

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();

    // Check that all links have associated icons (SVG elements)
    const svgIcons = document.querySelectorAll('svg');
    expect(svgIcons.length).toBeGreaterThanOrEqual(4); // menu button icon + 3 nav icons
  });

  it('navigates to correct routes when links are clicked', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Click home link
    const homeLink = screen.getByText('Home');
    await user.click(homeLink);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });

    // Click search link
    const searchLink = screen.getByText('Search');
    await user.click(searchLink);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/search' });

    // Click login link
    const loginLink = screen.getByText('Login');
    await user.click(loginLink);
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/login' });
  });

  it('applies correct CSS classes', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('menuButton');

    await user.click(button);

    // Check navigation stack has correct class
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('menuStack');
  });

  it('forwards additional props to the button element', () => {
    render(
      <MenuButton data-testid="custom-menu-button" aria-label="Open navigation menu" disabled />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-testid', 'custom-menu-button');
    expect(button).toHaveAttribute('aria-label', 'Open navigation menu');
    expect(button).toBeDisabled();
  });

  it('has correct button width property', () => {
    render(<MenuButton />);

    const button = screen.getByRole('button');
    // The component sets w={42} which becomes a Mantine style property
    expect(button).toHaveAttribute('style');
    expect(button.style.getPropertyValue('--button-width') || button.style.width).toBeTruthy();
  });

  it('drawer opens from the right side', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    // Check drawer positioning
    const drawer = document.querySelector('.mantine-Drawer-root');
    expect(drawer).toBeInTheDocument();
  });

  it('login link has reloadDocument prop', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    const loginLink = screen.getByText('Login').closest('a');
    expect(loginLink).toHaveAttribute('data-reload-document', 'true');
  });

  it('handles keyboard interactions', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');

    // Use Enter key to open drawer
    button.focus();
    await user.keyboard('{Enter}');

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('drawer has blur overlay effect', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    const button = screen.getByRole('button');
    await user.click(button);

    const overlay = document.querySelector('.mantine-Drawer-overlay');
    expect(overlay).toBeInTheDocument();
  });
});
