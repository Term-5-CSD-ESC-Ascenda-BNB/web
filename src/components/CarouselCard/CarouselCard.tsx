import { Group, Stack, Text } from '@mantine/core';
import { RatingStars } from '../RatingStars/RatingStars';
import { ImageCarousel } from './ImageCarousel';
import { LocationDisplay } from '../LocationDisplay/LocationDisplay';
import classes from './CarouselCard.module.css';

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
        <Stack gap={4}>
          <Text truncate="end" fz="md" lh="sm">
            {name}
          </Text>
          <LocationDisplay address={address} />
          <Group justify="space-between">
            <RatingStars rating={rating} />
          </Group>
        </Stack>

        {/* Price Display */}
        <Group justify="space-between">
          <div>
            <Text fz="xl" span fw={500} className={classes.price}>
              ${(Math.random() * 1000).toFixed(2)}
            </Text>
            <Text span fz="sm" c="dimmed">
              {' '}
              /night
            </Text>
          </div>
        </Group>
      </Stack>
    </Stack>
  );
}
