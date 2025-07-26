import { render, screen } from '@/tests/utils';
import { PriceDisplay } from './PriceDisplay';
import { expect, describe, it } from 'vitest';

describe('PriceDisplay', () => {
  it('renders price with default currency and suffix', () => {
    render(<PriceDisplay price={150} />);

    // Check for formatted price with 2 decimal places
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('/night')).toBeInTheDocument();
  });

  it('renders with custom currency symbol', () => {
    render(<PriceDisplay price={200} currencySymbol="€" />);

    expect(screen.getByText('€200.00')).toBeInTheDocument();
    expect(screen.getByText('/night')).toBeInTheDocument();
  });

  it('renders with custom suffix', () => {
    render(<PriceDisplay price={300} suffix="/day" />);

    expect(screen.getByText('$300.00')).toBeInTheDocument();
    expect(screen.getByText('/day')).toBeInTheDocument();
  });

  it('formats integer prices with two decimal places', () => {
    render(<PriceDisplay price={99} />);

    expect(screen.getByText('$99.00')).toBeInTheDocument();
  });

  it('rounds decimal prices to two places', () => {
    render(<PriceDisplay price={149.999} />);

    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });

  it('properly structures price and suffix in Group component', () => {
    render(<PriceDisplay price={125} />);

    const priceText = screen.getByText('$125.00');
    const suffixText = screen.getByText('/night');

    // They should be in the same parent component (the Group)
    expect(priceText.parentElement).not.toBeNull();
    expect(priceText.parentElement).toBe(suffixText.parentElement);
  });
});
