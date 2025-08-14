import { Group, Stack, Text, Tooltip } from '@mantine/core';
import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
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

// --- helpers: keep types intact while scaling numbers ---
function scaleTrustYouScore(t?: TrustYouScore): TrustYouScore | undefined {
  if (!t) return t;
  const src = t.score; // type: { [k: string]: number | null | undefined; overall?: number | null } | undefined
  let scaledScore = src;
  if (src) {
    const out: typeof src = {};
    for (const [k, v] of Object.entries(src)) {
      out[k] = typeof v === 'number' ? v / 10 : v; // preserve null/undefined
    }
    scaledScore = out;
  }
  return { ...t, score: scaledScore };
}

function scaleAmenityRatings(ratings: AmenityRating[]): AmenityRating[] {
  return ratings.map((r) => ({
    ...r,
    // guard in case r.score is unioned or nullable in your types
    score: typeof r.score === 'number' ? r.score / 10 : r.score,
  }));
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
  const scaledTrustYou = scaleTrustYouScore(trustyou);
  const scaledRatings = scaleAmenityRatings(ratings);
  const hasTrustYouScore = typeof trustyouScore === 'number' && !Number.isNaN(trustyouScore);

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

        {hasTrustYouScore && (
          <Tooltip label="Click to view guest review breakdown" position="top" withArrow>
            <Stack
              data-testid="reviews-trigger"
              align="center"
              gap={4}
              style={{ cursor: 'pointer' }}
              onClick={() => setModalOpen(true)}
            >
              {/* divide by 10 only if numeric */}
              <ReviewScoreLarge score={(trustyouScore) / 10} />
              <Text size="xs" c="dimmed">
                Guest Reviews
              </Text>
            </Stack>
          </Tooltip>
        )}
      </Group>

      <HotelReviews
        trustyou={scaledTrustYou}
        ratings={scaledRatings}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
