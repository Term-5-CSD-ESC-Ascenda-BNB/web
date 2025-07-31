import { render } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { CarouselCardSkeleton } from './CarouselCardSkeleton';

describe('CarouselCardSkeleton (presentational)', () => {
  it('renders without crashing and matches snapshot', () => {
    const { container } = render(<CarouselCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
