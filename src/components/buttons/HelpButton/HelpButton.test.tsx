import { render, screen, userEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { HelpButton } from './HelpButton';

describe('HelpButton', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<HelpButton aria-label="Help" />);
    expect(container).toMatchSnapshot();
  });

  it('renders an accessible button with the correct icon', () => {
    render(<HelpButton aria-label="Help" />);
    // Finds the button by aria-label
    const button = screen.getByRole('button', { name: 'Help' });
    // There should be an <svg> icon inside
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('forwards onClick prop', async () => {
    const handleClick = vi.fn();
    render(<HelpButton aria-label="Help" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Help' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
