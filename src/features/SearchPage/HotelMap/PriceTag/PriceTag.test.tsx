import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { PriceTag } from './PriceTag';

describe('PriceTag (presentational)', () => {
  it('renders default currency and price', () => {
    render(<PriceTag price={100} />);
    const tag = screen.getByText('$100');
    expect(tag).toBeInTheDocument();
  });

  it('renders custom currency and price', () => {
    render(<PriceTag price={200} currency="€" />);
    const tag = screen.getByText('€200');
    expect(tag).toBeInTheDocument();
  });

  it('renders correctly and matches snapshot', () => {
    const { container } = render(<PriceTag price={150} />);
    expect(container).toMatchSnapshot();
  });
});
