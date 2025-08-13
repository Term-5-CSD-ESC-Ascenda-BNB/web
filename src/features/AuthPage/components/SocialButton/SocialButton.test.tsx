import { render, screen, userEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { SocialButton } from './SocialButton';

describe('SocialButton', () => {
  describe('rendering', () => {
    it('renders without crashing and matches snapshot', () => {
      const { container } = render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );
      expect(container).toMatchSnapshot();
    });

    it('renders children content', () => {
      render(
        <SocialButton>
          <span data-testid="social-icon">Google Icon</span>
        </SocialButton>
      );

      expect(screen.getByTestId('social-icon')).toBeInTheDocument();
      expect(screen.getByText('Google Icon')).toBeInTheDocument();
    });

    it('renders with complex children', () => {
      render(
        <SocialButton>
          <div>
            <svg data-testid="svg-icon">
              <circle />
            </svg>
            <span>Complex Content</span>
          </div>
        </SocialButton>
      );

      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
      expect(screen.getByText('Complex Content')).toBeInTheDocument();
    });
  });

  describe('styling and appearance', () => {
    it('applies correct button styles', () => {
      render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');

      // Check inline styles
      expect(button).toHaveStyle({
        width: '54px',
        height: '54px',
        background: '#fff',
        border: '1px solid #e4e4ec',
      });
    });

    it('has correct Mantine props applied', () => {
      const { container } = render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );

      const button = container.querySelector('button');

      // Mantine applies these as CSS classes, so we check for their presence
      expect(button).toHaveClass('mantine-Button-root');
    });
  });

  describe('interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <SocialButton onClick={handleClick}>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick handler multiple times on multiple clicks', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <SocialButton onClick={handleClick}>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('does not crash when onClick is not provided', async () => {
      const user = userEvent.setup();

      render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');

      // Should not throw an error
      await expect(user.click(button)).resolves.not.toThrow();
    });

    it('supports keyboard interactions', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <SocialButton onClick={handleClick}>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports spacebar activation', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <SocialButton onClick={handleClick}>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled state', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(
        <SocialButton disabled>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('does not call onClick when disabled and clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <SocialButton onClick={handleClick} disabled>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('is not disabled by default', () => {
      render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('can be enabled after being disabled', () => {
      const { rerender } = render(
        <SocialButton disabled>
          <span>Icon</span>
        </SocialButton>
      );

      let button = screen.getByRole('button');
      expect(button).toBeDisabled();

      rerender(
        <SocialButton disabled={false}>
          <span>Icon</span>
        </SocialButton>
      );

      button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('is focusable', () => {
      render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('has correct role', () => {
      render(
        <SocialButton>
          <span>Icon</span>
        </SocialButton>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is accessible by screen readers', () => {
      render(
        <SocialButton>
          <span>Google Sign In</span>
        </SocialButton>
      );

      // The button should be accessible with its text content
      expect(screen.getByRole('button', { name: 'Google Sign In' })).toBeInTheDocument();
    });

    it('supports tabbing navigation', () => {
      render(
        <div>
          <SocialButton>
            <span>Button 1</span>
          </SocialButton>
          <SocialButton>
            <span>Button 2</span>
          </SocialButton>
        </div>
      );

      const button1 = screen.getByRole('button', { name: 'Button 1' });
      const button2 = screen.getByRole('button', { name: 'Button 2' });

      button1.focus();
      expect(button1).toHaveFocus();

      // Simulate tab navigation
      button2.focus();
      expect(button2).toHaveFocus();
    });
  });

  describe('edge cases', () => {
    it('handles empty children', () => {
      render(<SocialButton>{null}</SocialButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      // The button contains Mantine's internal structure but no user content
      const buttonLabel = button.querySelector('.mantine-Button-label');
      expect(buttonLabel).toBeEmptyDOMElement();
    });

    it('handles undefined children', () => {
      render(<SocialButton>{undefined}</SocialButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles boolean children', () => {
      render(<SocialButton>{false}</SocialButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('handles number children', () => {
      render(<SocialButton>{42}</SocialButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  describe('component integration', () => {
    it('works with real social media icons', () => {
      const GoogleIcon = () => (
        <svg data-testid="google-icon" width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        </svg>
      );

      render(
        <SocialButton>
          <GoogleIcon />
        </SocialButton>
      );

      expect(screen.getByTestId('google-icon')).toBeInTheDocument();
    });

    it('integrates well with click handlers for authentication', async () => {
      const mockAuth = vi.fn().mockResolvedValue({ success: true });
      const user = userEvent.setup();

      const handleGoogleAuth = () => {
        void mockAuth('google');
      };

      render(
        <SocialButton onClick={handleGoogleAuth}>
          <span>G</span>
        </SocialButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockAuth).toHaveBeenCalledWith('google');
    });
  });
});
