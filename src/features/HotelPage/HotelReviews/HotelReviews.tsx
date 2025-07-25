import { Box, Group, Stack, Text } from '@mantine/core';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { ReviewScoreSub } from '@/components/ReviewScoreSub/ReviewScoreSub';
import type { TrustYouScore, AmenityRating } from '@/types/Hotel';

interface HotelReviewsProps {
  trustyou?: TrustYouScore;
  ratings: AmenityRating[];
}

const ratingLabels = ['Location', 'Service', 'Room', 'WiFi', 'Breakfast', 'Food', 'Comfort'];

export function HotelReviews({ trustyou, ratings }: HotelReviewsProps) {
  const mappedRatings = ratingLabels
    .map((label) => {
      const entry = ratings.find((r) => r.name === label);
      return entry ? { label: entry.name, score: entry.score / 10 } : null;
    })
    .filter(Boolean) as { label: string; score: number }[];

  return (
    <Box mt="xl">
      <Text fz="h2" mb="sm">
        Guest Reviews
      </Text>

      <Group align="center" wrap="nowrap" gap="xl" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Stack align="center" gap={4}>
          <ReviewScoreLarge score={trustyou?.score?.overall ?? 0} />
          <Text fz="sm">Verified Reviews</Text>
        </Stack>

        <Group justify="space-between" gap="xl" style={{ flexGrow: 1 }}>
          {mappedRatings.map(({ label, score }) => (
            <Stack key={label} align="center" gap={4}>
              <ReviewScoreSub score={score} />
              <Text fz="xs" style={{ color: '#000' }}>
                {label}
              </Text>
            </Stack>
          ))}
        </Group>
      </Group>
    </Box>
  );
}
