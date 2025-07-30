import { useState } from 'react';
import { Box, Button, Group, Text, Modal, ScrollArea, Divider, SimpleGrid } from '@mantine/core';
import { getAmenityIcon } from '@/utils/getAmenityIcon';

interface HotelAmenitiesSectionProps {
  amenities?: Record<string, boolean | undefined>;
}

export function HotelAmenitiesSection({ amenities }: HotelAmenitiesSectionProps) {
  const [opened, setOpened] = useState(false);
  const THRESHOLD = 10;

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
      <Text fw={600} fz="lg" mb="xs">
        Amenities
      </Text>

      <Divider mb="sm" />

      <SimpleGrid cols={2} spacing="0" verticalSpacing={1.25}>
        {visibleAmenities.map((amenity, i) => (
          <Group
            key={i}
            gap={8}
            align="center"
            style={{
              width: '100%',
              paddingBlock: '4px',
            }}
          >
            {getAmenityIcon(amenity)}
            <Text fz="sm">{amenity}</Text>
          </Group>
        ))}
      </SimpleGrid>

      {formattedAmenities.length > THRESHOLD && (
        <>
          <Button
            radius="xl"
            size="sm"
            style={{ backgroundColor: '#514D8A', alignSelf: 'start', marginTop: 8 }}
            onClick={() => setOpened(true)}
          >
            View all {formattedAmenities.length} amenities
          </Button>

          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size="md"
            centered
            title="All Amenities"
            styles={{
              body: {
                padding: 16,
                height: 'calc(85vh - 80px)',
              },
            }}
          >
            <ScrollArea h="calc(85vh - 160px)">
              <SimpleGrid cols={2} spacing="0" verticalSpacing={8}>
                {formattedAmenities.map((amenity, i) => (
                  <Group
                    key={i}
                    gap={8}
                    align="center"
                    style={{
                      width: '100%',
                      paddingBlock: '4px',
                    }}
                  >
                    {getAmenityIcon(amenity)}
                    <Text fz="sm">{amenity}</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </ScrollArea>
          </Modal>
        </>
      )}
    </Box>
  );
}
