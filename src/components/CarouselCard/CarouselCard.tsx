import { Stack } from '@mantine/core';
import { ImageCarousel } from './ImageCarousel';
import { CarouselCardDetails } from './CarouselCardDetails';

export interface CarouselCardProps {
  id: string;
  name: string;
  address: string;
  rating: number;
  images: string[];
  price: number;
  score: number;
}

export function CarouselCard({
  id,
  name,
  address,
  rating,
  images,
  price,
  score,
}: CarouselCardProps) {
  const handleCardClick = () => {
    // TODO: Add a link to the hotel details page
    console.log(`Clicked on hotel: ${id}`);
  };

  return (
    <Stack gap="xs">
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
