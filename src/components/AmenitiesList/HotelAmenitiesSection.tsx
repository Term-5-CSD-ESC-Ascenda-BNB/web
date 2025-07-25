import { useState } from 'react';
import { Box, Button, Group, Modal, Text } from '@mantine/core';
import { getAmenityIcon } from '@/utils/getAmenityIcon';

interface HotelAmenitiesSectionProps {
  amenities?: Record<string, boolean | undefined>;
}

export function HotelAmenitiesSection({ amenities }: HotelAmenitiesSectionProps) {
  const [opened, setOpened] = useState(false);
  const THRESHOLD = 8;

  const formattedAmenities = amenities
    ? Object.keys(amenities)
        .filter((key) => amenities[key])
        .map((key) =>
          key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/t V/, 'TV')
        )
    : [];

  const visibleAmenities = formattedAmenities.slice(0, THRESHOLD);

  return (
    <Box style={{ flex: 1, minWidth: 300 }}>
      <Text fw={600} mb="sm">
        Amenities
      </Text>

      <Group gap="md" mb="sm" align="start" style={{ flexWrap: 'wrap' }}>
        {visibleAmenities.map((amenity) => (
          <Group key={amenity} gap={6} style={{ width: '45%' }}>
            {getAmenityIcon(amenity)}
            <Text size="sm">{amenity}</Text>
          </Group>
        ))}
      </Group>

      {formattedAmenities.length > THRESHOLD && (
        <>
          <Button variant="outline" radius="xl" size="xs" onClick={() => setOpened(true)}>
            View all {formattedAmenities.length} amenities
          </Button>

          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="All Amenities"
            size="md"
            centered
          >
            <Group gap="md" align="start" style={{ flexWrap: 'wrap' }}>
              {formattedAmenities.map((amenity) => (
                <Group key={amenity} gap={6} style={{ width: '45%' }}>
                  {getAmenityIcon(amenity)}
                  <Text size="sm">{amenity}</Text>
                </Group>
              ))}
            </Group>
          </Modal>
        </>
      )}
    </Box>
  );
}
