import { IconStarFilled } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './CarouselCard.module.css';

export interface CarouselCardProps {
  id: string;
  name: string;
  description: string;
  rating: number;
  images: string[];
}

// TODO: Add a link to the hotel details page
// This is temporary, the ID is still needed later to click into the hotel details page
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CarouselCard({ id, name, description, rating, images }: CarouselCardProps) {
  const displayImages = images.length > 0 ? images : ['https://dummyimage.com/600x400/eee/aaa'];
  const slides = displayImages.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} width={220} loading="lazy" />
    </Carousel.Slide>
  ));

  return (
    <Card
      radius="md"
      withBorder
      padding="lg"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Card.Section>
        <Carousel
          withIndicators
          emblaOptions={{ loop: true }}
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
          height={220}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fz="md">{name}</Text>

        <Group gap={5}>
          <IconStarFilled size={16} color="var(--mantine-color-yellow-6)" />
          <Text fz="sm" fw={600}>
            {rating}
          </Text>
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm" style={{ flex: 1 }}>
        {description && description.length > 150
          ? description.slice(0, 150) + '…'
          : description || ''}
      </Text>

      <Group justify="space-between" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            397$
          </Text>
          <Text span fz="sm" c="dimmed">
            {' '}
            / night
          </Text>
        </div>

        <Button radius="md">Book now</Button>
      </Group>
    </Card>
  );
}
