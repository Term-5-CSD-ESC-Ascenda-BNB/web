import { Group, Stack, Text } from '@mantine/core';
import { LocationDisplay } from '../LocationDisplay/LocationDisplay';
import { RatingStars } from '../RatingStars/RatingStars';
import { ReviewScoreSmall } from '../ReviewScoreSmall/ReviewScoreSmall';
import { PriceDisplay } from './PriceDisplay';

export interface CarouselCardDetailsProps {
  name: string;
  address: string;
  rating: number;
  price: number;
  score: number;
  onClick: () => void;
}

export function CarouselCardDetails({
  name,
  address,
  rating,
  price,
  score,
  onClick,
}: CarouselCardDetailsProps) {
  return (
    <Stack
      style={{ cursor: 'pointer', flex: 1 }}
      onClick={onClick}
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
          <ReviewScoreSmall score={score} />
        </Group>
      </Stack>

      {/* Price Display */}
      <Group justify="space-between">
        <PriceDisplay price={price} />
      </Group>
    </Stack>
  );
}
