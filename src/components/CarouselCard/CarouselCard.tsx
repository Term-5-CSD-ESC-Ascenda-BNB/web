import { AspectRatio, Button, Card, Grid, Group, Image, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconMapPinFilled } from '@tabler/icons-react';
import { RatingStars } from '../RatingStars/RatingStars';
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

  const displayImages = images.length > 0 ? images : ['https://dummyimage.com/400x400/eee/aaa'];
  const slides = displayImages.map((image) => (
    <Carousel.Slide key={image} style={{ cursor: 'pointer' }} onClick={handleCardClick}>
      <AspectRatio ratio={1}>
        <Image src={image} loading="lazy" />
      </AspectRatio>
    </Carousel.Slide>
  ));

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
    </>
  );
}
