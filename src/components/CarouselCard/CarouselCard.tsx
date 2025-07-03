import { Group, Stack, Text } from '@mantine/core';
import { ImageCarousel } from './ImageCarousel';
import { LocationDisplay } from '../LocationDisplay/LocationDisplay';
import { RatingStars } from '../RatingStars/RatingStars';
import { ReviewScoreSmall } from '../ReviewScoreSmall/ReviewScoreSmall';
import { PriceDisplay } from './PriceDisplay';

export interface CarouselCardProps {
  id: string;
  name: string;
  address: string;
  rating: number;
  images: string[];
  price: number;
}

export function CarouselCard({ id, name, address, rating, images, price }: CarouselCardProps) {
  const handleCardClick = () => {
    // TODO: Add a link to the hotel details page
    console.log(`Clicked on hotel: ${id}`);
  };

  // TODO: Replace with actual review score data
  const randomScore = Math.floor(Math.random() * 10) + 1;

  return (
    <Stack gap="xs">
      <ImageCarousel images={images} onImageClick={handleCardClick} />

      <Stack
        style={{ cursor: 'pointer', flex: 1 }}
        onClick={handleCardClick}
        role="button"
        justify="space-between"
        gap="sm"
      >
        {/* Hotel Details */}
        <Stack gap={2}>
          <Text truncate="end" fz="md" lh="sm">
            {name}
          </Text>
          <LocationDisplay address={address} />
          <Group justify="space-between">
            <RatingStars rating={rating} showEmpty={false} size={20} />
            <ReviewScoreSmall score={randomScore} />
          </Group>
        </Stack>

        {/* Price Display */}
        <Group justify="space-between">
          <PriceDisplay price={price} />
        </Group>
      </Stack>
    </Stack>
  );
}
