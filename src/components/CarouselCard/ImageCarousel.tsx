import { AspectRatio, Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: string[];
  onImageClick?: () => void;
  aspectRatio?: number;
  fallbackImage?: string;
}

export function ImageCarousel({
  images,
  onImageClick,
  aspectRatio = 1,
  fallbackImage = './placeholder.png',
}: ImageCarouselProps) {
  const displayImages = images.length > 0 ? images : [fallbackImage];

  const slides = displayImages.map((image) => (
    <Carousel.Slide
      key={image}
      style={{ cursor: onImageClick ? 'pointer' : 'default' }}
      onClick={onImageClick}
    >
      <AspectRatio ratio={aspectRatio}>
        <Image src={image} loading="lazy" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  return (
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
  );
}
