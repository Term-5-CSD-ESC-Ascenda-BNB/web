import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with the correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Submit" onClick={handleClick} />);

    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: 'Submit' });
    await user.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
