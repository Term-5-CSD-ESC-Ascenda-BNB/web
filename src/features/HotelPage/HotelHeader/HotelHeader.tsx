import { Group, Stack, Text, Tooltip } from '@mantine/core';
import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
// import { SaveButton } from '@/components/SaveButton/SaveButton';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { HotelReviews } from '@/features/HotelPage/HotelReviews/HotelReviews';
import type { TrustYouScore, AmenityRating } from '@/types/HotelDetails';
interface HotelHeaderProps {
  name: string;
  address: string;
  rating: number;
  trustyouScore?: number | null;
  trustyou?: TrustYouScore;
  ratings: AmenityRating[];
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}
export function HotelHeader({
  name,
  address,
  rating,
  trustyouScore,
  trustyou,
  ratings,
  modalOpen,
  setModalOpen,
}: HotelHeaderProps) {
  return (
    <>
      <Group justify="space-between" align="stretch">
        <Stack gap="xs">
          <Text fz="h2" data-testid="hotel-title">
            {name}
          </Text>
          <RatingStars rating={rating} size={24} />
          <LocationDisplay address={address} fontSize="md" />
          <Group gap="xs">
            <ShareButton width={120} />
            {/* <SaveButton width={120} /> */}
          </Group>
        </Stack>
        {trustyouScore && (
          <Tooltip label="Click to view guest review breakdown" position="top" withArrow>
            <Stack
              data-testid="reviews-trigger"
              align="center"
              gap={4}
              style={{ cursor: 'pointer' }}
              onClick={() => setModalOpen(true)}
            >
              <ReviewScoreLarge score={trustyouScore} />
              <Text size="xs" c="dimmed">
                Guest Reviews
              </Text>
            </Stack>
          </Tooltip>
        )}
      </Group>
      <HotelReviews
        trustyou={trustyou}
        ratings={ratings}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
