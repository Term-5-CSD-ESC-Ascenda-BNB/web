import { Modal, Stack, Group, Text, Divider, Tooltip } from '@mantine/core';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { ReviewScoreSub } from '@/components/ReviewScoreSub/ReviewScoreSub';
import { getReviewIcon } from '@/utils/getReviewIcon';
import type { TrustYouScore, AmenityRating } from '@/types/HotelDetails';

interface HotelReviewsProps {
  trustyou?: TrustYouScore;
  ratings: AmenityRating[];
  opened: boolean;
  onClose: () => void;
}

const ratingLabels = [
  'Location',
  'Service',
  'Room',
  'WiFi',
  'Breakfast',
  'Food',
  'Comfort',
  'Vibe',
];

export function HotelReviews({ trustyou, ratings, opened, onClose }: HotelReviewsProps) {
  // Divide category scores by 10
  const mappedRatings = ratingLabels
    .map((label) => {
      const entry = ratings.find((r) => r.name === label);
      return entry
        ? {
            label: entry.name,
            score: typeof entry.score === 'number' ? entry.score / 10 : entry.score,
          }
        : null;
    })
    .filter(Boolean) as { label: string; score: number }[];

  // Divide traveler scores by 10
  const travelerScores = [
    { label: 'Solo', score: trustyou?.score?.solo },
    { label: 'Couple', score: trustyou?.score?.couple },
    { label: 'Family', score: trustyou?.score?.family },
    { label: 'Business', score: trustyou?.score?.business },
  ]
    .filter((t) => typeof t.score === 'number')
    .map((t) => ({
      ...t,
      score: (t.score as number) / 10,
    }));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Guest Reviews"
      centered
      size="1500px"
      radius="md"
    >
      <Stack align="center" mb="md" gap={4}>
        {/* Divide overall score by 10 */}
        <ReviewScoreLarge score={(trustyou?.score?.overall ?? 0) / 10} />
        <Text fz="md" c="dimmed">
          Overall Rating
        </Text>
      </Stack>

      <Divider my="lg" label="Traveler Type Ratings" labelPosition="center" />

      <Group wrap="wrap" justify="center" gap="xl">
        {travelerScores.map(({ label, score }) => (
          <Stack key={label} align="center" gap={6}>
            <Tooltip label={`Score for ${label}`} position="top" withArrow>
              <ReviewScoreSub score={score} size={88} color="#564f7d" />
            </Tooltip>
            <Group align="center" gap={4}>
              {getReviewIcon(label)}
              <Text fz="md">{label}</Text>
            </Group>
          </Stack>
        ))}
      </Group>

      <Divider my="lg" label="Category Scores" labelPosition="center" />

      <Group wrap="wrap" justify="center" gap="xl">
        {mappedRatings.map(({ label, score }) => (
          <Stack key={label} align="center" gap={6}>
            <Tooltip label={`Score for ${label}`} position="top" withArrow>
              <ReviewScoreSub score={score} size={88} color="#564f7d" />
            </Tooltip>
            <Group align="center" gap={4}>
              {getReviewIcon(label)}
              <Text fz="md">{label}</Text>
            </Group>
          </Stack>
        ))}
      </Group>
    </Modal>
  );
}
