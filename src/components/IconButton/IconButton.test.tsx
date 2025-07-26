import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { IconButton } from './IconButton';
import { IconHome } from '@tabler/icons-react';

describe('IconButton', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<IconButton icon={<IconHome />} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the provided icon', () => {
    render(<IconButton icon={<IconHome data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<IconButton icon={<IconHome />} className="extra-class" />);
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });
});
