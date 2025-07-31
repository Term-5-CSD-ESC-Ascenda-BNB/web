import { Box, Stack, Text } from '@mantine/core';
import { RoomOptionCard } from './RoomOptionCard';

import type { RoomOption } from '@/types/Room';

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
