import { Box, Flex, Stack, Text } from '@mantine/core';
import { RoomGallery } from './RoomGallery';
import { RoomFeatures } from './RoomFeatures';
// import { RoomOptions } from './RoomOptions';

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
  return (
    <Box mt="xl">
      <Text fw={600} fz="xl" mb="sm">
        Rooms
      </Text>

      <Flex wrap="wrap" gap="xl">
        <Stack style={{ flex: 1, minWidth: 300 }}>
          <Text fw={500}>{name}</Text>
          <RoomGallery images={images} />
          <RoomFeatures features={features} />
        </Stack>

        {/* <Box style={{ flex: 1, minWidth: 300 }}>
          <RoomOptions options={options} />
        </Box> */}
      </Flex>
    </Box>
  );
}
