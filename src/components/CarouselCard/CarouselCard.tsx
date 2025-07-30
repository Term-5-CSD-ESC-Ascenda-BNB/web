import { Stack } from '@mantine/core';
import { ImageCarousel } from './ImageCarousel';
import { CarouselCardDetails } from './CarouselCardDetails/CarouselCardDetails';

export interface CarouselCardProps {
  id: string;
  name: string;
  address: string;
  rating: number;
  images: string[];
  price: number;
  score: number | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function CarouselCard({
  name,
  address,
  rating,
  images,
  price,
  score,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: CarouselCardProps) {
  return (
    <Stack
      gap="xs"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="carousel-card"
    >
      <div style={{ borderRadius: 'var(--mantine-radius-lg)', overflow: 'hidden' }}>
        <ImageCarousel images={images} onImageClick={onClick} />
      </div>

      <CarouselCardDetails
        name={name}
        address={address}
        rating={rating}
        price={price}
        score={score}
        onClick={onClick}
      />
    </Stack>
  );
}
