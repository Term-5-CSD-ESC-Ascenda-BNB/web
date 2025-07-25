import { Group, Stack, Text } from '@mantine/core';
import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
import { SaveButton } from '@/components/SaveButton/SaveButton';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';

interface HotelHeaderProps {
  name: string;
  address: string;
  rating: number;
  trustyouScore?: number;
}

export function HotelHeader({ name, address, rating, trustyouScore }: HotelHeaderProps) {
  return (
    <Group justify="space-between" align="stretch">
      <Stack gap="xs">
        <Text fz="h2">{name}</Text>
        <RatingStars rating={rating} size={24} />
        <LocationDisplay address={address} fontSize="md" />
        <Group gap="xs">
          <ShareButton width={120} />
          <SaveButton width={120} />
        </Group>
      </Stack>

      {trustyouScore && <ReviewScoreLarge score={trustyouScore} />}
    </Group>
  );
}
