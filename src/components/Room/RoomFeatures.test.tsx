import { render, screen, fireEvent, within } from '@/tests/utils';
import { RoomFeatures } from './RoomFeatures';
import { expect, describe, it, vi } from 'vitest';

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core');
  return {
    ...actual,
    Modal: ({ opened, children }: { opened: boolean; children: React.ReactNode }) =>
      opened ? <div data-testid="modal">{children}</div> : null,
  };
});

vi.mock('@/utils/getAmenityIcon', () => ({
  getAmenityIcon: vi.fn(() => <span data-testid="icon" />),
}));

describe('RoomFeatures', () => {
  const features = Array.from({ length: 8 }, (_, i) => `Feature ${i + 1}`);

  it('shows only top 6 features initially', () => {
    render(<RoomFeatures features={features} />);

    features.slice(0, 6).forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    expect(screen.queryByText('Feature 7')).not.toBeInTheDocument();
    expect(screen.queryByText('Feature 8')).not.toBeInTheDocument();
  });

  it('opens modal and shows all features', () => {
    render(<RoomFeatures features={features} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /view all room details/i }));

    const modal = screen.getByTestId('modal');

    // Check only inside modal
    features.forEach((feature) => {
      expect(within(modal).getByText(feature)).toBeInTheDocument();
    });
  });
});
