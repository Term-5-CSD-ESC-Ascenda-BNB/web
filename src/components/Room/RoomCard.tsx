import { Box, Button, Grid, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import { RoomGallery } from './RoomGallery';
import { RoomFeatures } from './RoomFeatures';
import { RoomOptions } from './RoomOptions';

interface RoomOption {
  title: string;
  refundable: boolean;
  reschedulable: boolean;
  breakfast?: string;
  prepay: boolean;
  price: number;
  totalPrice: number;
}

interface RoomCardProps {
  name: string;
  images: string[];
  features: string[];
  options: RoomOption[];
}

export function RoomCard({ name, images, features, options }: RoomCardProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Box mt="xl">
      <Grid gutter="xl">
        {/* Left Column: Image + Amenities */}
        <Grid.Col span={5}>
          <RoomGallery images={images} />
          <RoomFeatures features={features.slice(0, 6)} />
          <Button
            radius="xl"
            size="sm"
            mt="xs"
            style={{ backgroundColor: '#514D8A' }}
            onClick={() => setOpened(true)}
          >
            View all room details
          </Button>

          <Modal opened={opened} onClose={() => setOpened(false)} title="Room Details" size="lg">
            <Text fw={600} mb="sm">
              {name}
            </Text>
            <RoomGallery images={images} />
            <RoomFeatures features={features} />
          </Modal>
        </Grid.Col>

        {/* Right Column: Room Options */}
        <Grid.Col span={5}>
          <RoomOptions options={options} />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
