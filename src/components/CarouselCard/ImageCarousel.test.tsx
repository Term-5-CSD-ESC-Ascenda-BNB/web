import { render, screen } from '@/tests/utils';
import { ImageCarousel } from './ImageCarousel';
import { expect, describe, it, vi } from 'vitest';

// Mock the Carousel.Slide component
vi.mock('@mantine/carousel', () => {
  const CarouselSlide = ({
    children,
    onClick,
    style,
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
  }) => (
    <div data-testid="carousel-slide" onClick={onClick} style={style}>
      {children}
    </div>
  );

  const CarouselComponent = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-component">{children}</div>
  );

  CarouselComponent.Slide = CarouselSlide;

  return {
    Carousel: CarouselComponent,
  };
});

// Mock the Image component
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual<typeof import('@mantine/core')>('@mantine/core');

  return {
    ...actual,
    AspectRatio: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="aspect-ratio">{children}</div>
    ),
    Image: ({ src }: { src: string }) => (
      <img data-testid="carousel-image" src={src} alt="carousel item" />
    ),
  };
});

describe('ImageCarousel', () => {
  it('renders correct number of slides for provided images', () => {
    const testImages = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];

    render(<ImageCarousel images={testImages} />);

    // Check if we have the correct number of slides
    const slides = screen.getAllByTestId('carousel-slide');
    expect(slides).toHaveLength(2);

    // Check if images are rendered with correct sources
    const images = screen.getAllByTestId('carousel-image');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', testImages[0]);
    expect(images[1]).toHaveAttribute('src', testImages[1]);
  });

  it('uses fallback image when no images are provided', () => {
    render(<ImageCarousel images={[]} />);

    const slides = screen.getAllByTestId('carousel-slide');
    const images = screen.getAllByTestId('carousel-image');

    expect(slides).toHaveLength(1);
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', './placeholder.png');
  });

  it('uses custom fallback image when provided', () => {
    const customFallback = 'https://example.com/custom-fallback.jpg';
    render(<ImageCarousel images={[]} fallbackImage={customFallback} />);

    const images = screen.getAllByTestId('carousel-image');
    expect(images[0]).toHaveAttribute('src', customFallback);
  });

  it('calls onImageClick when slide is clicked', () => {
    const handleClick = vi.fn();
    const testImages = ['https://example.com/image1.jpg'];

    render(<ImageCarousel images={testImages} onImageClick={handleClick} />);

    const slide = screen.getByTestId('carousel-slide');
    slide.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies pointer cursor when onImageClick is provided', () => {
    const handleClick = vi.fn();
    render(<ImageCarousel images={['https://example.com/image.jpg']} onImageClick={handleClick} />);

    const slide = screen.getByTestId('carousel-slide');
    expect(slide).toHaveStyle('cursor: pointer');
  });

  it('applies default cursor when onImageClick is not provided', () => {
    render(<ImageCarousel images={['https://example.com/image.jpg']} />);

    const slide = screen.getByTestId('carousel-slide');
    expect(slide).toHaveStyle('cursor: default');
  });
});
