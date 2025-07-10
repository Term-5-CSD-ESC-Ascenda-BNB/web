import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { Group, Stack, Text } from '@mantine/core';

interface HotelDetailsProps {
  name: string;
  starRating: number;
  address: string;
  reviewScore: number;
}

export function HotelDetails({ name, starRating, address, reviewScore }: HotelDetailsProps) {
  return (
    <>
      <Group justify="space-between" align="stretch">
        <Stack gap={'xs'}>
          <Text fz={'h2'}>{name}</Text>
          <RatingStars rating={starRating} size={24} />
          <LocationDisplay address={address} fontSize={'md'} />
          {/* // TODO: Share/Save buttons */}
        </Stack>

        <ReviewScoreLarge score={reviewScore} />
      </Group>
    </>
  );
}
