import { render, screen, fireEvent } from '@/tests/utils';
import { CounterField } from './CounterField';
import { describe, it, expect, vi } from 'vitest';

describe('CounterField', () => {
  it('renders the value', () => {
    render(<CounterField value={5} onChange={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onChange with value - 1 when decrement clicked', () => {
    const onChange = vi.fn();
    render(<CounterField value={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /decrement/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange with value + 1 when increment clicked', () => {
    const onChange = vi.fn();
    render(<CounterField value={3} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('disables decrement button when disabledDecrement is true', () => {
    render(<CounterField value={1} onChange={() => {}} disabledDecrement />);
    const decButton = screen.getAllByRole('button')[0];
    expect(decButton).toBeDisabled();
  });

  it('disables increment button when disabledIncrement is true', () => {
    render(<CounterField value={10} onChange={() => {}} disabledIncrement />);
    const incButton = screen.getAllByRole('button')[1];
    expect(incButton).toBeDisabled();
  });
});
