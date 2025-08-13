import { render, screen, fireEvent, waitFor } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from '@mantine/form';
import GuestInfoForm from './GuestInfoForm';

// Mock the CounterField component
vi.mock('./CounterField', () => ({
  CounterField: ({
    value,
    onChange,
    disabledDecrement,
    disabledIncrement,
  }: {
    value: number;
    onChange: (val: number) => void;
    disabledDecrement?: boolean;
    disabledIncrement?: boolean;
  }) => (
    <div data-testid="counter-field">
      <button
        data-testid="decrement"
        onClick={() => onChange(value - 1)}
        disabled={disabledDecrement}
      >
        -
      </button>
      <span data-testid="counter-value">{value}</span>
      <button
        data-testid="increment"
        onClick={() => onChange(value + 1)}
        disabled={disabledIncrement}
      >
        +
      </button>
    </div>
  ),
}));

// Helper component to test GuestInfoForm with form context
const TestWrapper = ({ guests = 4, initialValues = {} }) => {
  const guestInfo = useForm({
    initialValues: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: 'sg',
      phone: '',
      specialRequests: '',
      adults: guests,
      children: 0,
      ...initialValues,
    },
    validate: {
      salutation: (value) => (value ? null : 'Required'),
      firstName: (value) => (value ? null : 'Required'),
      lastName: (value) => (value ? null : 'Required'),
      countryCode: (value) => (value ? null : 'Required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value ? null : 'Required'),
    },
  });

  return <GuestInfoForm guestInfo={guestInfo} guests={guests} />;
};

describe('GuestInfoForm', () => {
  describe('Rendering', () => {
    it('renders all form fields correctly', () => {
      render(<TestWrapper />);

      expect(screen.getByText('Guest Info')).toBeInTheDocument();
      expect(
        screen.getByText('Guest names must match the valid ID which will be used at check-in')
      ).toBeInTheDocument();

      // Form fields
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();

      // Special requests section
      expect(screen.getByText('Special Requests')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/Special requests can't be guaranteed/)
      ).toBeInTheDocument();

      // Counter fields
      expect(screen.getByText('Adults:')).toBeInTheDocument();
      expect(screen.getByText('Children:')).toBeInTheDocument();
    });

    it('renders country code dropdown with correct default', () => {
      render(<TestWrapper />);

      // Should default to Singapore
      expect(screen.getByText('SG +65')).toBeInTheDocument();
    });

    it('displays correct initial guest counts', () => {
      render(<TestWrapper guests={6} />);

      const counterValues = screen.getAllByTestId('counter-value');
      expect(counterValues[0]).toHaveTextContent('6'); // adults
      expect(counterValues[1]).toHaveTextContent('0'); // children
    });
  });

  describe('Form Input Interactions', () => {
    it('updates form values when user types in text inputs', () => {
      render(<TestWrapper />);

      const firstNameInput = screen.getByPlaceholderText('First Name');
      const lastNameInput = screen.getByPlaceholderText('Last Name');
      const emailInput = screen.getByPlaceholderText('Email');
      const phoneInput = screen.getByPlaceholderText('Phone Number');

      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(phoneInput, { target: { value: '12345678' } });

      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(phoneInput).toHaveValue('12345678');
    });

    it('updates country code when dropdown option is selected', async () => {
      render(<TestWrapper />);

      const countrySelect = screen.getByText('SG +65');
      fireEvent.click(countrySelect);

      const usOption = screen.getByText('USA +1');
      fireEvent.click(usOption);

      await waitFor(() => {
        expect(screen.getByText('USA +1')).toBeInTheDocument();
      });
    });

    it('updates special requests textarea', () => {
      render(<TestWrapper />);

      const textarea = screen.getByPlaceholderText(/Special requests can't be guaranteed/);
      fireEvent.change(textarea, { target: { value: 'Late check-in please' } });

      expect(textarea).toHaveValue('Late check-in please');
    });
  });

  describe('Guest Count Logic', () => {
    it('correctly distributes guests between adults and children', () => {
      render(<TestWrapper guests={4} />);

      const adultCounters = screen.getAllByTestId('counter-field')[0];
      const childCounters = screen.getAllByTestId('counter-field')[1];

      // Initial state: 4 adults, 0 children
      expect(adultCounters.querySelector('[data-testid="counter-value"]')).toHaveTextContent('4');
      expect(childCounters.querySelector('[data-testid="counter-value"]')).toHaveTextContent('0');

      // Decrease adults by 1
      const decrementAdults = adultCounters.querySelector('[data-testid="decrement"]');
      fireEvent.click(decrementAdults!);

      // Should now be 3 adults, 1 child
      expect(adultCounters.querySelector('[data-testid="counter-value"]')).toHaveTextContent('3');
      expect(childCounters.querySelector('[data-testid="counter-value"]')).toHaveTextContent('1');
    });

    it('prevents adults from going below 1', () => {
      render(<TestWrapper guests={2} initialValues={{ adults: 1, children: 1 }} />);

      const adultCounters = screen.getAllByTestId('counter-field')[0];
      const decrementButton = adultCounters.querySelector('[data-testid="decrement"]');

      expect(decrementButton).toBeDisabled();
    });

    it('prevents children from going below 0', () => {
      render(<TestWrapper guests={2} initialValues={{ adults: 2, children: 0 }} />);

      const childCounters = screen.getAllByTestId('counter-field')[1];
      const decrementButton = childCounters.querySelector('[data-testid="decrement"]');

      expect(decrementButton).toBeDisabled();
    });

    it('prevents adults from exceeding total guests', () => {
      render(<TestWrapper guests={3} initialValues={{ adults: 3, children: 0 }} />);

      const adultCounters = screen.getAllByTestId('counter-field')[0];
      const incrementButton = adultCounters.querySelector('[data-testid="increment"]');

      expect(incrementButton).toBeDisabled();
    });

    it('prevents children from exceeding guest limit (guests - 1 adult minimum)', () => {
      render(<TestWrapper guests={3} initialValues={{ adults: 1, children: 2 }} />);

      const childCounters = screen.getAllByTestId('counter-field')[1];
      const incrementButton = childCounters.querySelector('[data-testid="increment"]');

      expect(incrementButton).toBeDisabled();
    });

    it('updates children count when adults are increased', () => {
      render(<TestWrapper guests={4} initialValues={{ adults: 2, children: 2 }} />);

      const adultCounters = screen.getAllByTestId('counter-field')[0];
      const incrementButton = adultCounters.querySelector('[data-testid="increment"]');

      fireEvent.click(incrementButton!);

      // Should now be 3 adults, 1 child
      expect(adultCounters.querySelector('[data-testid="counter-value"]')).toHaveTextContent('3');
      expect(
        screen.getAllByTestId('counter-field')[1].querySelector('[data-testid="counter-value"]')
      ).toHaveTextContent('1');
    });

    it('updates adults count when children are increased', () => {
      render(<TestWrapper guests={4} initialValues={{ adults: 3, children: 1 }} />);

      const childCounters = screen.getAllByTestId('counter-field')[1];
      const incrementButton = childCounters.querySelector('[data-testid="increment"]');

      fireEvent.click(incrementButton!);

      // Should now be 2 adults, 2 children
      expect(
        screen.getAllByTestId('counter-field')[0].querySelector('[data-testid="counter-value"]')
      ).toHaveTextContent('2');
      expect(childCounters.querySelector('[data-testid="counter-value"]')).toHaveTextContent('2');
    });
  });

  describe('Country Code Options', () => {
    it('displays all available country codes in dropdown', () => {
      render(<TestWrapper />);

      const countrySelect = screen.getByText('SG +65');
      fireEvent.click(countrySelect);

      // Check for some key country codes
      expect(screen.getByText('USA +1')).toBeInTheDocument();
      expect(screen.getByText('UK +44')).toBeInTheDocument();
      expect(screen.getByText('Australia +61')).toBeInTheDocument();
      expect(screen.getByText('China +86')).toBeInTheDocument();
      expect(screen.getByText('Malaysia +60')).toBeInTheDocument();
    });

    it('selects different country codes correctly', async () => {
      render(<TestWrapper />);

      const countrySelect = screen.getByText('SG +65');
      fireEvent.click(countrySelect);

      const australiaOption = screen.getByText('Australia +61');
      fireEvent.click(australiaOption);

      await waitFor(() => {
        expect(screen.getByText('Australia +61')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles single guest scenario correctly', () => {
      render(<TestWrapper guests={1} initialValues={{ adults: 1, children: 0 }} />);

      const adultCounters = screen.getAllByTestId('counter-field')[0];
      const childCounters = screen.getAllByTestId('counter-field')[1];

      // Adults decrement should be disabled (can't go below 1)
      expect(adultCounters.querySelector('[data-testid="decrement"]')).toBeDisabled();

      // Adults increment should be disabled (already at max)
      expect(adultCounters.querySelector('[data-testid="increment"]')).toBeDisabled();

      // Children increment and decrement should be disabled
      expect(childCounters.querySelector('[data-testid="increment"]')).toBeDisabled();
      expect(childCounters.querySelector('[data-testid="decrement"]')).toBeDisabled();
    });

    it('handles large guest numbers correctly', () => {
      render(<TestWrapper guests={10} />);

      expect(
        screen.getAllByTestId('counter-field')[0].querySelector('[data-testid="counter-value"]')
      ).toHaveTextContent('10');
      expect(
        screen.getAllByTestId('counter-field')[1].querySelector('[data-testid="counter-value"]')
      ).toHaveTextContent('0');
    });

    it('maintains form state when guest numbers change', () => {
      render(<TestWrapper guests={4} />);

      // Fill in some form data
      const firstNameInput = screen.getByPlaceholderText('First Name');
      fireEvent.change(firstNameInput, { target: { value: 'John' } });

      // Change guest distribution
      const adultCounters = screen.getAllByTestId('counter-field')[0];
      const decrementButton = adultCounters.querySelector('[data-testid="decrement"]');
      fireEvent.click(decrementButton!);

      // Form data should still be there
      expect(firstNameInput).toHaveValue('John');
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels and structure', () => {
      render(<TestWrapper />);

      expect(screen.getByText('Guest Info')).toBeInTheDocument();
      expect(screen.getByText('Adults:')).toBeInTheDocument();
      expect(screen.getByText('Children:')).toBeInTheDocument();
      expect(screen.getByText('Special Requests')).toBeInTheDocument();
    });

    it('maintains focus management correctly', () => {
      render(<TestWrapper />);

      const firstNameInput = screen.getByPlaceholderText('First Name');
      firstNameInput.focus();

      expect(firstNameInput).toHaveFocus();
    });
  });

  describe('Form Integration', () => {
    it('works with mantine form validation context', () => {
      // This test verifies the component works with the form context
      // The actual validation logic is tested in the parent component
      render(<TestWrapper />);

      // Component should render without errors when provided with form context
      expect(screen.getByText('Guest Info')).toBeInTheDocument();
    });
  });
});
