import { useState } from 'react';
import { Group, SimpleGrid, Text, Button, Modal } from '@mantine/core';
import { getAmenityIcon } from '@/utils/getAmenityIcon';

interface RoomFeaturesProps {
  features: string[];
}

export function RoomFeatures({ features }: RoomFeaturesProps) {
  const [opened, setOpened] = useState(false);

  const shown = features.slice(0, 6);
  const hasMore = features.length > 6;

  const renderItem = (feature: string, i: number) => (
    <Group key={i} gap={6} align="center" wrap="nowrap">
      {getAmenityIcon(feature)}
      <Text size="sm" style={{ whiteSpace: 'nowrap' }}>
        {feature}
      </Text>
    </Group>
  );

  return (
    <>
      <SimpleGrid cols={2} spacing={8} mt="md" style={{ width: '100%' }}>
        {shown.map(renderItem)}
      </SimpleGrid>

      {hasMore && (
        <Button variant="subtle" size="xs" color="gray" mt="xs" onClick={() => setOpened(true)}>
          View all room details
        </Button>
      )}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Room Details"
        centered
        size="md"
      >
        <SimpleGrid cols={3} spacing="sm" mt="sm">
          {features.map(renderItem)}
        </SimpleGrid>
      </Modal>
    </>
  );
}
