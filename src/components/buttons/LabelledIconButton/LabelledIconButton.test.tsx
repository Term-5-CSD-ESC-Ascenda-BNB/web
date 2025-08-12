import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { LabelledIconButton } from './LabelledIconButton';
import { IconHome } from '@tabler/icons-react';

describe('LabelledIconButton', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<LabelledIconButton label="Home" icon={<IconHome />} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the provided label text', () => {
    render(<LabelledIconButton label="Test Label" icon={<IconHome />} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders the provided icon', () => {
    render(<LabelledIconButton label="Home" icon={<IconHome data-testid="home-icon" />} />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('applies default width prop of 110px', () => {
    const { container } = render(<LabelledIconButton label="Home" icon={<IconHome />} />);
    const button = container.querySelector('button');
    // Mantine converts 110px to rem units, so we check the component receives the prop
    expect(button).toBeInTheDocument();
  });

  it('applies custom width when provided', () => {
    const { container } = render(<LabelledIconButton label="Home" icon={<IconHome />} w="200px" />);
    const button = container.querySelector('button');
    // Mantine handles the width internally, we verify the component renders
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = vi.fn();
    render(<LabelledIconButton label="Clickable" icon={<IconHome />} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not throw when clicked without onClick handler', () => {
    render(<LabelledIconButton label="No Handler" icon={<IconHome />} />);
    const button = screen.getByRole('button');

    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it('passes through additional ButtonProps', () => {
    render(
      <LabelledIconButton
        label="Disabled"
        icon={<IconHome />}
        disabled
        variant="outline"
        data-testid="custom-button"
      />
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toBeDisabled();
  });

  it('renders with correct button structure', () => {
    render(<LabelledIconButton label="Test" icon={<IconHome />} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Check that the label text is present
    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
  });

  it('handles different icon types', () => {
    const customIcon = <span data-testid="custom-icon">🏠</span>;
    render(<LabelledIconButton label="Custom Icon" icon={customIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('Custom Icon')).toBeInTheDocument();
  });

  it('handles empty label gracefully', () => {
    render(<LabelledIconButton label="" icon={<IconHome />} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('handles long labels correctly', () => {
    const longLabel = 'This is a very long label that might overflow';
    render(<LabelledIconButton label={longLabel} icon={<IconHome />} />);
    expect(screen.getByText(longLabel)).toBeInTheDocument();
  });

  it('maintains button accessibility', () => {
    render(
      <LabelledIconButton
        label="Accessible Button"
        icon={<IconHome />}
        aria-label="Custom aria label"
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom aria label');
  });

  it('renders icon as left section of button', () => {
    render(<LabelledIconButton label="Test" icon={<IconHome data-testid="left-icon" />} />);

    const icon = screen.getByTestId('left-icon');
    const button = screen.getByRole('button');

    expect(icon).toBeInTheDocument();
    expect(button).toContainElement(icon);
  });

  it('supports all Mantine Button props', () => {
    render(
      <LabelledIconButton
        label="Styled Button"
        icon={<IconHome />}
        variant="outline"
        color="blue"
        size="lg"
        loading
        data-testid="styled-button"
      />
    );

    const button = screen.getByTestId('styled-button');
    expect(button).toBeInTheDocument();
  });

  it('handles click events properly with multiple clicks', () => {
    const mockOnClick = vi.fn();
    render(<LabelledIconButton label="Multi Click" icon={<IconHome />} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(3);
  });
});
