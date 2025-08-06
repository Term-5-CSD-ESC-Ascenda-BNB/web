import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Logo } from './Logo';

// Mock useRouter from @tanstack/react-router
const navigateMock = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate: navigateMock }),
}));

describe('Logo', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders the brand name as a link', () => {
    render(<Logo />);
    const link = screen.getByRole('link', { name: 'Wayfare' });
    expect(link).toBeInTheDocument();
  });

  it('navigates to "/" on click', async () => {
    render(<Logo />);
    const link = screen.getByRole('link', { name: 'Wayfare' });
    await userEvent.click(link);
    expect(navigateMock).toHaveBeenCalledWith({ to: '/' });
  });

  it('forwards additional props and styles', () => {
    render(<Logo className="extra-class" fz="3rem" fw={700} style={{ color: 'blue' }} />);
    const link = screen.getByRole('link', { name: 'Wayfare' });
    expect(link).toHaveClass('extra-class');
    expect(link).toHaveStyle({ color: 'rgb(0,0,255)', cursor: 'pointer' });
  });
});
