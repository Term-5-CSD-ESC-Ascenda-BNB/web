// CarouselCard.test.tsx
import { render, screen, fireEvent, userEvent } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CarouselCard } from './CarouselCard';

vi.mock('./ImageCarousel', () => ({
  ImageCarousel: ({ images, onImageClick }: { images: string[]; onImageClick: () => void }) => (
    <button data-testid="image-carousel" onClick={onImageClick}>
      {`Images: ${images.join(',')}`}
    </button>
  ),
}));

vi.mock('./CarouselCardDetails/CarouselCardDetails', () => ({
  CarouselCardDetails: ({
    name,
    address,
    rating,
    price,
    score,
    onClick,
  }: {
    name: string;
    address: string;
    rating: number;
    price: number;
    score: number;
    onClick: () => void;
  }) => (
    <div data-testid="card-details" onClick={onClick}>
      <span>{name}</span>
      <span>{address}</span>
      <span>{rating}</span>
      <span>{price}</span>
      <span>{score}</span>
    </div>
  ),
}));

describe('CarouselCard', () => {
  const defaultProps = {
    id: 'hotel-123',
    name: 'Test Hotel',
    address: '123 Test Street',
    rating: 4.2,
    imageDetails: {
      prefix: 'https://example.com/images/',
      count: 3,
      suffix: '.jpg',
    },
    price: 250,
    score: 8.7,
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
    onClick: vi.fn(
      () => (window.location.href = '/hotels/hotel-123') // Mock navigation
    ),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ImageCarousel with the provided images', () => {
    render(<CarouselCard {...defaultProps} />);
    expect(screen.getByTestId('image-carousel')).toHaveTextContent(
      'Images: https://example.com/images/0.jpg,https://example.com/images/1.jpg,https://example.com/images/2.jpg'
    );
  });

  it('calls onMouseEnter and onMouseLeave when hovered', async () => {
    const user = userEvent.setup();

    render(<CarouselCard {...defaultProps} />);
    const card = screen.getByTestId('carousel-card');

    await user.hover(card);
    expect(defaultProps.onMouseEnter).toHaveBeenCalledTimes(1);

    await user.unhover(card);
    expect(defaultProps.onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('navigates to the hotel detail page when ImageCarousel is clicked', () => {
    // @ts-expect-error: window.location is being deleted to mock navigation in test
    delete window.location;
    // @ts-expect-error: window.location is being deleted to mock navigation in test
    window.location = { href: '' };

    render(<CarouselCard {...defaultProps} />);
    fireEvent.click(screen.getByTestId('image-carousel'));
    expect(window.location.href).toBe('/hotels/hotel-123');
  });

  it('renders CarouselCardDetails with correct props and navigates on click', () => {
    // @ts-expect-error: window.location is being deleted to mock navigation in test
    delete window.location;
    // @ts-expect-error: window.location is being deleted to mock navigation in test
    window.location = { href: '' };

    render(<CarouselCard {...defaultProps} />);
    const details = screen.getByTestId('card-details');
    expect(details).toHaveTextContent('Test Hotel');
    expect(details).toHaveTextContent('123 Test Street');
    expect(details).toHaveTextContent('4.2');
    expect(details).toHaveTextContent('250');
    expect(details).toHaveTextContent('8.7');

    fireEvent.click(details);
    expect(window.location.href).toBe('/hotels/hotel-123');
  });
});
