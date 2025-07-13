import { Box, Stack, Text } from '@mantine/core';
import { RoomOptionCard } from './RoomOptionCard';

interface RoomOption {
  breakfast?: string;
  refundable: boolean;
  reschedulable: boolean;
  prepay: boolean;
  price: number;
  totalPrice: number;
}

interface RoomOptionsProps {
  options: RoomOption[];
}

export function RoomOptions({ options }: RoomOptionsProps) {
  return (
    <Box>
      <Text fw={600} size="sm" mb="md">
        Options:
      </Text>

      <Stack gap="md">
        {options.map((opt, i) => (
          <RoomOptionCard key={i} option={opt} />
        ))}
      </Stack>
    </Box>
  );
}
