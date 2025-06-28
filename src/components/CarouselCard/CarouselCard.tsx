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
}

export function CarouselCard({ id, name, address, rating, images }: CarouselCardProps) {
  const handleCardClick = () => {
    // TODO: Add a link to the hotel details page
    console.log(`Clicked on hotel: ${id}`);
  };

  // TODO: Replace with actual price data

  const randomPrice = Math.random() * 1000;

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
            <ReviewScoreSmall score={rating} />
          </Group>
        </Stack>

        {/* Price Display */}
        <Group justify="space-between">
          <PriceDisplay price={randomPrice} />
        </Group>
      </Stack>
    </Stack>
  );
}
