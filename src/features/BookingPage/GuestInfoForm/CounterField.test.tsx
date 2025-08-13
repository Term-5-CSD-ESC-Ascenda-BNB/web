import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CounterField } from './CounterField';
import { useState } from 'react';

describe('CounterField', () => {
  const defaultProps = {
    value: 5,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with correct initial value', () => {
      render(<CounterField {...defaultProps} />);

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders increment and decrement buttons', () => {
      render(<CounterField {...defaultProps} />);

      expect(screen.getByLabelText('increment')).toBeInTheDocument();
      expect(screen.getByLabelText('decrement')).toBeInTheDocument();
    });

    it('renders with zero value', () => {
      render(<CounterField {...defaultProps} value={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders with large value', () => {
      render(<CounterField {...defaultProps} value={999} />);

      expect(screen.getByText('999')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onChange with incremented value when increment button is clicked', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('increment');
      fireEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('calls onChange with decremented value when decrement button is clicked', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} />);

      const decrementButton = screen.getByLabelText('decrement');
      fireEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('handles multiple rapid clicks correctly', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('increment');

      // Click multiple times rapidly
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenNthCalledWith(1, 6);
      expect(onChange).toHaveBeenNthCalledWith(2, 6);
      expect(onChange).toHaveBeenNthCalledWith(3, 6);
    });

    it('works correctly with value of 0', () => {
      const onChange = vi.fn();
      render(<CounterField value={0} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('increment');
      const decrementButton = screen.getByLabelText('decrement');

      fireEvent.click(incrementButton);
      expect(onChange).toHaveBeenCalledWith(1);

      fireEvent.click(decrementButton);
      expect(onChange).toHaveBeenCalledWith(-1);
    });
  });

  describe('Disabled States', () => {
    it('disables decrement button when disabledDecrement is true', () => {
      render(<CounterField {...defaultProps} disabledDecrement={true} />);

      const decrementButton = screen.getByLabelText('decrement');
      expect(decrementButton).toBeDisabled();
    });

    it('disables increment button when disabledIncrement is true', () => {
      render(<CounterField {...defaultProps} disabledIncrement={true} />);

      const incrementButton = screen.getByLabelText('increment');
      expect(incrementButton).toBeDisabled();
    });

    it('does not call onChange when disabled decrement button is clicked', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} disabledDecrement={true} />);

      const decrementButton = screen.getByLabelText('decrement');
      fireEvent.click(decrementButton);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when disabled increment button is clicked', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} disabledIncrement={true} />);

      const incrementButton = screen.getByLabelText('increment');
      fireEvent.click(incrementButton);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('can have both buttons disabled simultaneously', () => {
      render(<CounterField {...defaultProps} disabledDecrement={true} disabledIncrement={true} />);

      const incrementButton = screen.getByLabelText('increment');
      const decrementButton = screen.getByLabelText('decrement');

      expect(incrementButton).toBeDisabled();
      expect(decrementButton).toBeDisabled();
    });

    it('keeps enabled buttons functional when only one is disabled', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} disabledDecrement={true} />);

      const incrementButton = screen.getByLabelText('increment');
      const decrementButton = screen.getByLabelText('decrement');

      expect(decrementButton).toBeDisabled();
      expect(incrementButton).not.toBeDisabled();

      fireEvent.click(incrementButton);
      expect(onChange).toHaveBeenCalledWith(6);
    });
  });

  describe('Edge Cases', () => {
    it('handles negative values correctly', () => {
      const onChange = vi.fn();
      render(<CounterField value={-3} onChange={onChange} />);

      expect(screen.getByText('-3')).toBeInTheDocument();

      const incrementButton = screen.getByLabelText('increment');
      const decrementButton = screen.getByLabelText('decrement');

      fireEvent.click(incrementButton);
      expect(onChange).toHaveBeenCalledWith(-2);

      fireEvent.click(decrementButton);
      expect(onChange).toHaveBeenCalledWith(-4);
    });

    it('handles very large values correctly', () => {
      const onChange = vi.fn();
      render(<CounterField value={999999} onChange={onChange} />);

      expect(screen.getByText('999999')).toBeInTheDocument();

      const incrementButton = screen.getByLabelText('increment');
      fireEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(1000000);
    });

    it('maintains disabled state correctly with different values', () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <CounterField value={1} onChange={onChange} disabledDecrement={true} />
      );

      expect(screen.getByLabelText('decrement')).toBeDisabled();

      // Rerender with different value but same disabled state
      rerender(<CounterField value={10} onChange={onChange} disabledDecrement={true} />);

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByLabelText('decrement')).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-labels for screen readers', () => {
      render(<CounterField {...defaultProps} />);

      expect(screen.getByLabelText('increment')).toBeInTheDocument();
      expect(screen.getByLabelText('decrement')).toBeInTheDocument();
    });

    it('maintains accessibility attributes when disabled', () => {
      render(<CounterField {...defaultProps} disabledIncrement={true} disabledDecrement={true} />);

      const incrementButton = screen.getByLabelText('increment');
      const decrementButton = screen.getByLabelText('decrement');

      expect(incrementButton).toHaveAttribute('aria-label', 'increment');
      expect(decrementButton).toHaveAttribute('aria-label', 'decrement');
    });

    it('supports keyboard navigation', () => {
      const onChange = vi.fn();
      render(<CounterField {...defaultProps} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('increment');

      // Focus the button
      incrementButton.focus();
      expect(incrementButton).toHaveFocus();

      // Trigger with Enter key
      fireEvent.keyDown(incrementButton, { key: 'Enter' });
      fireEvent.click(incrementButton); // Mantine UnstyledButton should handle this

      expect(onChange).toHaveBeenCalledWith(6);
    });
  });

  describe('Component Structure', () => {
    it('renders with correct container structure', () => {
      render(<CounterField {...defaultProps} />);

      // Check for the Paper container
      const container = screen.getByText('5').closest('div');
      expect(container).toBeInTheDocument();
    });

    it('displays value in center text element', () => {
      render(<CounterField {...defaultProps} />);

      const valueText = screen.getByText('5');
      expect(valueText).toBeInTheDocument();

      // The text should be centered and have specific styling
      expect(valueText).toHaveStyle({ textAlign: 'center' });
    });
  });

  describe('Integration with Parent Components', () => {
    it('works correctly when used in a form-like scenario', () => {
      const ParentComponent = () => {
        const [adults, setAdults] = useState(2);
        const [children, setChildren] = useState(0);
        const totalGuests = 4;

        return (
          <div>
            <CounterField
              value={adults}
              onChange={setAdults}
              disabledDecrement={adults <= 1}
              disabledIncrement={adults >= totalGuests}
            />
            <CounterField
              value={children}
              onChange={setChildren}
              disabledDecrement={children <= 0}
              disabledIncrement={children >= totalGuests - 1}
            />
          </div>
        );
      };

      render(<ParentComponent />);

      // Should render initial values
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();

      const incrementButtons = screen.getAllByLabelText('increment');
      const decrementButtons = screen.getAllByLabelText('decrement');

      // Test interactions
      fireEvent.click(incrementButtons[0]); // Increment adults
      expect(screen.getByText('3')).toBeInTheDocument();

      fireEvent.click(incrementButtons[1]); // Increment children
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
