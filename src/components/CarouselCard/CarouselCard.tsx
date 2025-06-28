import { Group, Stack, Text } from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';
import { RatingStars } from '../RatingStars/RatingStars';
import { ImageCarousel } from './ImageCarousel';
import classes from './CarouselCard.module.css';

export interface CarouselCardProps {
  id: string;
  name: string;
  address: string;
  rating: number;
  images: string[];
}

// TODO: Add a link to the hotel details page
// This is temporary, the ID is still needed later to click into the hotel details page
export function CarouselCard({ id, name, address, rating, images }: CarouselCardProps) {
  // Handler for card click - will link to hotel details page in the future
  const handleCardClick = () => {
    console.log(`Clicked on hotel: ${id}`);
    // TODO: hotel details page implement
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ImageCarousel images={images} onImageClick={handleCardClick} />

      <Stack
        style={{ cursor: 'pointer', flex: 1 }}
        onClick={handleCardClick}
        role="button"
        justify="space-between"
        gap="sm"
      >
        <Stack gap={4} mt="xs">
          <Text truncate="end" style={{ lineHeight: 'normal' }} size="md">
            {name}
          </Text>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px' }}>
            <div>
              <IconMapPinFilled size={16} color="var(--mantine-color-red-6)" />
            </div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Text fz="sm" c="dimmed" truncate="end">
                {address}
              </Text>
            </div>
          </div>

          <Group justify="space-between">
            <RatingStars rating={rating} />
          </Group>
        </Stack>

        <Group justify="space-between">
          <div>
            <Text fz="xl" span fw={500} className={classes.price}>
              ${(Math.random() * 1000).toFixed(2)}
            </Text>
            <Text span fz="sm" c="dimmed">
              {' '}
              / night
            </Text>
          </div>
        </Group>
      </Stack>
    </div>
  );
}
