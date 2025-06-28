import { AspectRatio, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './CarouselCard.module.css';

interface ImageCarouselProps {
  images: string[];
  onImageClick?: () => void;
  fallbackImage?: string;
}

export function ImageCarousel({
  images,
  onImageClick,
  fallbackImage = 'https://dummyimage.com/400x400/eee/aaa',
}: ImageCarouselProps) {
  const displayImages = images.length > 0 ? images : [fallbackImage];

  const slides = displayImages.map((image) => (
    <Carousel.Slide
      key={image}
      style={{ cursor: onImageClick ? 'pointer' : 'default' }}
      onClick={onImageClick}
    >
      <AspectRatio ratio={1}>
        <Image src={image} loading="lazy" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  return (
    <div style={{ borderRadius: 'var(--mantine-radius-lg)', overflow: 'hidden' }}>
      <Carousel
        withIndicators
        emblaOptions={{ loop: true }}
        classNames={{
          root: classes.carousel,
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
        }}
      >
        {slides}
      </Carousel>
    </div>
  );
}
