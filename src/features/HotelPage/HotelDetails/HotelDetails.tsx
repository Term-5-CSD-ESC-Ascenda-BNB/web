import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { ReviewScoreSmall } from '@/components/ReviewScoreSmall/ReviewScoreSmall';
import { ReviewScoreSub } from '@/components/ReviewScoreSub/ReviewScoreSub';
import { SaveButton } from '@/components/SaveButton/SaveButton';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { Group, Stack, Text, Box, Flex } from '@mantine/core';
import { AmenitiesList } from '@/components/AmenitiesList/AmenitiesList';
import { SurroundingsList } from '@/components/SurroundingsList/SurroundingsList';
import { RoomCard } from '@/components/Room/RoomCard';
import { HotelAmenitiesSection } from '@/components/AmenitiesList/HotelAmenitiesSection';
import { HotelRoomsSection } from '@/components/Room/HotelRoomsSection';
import roomData from '@/.mock_data/price.json';

interface AmenityRating {
  name: string;
  score: number;
}

interface TrustYouScore {
  overall: number | null;
  kaligo_overall: number;
  solo: number | null;
  couple: number | null;
  family: number | null;
  business: number | null;
}

interface Hotel {
  name: string;
  address: string;
  rating: number;
  trustyou: {
    score: TrustYouScore;
  };
  amenities_ratings: AmenityRating[];
  amenities?: Record<string, boolean | undefined>;
}

interface HotelDetailsProps {
  hotel: Hotel;
}

interface Room {
  key: string;
  roomNormalizedDescription: string;
  freeCancellation: boolean;
  description: string;
  longDescription: string;
  images: string[];
  amenities: string[];
  price: number;
  marketRates?: { supplier: string; rate: number }[];
}

function generateRoomImageUrls(
  imageData: { prefix: string; suffix: string; count: number }[]
): string[] {
  if (!imageData || imageData.length === 0) return [];

  const { prefix, suffix, count } = imageData[0]; // usually one object
  return Array.from({ length: count }, (_, i) => `${prefix}_${i + 1}${suffix}`);
}

export function HotelDetails({ hotel }: HotelDetailsProps) {
  const { name, address, rating, trustyou, amenities_ratings, amenities } = hotel;

  // Map from amenities_ratings to ReviewScoreSub-like data
  const ratingLabels = ['Location', 'Service', 'Room', 'WiFi', 'Breakfast', 'Food', 'Comfort'];
  const mappedRatings = ratingLabels
    .map((label) => {
      const entry = amenities_ratings.find((r) => r.name === label);
      return entry ? { label: entry.name, score: entry.score / 10 } : null;
    })
    .filter(Boolean) as { label: string; score: number }[];

  return (
    <>
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
        {trustyou?.score?.overall && <ReviewScoreLarge score={trustyou.score.overall} />}
      </Group>

      <Flex justify="space-between" wrap="wrap" mt="xl" gap="xl">
        <HotelAmenitiesSection amenities={amenities} />
        <Box style={{ flex: 1, minWidth: 300 }}>
          <SurroundingsList surroundings={[]} />{' '}
          {/* You can replace this when you add surroundings data */}
        </Box>
      </Flex>

      <HotelRoomsSection />

      <Box mt="xl">
        <Text fz="h2" mb="sm">
          Guest Reviews
        </Text>

        <Group align="center" wrap="nowrap" gap="xl" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Stack align="center" gap={4}>
            <ReviewScoreLarge score={trustyou.score.overall ?? 0} />
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

        {/* Reviews section omitted — not in JSON */}
      </Box>
    </>
  );
}
