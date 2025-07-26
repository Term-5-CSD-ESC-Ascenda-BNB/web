import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { CancellationPolicyCard } from './CancellationPolicyCard';

describe('CancellationPolicyCard', () => {
  const props = {
    currency: '$',
    fee: 50,
  };

  it('renders the cancellation policy title', () => {
    render(<CancellationPolicyCard {...props} />);
    expect(screen.getByText('Cancellation Policy')).toBeInTheDocument();
  });

  it('displays the cancellation fee with currency and space', () => {
    render(<CancellationPolicyCard {...props} />);
    expect(screen.getByText('Cancellation fee: $50')).toBeInTheDocument();
  });

  it('renders the full cancellation policy description', () => {
    render(<CancellationPolicyCard {...props} />);

    expect(
      screen.getByText(
        /This booking cannot be modified, and no refund will be given if you cancel it/
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/a penalty equivalent to the cancellation fee will be charged/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/the cancellation fee will be based on the total you paid/)
    ).toBeInTheDocument();
  });
});
