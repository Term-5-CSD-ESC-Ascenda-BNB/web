import { render, screen } from '@/tests/utils'; // exports render, screen, userEvent :contentReference[oaicite:1]{index=1}
import { LocationDisplay } from './LocationDisplay'; // component under test :contentReference[oaicite:2]{index=2}
import { describe, it, expect, vi } from 'vitest';

// Mock the Tabler map-pin icon to expose size & color via testids
vi.mock('@tabler/icons-react', () => ({
  IconMapPinFilled: ({ size, color }: { size: number; color: string }) => (
    <svg data-testid="map-pin" data-size={size} data-color={color} />
  ),
}));

describe('LocationDisplay', () => {
  it('renders the provided address text', () => {
    render(<LocationDisplay address="123 Main St, Springfield" />);
    expect(screen.getByText('123 Main St, Springfield')).toBeInTheDocument();
  });

  it('applies default icon size and color', () => {
    render(<LocationDisplay address="X" />);
    const icon = screen.getByTestId('map-pin');
    expect(icon).toHaveAttribute('data-size', '16');
    expect(icon).toHaveAttribute('data-color', 'var(--mantine-color-red-6)');
  });

  it('applies custom iconSize and iconColor props', () => {
    render(<LocationDisplay address="Y" iconSize={24} iconColor="blue" />);
    const icon = screen.getByTestId('map-pin');
    expect(icon).toHaveAttribute('data-size', '24');
    expect(icon).toHaveAttribute('data-color', 'blue');
  });
});
