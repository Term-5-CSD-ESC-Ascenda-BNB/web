import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SocialLoginButtons } from './SocialLoginButtons';

interface SocialButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

interface IconProps {
  size: number;
  color: string;
}

// Mock the GoogleLoginButton component
const mockGoogleMutation = {
  mutate: vi.fn(),
  isPending: false,
};

vi.mock('../../google/useGoogleMutation', () => ({
  useGoogleMutation: () => mockGoogleMutation,
}));

vi.mock('../../google/useGoogleNotifications', () => ({
  useGoogleNotifications: () => ({
    handleSuccess: vi.fn(),
    handleError: vi.fn(),
  }),
}));

// Mock the SocialButton component
vi.mock('../SocialButton/SocialButton', () => ({
  SocialButton: ({ children, onClick, disabled }: SocialButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={`social-button-${disabled ? 'disabled' : 'enabled'}`}
    >
      {children}
    </button>
  ),
}));

// Mock Tabler icons
vi.mock('@tabler/icons-react', () => ({
  IconBrandGoogle: ({ size, color }: IconProps) => (
    <svg data-testid="google-icon" data-size={size} data-color={color}>
      <circle />
    </svg>
  ),
  IconBrandFacebook: ({ size, color }: IconProps) => (
    <svg data-testid="facebook-icon" data-size={size} data-color={color}>
      <circle />
    </svg>
  ),
  IconBrandApple: ({ size, color }: IconProps) => (
    <svg data-testid="apple-icon" data-size={size} data-color={color}>
      <circle />
    </svg>
  ),
}));

describe('SocialLoginButtons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGoogleMutation.isPending = false;
  });

  describe('rendering', () => {
    it('renders without crashing and matches snapshot', () => {
      const { container } = render(<SocialLoginButtons />);
      expect(container).toMatchSnapshot();
    });

    it('renders all three social login buttons', () => {
      render(<SocialLoginButtons />);

      // Should render Google button (enabled)
      expect(screen.getByTestId('social-button-enabled')).toBeInTheDocument();

      // Should render Facebook and Apple buttons (disabled)
      expect(screen.getAllByTestId('social-button-disabled')).toHaveLength(2);
    });

    it('renders correct social media icons', () => {
      render(<SocialLoginButtons />);

      expect(screen.getByTestId('google-icon')).toBeInTheDocument();
      expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
      expect(screen.getByTestId('apple-icon')).toBeInTheDocument();
    });

    it('applies correct icon properties', () => {
      render(<SocialLoginButtons />);

      const googleIcon = screen.getByTestId('google-icon');
      const facebookIcon = screen.getByTestId('facebook-icon');
      const appleIcon = screen.getByTestId('apple-icon');

      expect(googleIcon).toHaveAttribute('data-size', '26');
      expect(googleIcon).toHaveAttribute('data-color', '#EA4335');

      expect(facebookIcon).toHaveAttribute('data-size', '26');
      expect(facebookIcon).toHaveAttribute('data-color', '#1877F3');

      expect(appleIcon).toHaveAttribute('data-size', '26');
      expect(appleIcon).toHaveAttribute('data-color', '#000');
    });
  });

  describe('button states', () => {
    it('renders Google button as enabled by default', () => {
      render(<SocialLoginButtons />);

      const googleButton = screen.getByTestId('social-button-enabled');
      expect(googleButton).not.toBeDisabled();
    });

    it('renders Facebook button as disabled', () => {
      render(<SocialLoginButtons />);

      const disabledButtons = screen.getAllByTestId('social-button-disabled');
      const facebookButton = disabledButtons.find((button) =>
        button.querySelector('[data-testid="facebook-icon"]')
      );

      expect(facebookButton).toBeDisabled();
    });

    it('renders Apple button as disabled', () => {
      render(<SocialLoginButtons />);

      const disabledButtons = screen.getAllByTestId('social-button-disabled');
      const appleButton = disabledButtons.find((button) =>
        button.querySelector('[data-testid="apple-icon"]')
      );

      expect(appleButton).toBeDisabled();
    });

    it('disables Google button when mutation is pending', () => {
      mockGoogleMutation.isPending = true;
      render(<SocialLoginButtons />);

      // When pending, all buttons should be disabled (Google becomes disabled, others stay disabled)
      const disabledButtons = screen.getAllByTestId('social-button-disabled');
      expect(disabledButtons).toHaveLength(3);

      // Verify the Google button is among the disabled buttons
      const googleButton = disabledButtons.find((button) =>
        button.querySelector('[data-testid="google-icon"]')
      );
      expect(googleButton).toBeDisabled();

      // Should not have any enabled buttons
      expect(screen.queryByTestId('social-button-enabled')).not.toBeInTheDocument();
    });
  });

  describe('Google authentication', () => {
    it('triggers Google authentication when Google button is clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLoginButtons />);

      const googleButton = screen.getByTestId('social-button-enabled');
      await user.click(googleButton);

      expect(mockGoogleMutation.mutate).toHaveBeenCalledTimes(1);
      expect(mockGoogleMutation.mutate).toHaveBeenCalledWith(
        undefined,
        expect.objectContaining({
          onSuccess: expect.any(Function) as unknown,
          onError: expect.any(Function) as unknown,
        })
      );
    });

    it('does not trigger authentication when Google button is disabled', async () => {
      mockGoogleMutation.isPending = true;
      const user = userEvent.setup();
      render(<SocialLoginButtons />);

      const disabledButtons = screen.getAllByTestId('social-button-disabled');
      const googleButton = disabledButtons.find((button) =>
        button.querySelector('[data-testid="google-icon"]')
      );

      await user.click(googleButton!);

      expect(mockGoogleMutation.mutate).not.toHaveBeenCalled();
    });

    it('handles multiple Google button clicks correctly', async () => {
      const user = userEvent.setup();
      render(<SocialLoginButtons />);

      const googleButton = screen.getByTestId('social-button-enabled');
      await user.click(googleButton);
      await user.click(googleButton);
      await user.click(googleButton);

      expect(mockGoogleMutation.mutate).toHaveBeenCalledTimes(3);
    });
  });

  describe('disabled providers', () => {
    it('does not trigger any action when Facebook button is clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLoginButtons />);

      const disabledButtons = screen.getAllByTestId('social-button-disabled');
      const facebookButton = disabledButtons.find((button) =>
        button.querySelector('[data-testid="facebook-icon"]')
      );

      await user.click(facebookButton!);

      // Should not trigger any mutations since it's disabled
      expect(mockGoogleMutation.mutate).not.toHaveBeenCalled();
    });

    it('does not trigger any action when Apple button is clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLoginButtons />);

      const disabledButtons = screen.getAllByTestId('social-button-disabled');
      const appleButton = disabledButtons.find((button) =>
        button.querySelector('[data-testid="apple-icon"]')
      );

      await user.click(appleButton!);

      // Should not trigger any mutations since it's disabled
      expect(mockGoogleMutation.mutate).not.toHaveBeenCalled();
    });
  });

  describe('layout and styling', () => {
    it('renders buttons in a group layout', () => {
      const { container } = render(<SocialLoginButtons />);

      // Mantine Group component should be present
      const group = container.querySelector('.mantine-Group-root');
      expect(group).toBeInTheDocument();
    });

    it('maintains proper button order', () => {
      render(<SocialLoginButtons />);

      const buttons = screen.getAllByRole('button');

      // Verify the order: Google (enabled), Facebook (disabled), Apple (disabled)
      expect(buttons[0]).toContainElement(screen.getByTestId('google-icon'));
      expect(buttons[1]).toContainElement(screen.getByTestId('facebook-icon'));
      expect(buttons[2]).toContainElement(screen.getByTestId('apple-icon'));
    });

    it('has consistent icon sizing across all buttons', () => {
      render(<SocialLoginButtons />);

      const googleIcon = screen.getByTestId('google-icon');
      const facebookIcon = screen.getByTestId('facebook-icon');
      const appleIcon = screen.getByTestId('apple-icon');

      expect(googleIcon).toHaveAttribute('data-size', '26');
      expect(facebookIcon).toHaveAttribute('data-size', '26');
      expect(appleIcon).toHaveAttribute('data-size', '26');
    });
  });

  describe('accessibility', () => {
    it('provides accessible buttons for screen readers', () => {
      render(<SocialLoginButtons />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);

      // All buttons should be focusable
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    it('supports keyboard navigation', () => {
      render(<SocialLoginButtons />);

      const googleButton = screen.getByTestId('social-button-enabled');

      // Google button should be focusable
      googleButton.focus();
      expect(googleButton).toHaveFocus();
    });

    it('disabled buttons are not interactive', () => {
      render(<SocialLoginButtons />);

      const disabledButtons = screen.getAllByTestId('social-button-disabled');

      disabledButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('component integration', () => {
    it('integrates properly with GoogleLoginButton component', () => {
      render(<SocialLoginButtons />);

      // Should render the Google icon from the GoogleLoginButton
      expect(screen.getByTestId('google-icon')).toBeInTheDocument();

      // Should have the enabled button from GoogleLoginButton
      expect(screen.getByTestId('social-button-enabled')).toBeInTheDocument();
    });

    it('uses SocialButton component for all buttons', () => {
      render(<SocialLoginButtons />);

      // Should have one enabled and two disabled SocialButtons
      expect(screen.getByTestId('social-button-enabled')).toBeInTheDocument();
      expect(screen.getAllByTestId('social-button-disabled')).toHaveLength(2);
    });

    it('properly integrates with Mantine Group component', () => {
      const { container } = render(<SocialLoginButtons />);

      // Should render within a Mantine Group
      expect(container.querySelector('.mantine-Group-root')).toBeInTheDocument();
    });
  });

  describe('future provider support', () => {
    it('demonstrates extensibility pattern for future providers', () => {
      render(<SocialLoginButtons />);

      // Current pattern: Google (functional), Facebook/Apple (disabled placeholders)
      // This test documents the current state and pattern for future expansion

      const enabledButtons = screen.getAllByTestId('social-button-enabled');
      const disabledButtons = screen.getAllByTestId('social-button-disabled');

      expect(enabledButtons).toHaveLength(1); // Google
      expect(disabledButtons).toHaveLength(2); // Facebook, Apple
    });
  });
});
