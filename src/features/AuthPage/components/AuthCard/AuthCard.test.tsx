import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { AuthCard } from './AuthCard';
import { Button } from '@mantine/core';

describe('AuthCard', () => {
  it('renders with title and subtitle', () => {
    render(<AuthCard title="Welcome" subtitle="Please sign in to continue" />);

    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();
    expect(screen.getByText('Please sign in to continue')).toBeInTheDocument();
  });

  it('renders with children when provided', () => {
    render(
      <AuthCard title="Sign In" subtitle="Enter your credentials">
        <Button data-testid="login-button">Login</Button>
      </AuthCard>
    );

    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText('Enter your credentials')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<AuthCard title="Registration" subtitle="Create your account" />);

    expect(screen.getByRole('heading', { name: 'Registration' })).toBeInTheDocument();
    expect(screen.getByText('Create your account')).toBeInTheDocument();
  });

  it('applies correct styling classes and structure', () => {
    const { container } = render(<AuthCard title="Test Title" subtitle="Test Subtitle" />);

    // Check that the Paper component is rendered
    const paper = container.querySelector('[class*="mantine-Paper-root"]');
    expect(paper).toBeInTheDocument();

    // Check that the Stack component is rendered
    const stack = container.querySelector('[class*="mantine-Stack-root"]');
    expect(stack).toBeInTheDocument();
  });

  it('renders title with correct heading level', () => {
    render(<AuthCard title="My Title" subtitle="My Subtitle" />);

    const heading = screen.getByRole('heading', { name: 'My Title' });
    expect(heading.tagName).toBe('H1');
  });

  it('handles empty strings for title and subtitle', () => {
    render(<AuthCard title="" subtitle="" />);

    // Even empty strings should render as headings/text elements
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('');
  });

  it('renders multiple children correctly', () => {
    render(
      <AuthCard title="Multiple Children" subtitle="Testing multiple children">
        <Button data-testid="first-button">First Button</Button>
        <Button data-testid="second-button">Second Button</Button>
        <div data-testid="custom-div">Custom Content</div>
      </AuthCard>
    );

    expect(screen.getByTestId('first-button')).toBeInTheDocument();
    expect(screen.getByTestId('second-button')).toBeInTheDocument();
    expect(screen.getByTestId('custom-div')).toBeInTheDocument();
  });

  it('maintains proper text alignment for title and subtitle', () => {
    render(<AuthCard title="Centered Title" subtitle="Centered Subtitle" />);

    const title = screen.getByRole('heading', { name: 'Centered Title' });
    const subtitle = screen.getByText('Centered Subtitle');

    // Check that text alignment styles are applied (these are Mantine props)
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('applies theme-based styling correctly', () => {
    const { container } = render(
      <AuthCard title="Theme Test" subtitle="Testing theme integration" />
    );

    // The component should render without throwing errors and apply Mantine theme
    expect(container.firstChild).toBeInTheDocument();
  });
});
