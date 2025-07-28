import { render, screen, userEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { SearchButton } from './SearchButton';

describe('SearchButton', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<SearchButton aria-label="Search" />);
    expect(container).toMatchSnapshot();
  });

  it('forwards aria-label and supports click events', async () => {
    const handleClick = vi.fn();
    render(<SearchButton aria-label="Search Action" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Search Action' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom iconSize prop', () => {
    const { container } = render(<SearchButton aria-label="Search" iconSize={32} />);
    // Snapshot will include the IconSearch element with size={32}
    expect(container).toMatchSnapshot();
  });
});
