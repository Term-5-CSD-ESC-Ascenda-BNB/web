import { useState } from 'react';
import { LocationDisplay } from '@/components/LocationDisplay/LocationDisplay';
import { RatingStars } from '@/components/RatingStars/RatingStars';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';
import { ReviewScoreSub } from '@/components/ReviewScoreSub/ReviewScoreSub';
import { SaveButton } from '@/components/SaveButton/SaveButton';
import { ShareButton } from '@/components/ShareButton/ShareButton';
import { Group, Stack, Text, Box, Flex, Modal } from '@mantine/core';
import { HotelAmenitiesSection } from '@/components/AmenitiesList/HotelAmenitiesSection';
import { HotelRoomsSection } from '@/components/Room/HotelRoomsSection';
import { useSurroundings } from '@/hooks/useSurroundings';
import { HotelMap } from '@/components/HotelMap/HotelMap';
import { SurroundingsList } from '@/components/SurroundingsList/SurroundingsList';
import { IconMapPinFilled } from '@tabler/icons-react';
import type { Hotel } from '@/types/Hotel';

interface HotelDetailsProps {
  hotel: Hotel;
}

export function HotelDetails({ hotel }: HotelDetailsProps) {
  const { name, address, rating, trustyou, amenities_ratings, amenities, latitude, longitude } =
    hotel;
  const {
    surroundings,
    loading: _loading,
    error: _error,
  } = useSurroundings({ lat: latitude, lng: longitude });
  const [mapOpen, setMapOpen] = useState(false);

  const formattedSurroundings = surroundings.map((s) => ({
    type: s.type ?? 'POI',
    name: s.name || 'Unnamed',
    distance: `${s.dist} m`,
    latitude: s.point.lat,
    longitude: s.point.lon,
  }));

  const ratingLabels = ['Location', 'Service', 'Room', 'WiFi', 'Breakfast', 'Food', 'Comfort'];
  const mappedRatings = ratingLabels
    .map((label) => {
      const entry = amenities_ratings.find((r) => r.name === label);
      return entry ? { label: entry.name, score: entry.score / 10 } : null;
    })
    .filter(Boolean) as { label: string; score: number }[];

  return (
    <>
      {/* Header */}
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

      {/* Amenities and Surroundings */}
      <Flex justify="space-between" wrap="wrap" mt="xl" gap="xl">
        <HotelAmenitiesSection amenities={amenities} />

        <Box style={{ flex: 1, minWidth: 300 }}>
          <Group align="center" justify="space-between">
            <Group gap={6}>
              <IconMapPinFilled size={18} color="var(--mantine-color-blue-6)" />
              <Text fw={600} fz="lg">
                Surroundings
              </Text>
            </Group>
            <Text c="blue" style={{ cursor: 'pointer' }} onClick={() => setMapOpen(true)}>
              View on map
            </Text>
          </Group>
          <Box mt="sm">
            <SurroundingsList surroundings={formattedSurroundings} />
          </Box>
        </Box>
      </Flex>

      {/* Modal Map */}
      <Modal
        opened={mapOpen}
        onClose={() => setMapOpen(false)}
        size="80%"
        centered
        title="Hotel & Nearby Places"
        styles={{ body: { padding: 0, height: 500 } }}
      >
        <HotelMap hotels={[hotel]} surroundings={formattedSurroundings} />
      </Modal>

      {/* Rooms */}
      <HotelRoomsSection />

      {/* Guest Reviews */}
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
      </Box>
    </>
  );
}
