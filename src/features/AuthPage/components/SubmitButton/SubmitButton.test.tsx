import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SubmitButton } from './SubmitButton';

describe('SubmitButton', () => {
  it('renders with children', () => {
    render(<SubmitButton disabled={false}>Submit</SubmitButton>);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('has correct type attribute', () => {
    render(<SubmitButton disabled={false}>Submit</SubmitButton>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies default props (size, radius)', () => {
    const { container } = render(<SubmitButton disabled={false}>Submit</SubmitButton>);

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('respects disabled prop', () => {
    render(<SubmitButton disabled={true}>Submit</SubmitButton>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('can be enabled', () => {
    render(<SubmitButton disabled={false}>Submit</SubmitButton>);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('accepts custom Mantine Button props', () => {
    render(
      <SubmitButton disabled={false} size="sm" variant="outline">
        Submit
      </SubmitButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-size', 'sm');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });

  it('can override default font props', () => {
    render(
      <SubmitButton disabled={false} ff="monospace" fw={700}>
        Submit
      </SubmitButton>
    );

    // Should render without errors
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('triggers form submission when clicked', async () => {
    const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => e.preventDefault());
    const user = userEvent.setup();

    render(
      <form onSubmit={handleSubmit}>
        <SubmitButton disabled={false}>Submit</SubmitButton>
      </form>
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
