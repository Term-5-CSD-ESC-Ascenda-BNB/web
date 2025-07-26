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
  score: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function CarouselCard({
  id,
  name,
  address,
  rating,
  images,
  price,
  score,
  onMouseEnter,
  onMouseLeave,
}: CarouselCardProps) {
  const handleCardClick = () => {
    window.location.href = `/hotels/${id}`;
  };

  return (
    <Stack
      gap="xs"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="carousel-card"
    >
      <div style={{ borderRadius: 'var(--mantine-radius-lg)', overflow: 'hidden' }}>
        <ImageCarousel images={images} onImageClick={handleCardClick} />
      </div>

      <CarouselCardDetails
        name={name}
        address={address}
        rating={rating}
        price={price}
        score={score}
        onClick={handleCardClick}
      />
    </Stack>
  );
}
