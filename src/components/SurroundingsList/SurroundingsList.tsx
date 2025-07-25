import { Box, Group, Text } from '@mantine/core';
import { getSurroundingIcon } from '@/utils/getSurroundingIcon';

export interface Surrounding {
  type: string;
  name: string;
  distance: string;
}

interface SurroundingsListProps {
  surroundings: Surrounding[];
  maxItems?: number; // optional limit
}

export function SurroundingsList({ surroundings, maxItems }: SurroundingsListProps) {
  if (!surroundings || surroundings.length === 0) {
    return <Text c="dimmed">No nearby places found.</Text>;
  }

  const visible = maxItems ? surroundings.slice(0, maxItems) : surroundings;

  return (
    <Box>
      <Group gap="xs" wrap="wrap" align="start">
        {visible.map((item, i) => (
          <Group key={i} gap={8} align="center" style={{ width: '100%' }}>
            {getSurroundingIcon(item.type)}
            <Text fz="sm">
              {item.type}: {item.name}{' '}
              <Text span c="dimmed" fz="sm">
                ({item.distance})
              </Text>
            </Text>
          </Group>
        ))}
      </Group>
    </Box>
  );
}
