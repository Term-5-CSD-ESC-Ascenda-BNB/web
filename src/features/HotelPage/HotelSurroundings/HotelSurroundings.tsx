import { useState } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { SurroundingsList } from '@/components/SurroundingsList/SurroundingsList';
import { SurroundingsMapModal } from '@/components/SurroundingsMapModal/SurroundingsMapModal';
import type { Hotel, Surrounding } from '@/types/Hotel';

interface HotelSurroundingsProps {
  hotel: Hotel;
  surroundings: Surrounding[];
}

export function HotelSurroundings({ hotel, surroundings }: HotelSurroundingsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box style={{ flex: 1, minWidth: 300 }}>
      <Group align="center" justify="space-between">
        <Text fw={600} fz="lg">
          Surroundings
        </Text>
        <Text c="blue" style={{ cursor: 'pointer' }} onClick={() => setModalOpen(true)}>
          View all on map
        </Text>
      </Group>

      <Box mt="sm">
        <SurroundingsList surroundings={surroundings.slice(0, 5)} />
      </Box>

      <SurroundingsMapModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        hotel={hotel}
        surroundings={surroundings}
      />
    </Box>
  );
}
