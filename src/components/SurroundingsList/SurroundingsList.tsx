import { Box, Group, Text } from '@mantine/core';
import {
  IconTrain,
  IconPlane,
  IconShoppingBag,
  IconStar,
  IconToolsKitchen,
  IconMapPin,
} from '@tabler/icons-react';

export interface Surrounding {
  type: string;
  name: string;
  distance: string;
}

const ICON_MAP: Record<string, React.ReactElement> = {
  Metro: <IconTrain size={18} />,
  Train: <IconTrain size={18} />,
  Airport: <IconPlane size={18} />,
  Shopping: <IconShoppingBag size={18} />,
  Dining: <IconToolsKitchen size={18} />,
  Attraction: <IconStar size={18} />,
};

interface SurroundingsListProps {
  surroundings: Surrounding[];
}

export function SurroundingsList({ surroundings }: SurroundingsListProps) {
  if (!surroundings || surroundings.length === 0) {
    return <Text c="dimmed">No nearby places found.</Text>;
  }

  return (
    <Box>
      <Group gap="xs" wrap="wrap" align="start">
        {surroundings.map((item, i) => (
          <Group key={i} gap={8} align="center" style={{ width: '100%' }}>
            {ICON_MAP[item.type] ?? <IconMapPin size={18} />}
            <Text>
              {item.type}: {item.name}{' '}
              <Text span c="dimmed">
                ({item.distance})
              </Text>
            </Text>
          </Group>
        ))}
      </Group>
    </Box>
  );
}
