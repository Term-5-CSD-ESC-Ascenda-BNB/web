import { Box, Group, Text, Button } from '@mantine/core';
import {
  IconParking,
  IconBarbell,
  IconWifi,
  IconToolsKitchen,
  IconSwimming,
  IconFlag,
  IconClock,
  IconPlaneInflight,
  IconBriefcase,
  IconWheelchair,
  IconFlower,
  IconPresentation,
} from '@tabler/icons-react';

const ICON_MAP: Record<string, JSX.Element> = {
  Parking: <IconParking size={18} />,
  Gym: <IconBarbell size={18} />,
  'Wi-Fi': <IconWifi size={18} />,
  Restaurant: <IconToolsKitchen size={18} />,
  'Swimming Pool': <IconSwimming size={18} />,
  Playground: <IconFlag size={18} />,
  '24-Hour Front Desk': <IconClock size={18} />,
  'Airport Shuttle': <IconPlaneInflight size={18} />,
  'Business Center': <IconBriefcase size={18} />,
  'Accessible Rooms': <IconWheelchair size={18} />,
  Spa: <IconFlower size={18} />,
  'Conference Center': <IconPresentation size={18} />,
};

interface AmenitiesListProps {
  amenities: string[];
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  return (
    <Box>
      <Text fz="xl" fw={600} mb="sm">
        Amenities
      </Text>
      <Group gap="xs" wrap="wrap" align="start">
        {amenities.map((item, i) => (
          <Group key={i} gap={8} align="center" style={{ width: '48%' }}>
            {ICON_MAP[item] || <IconFlag size={18} />}
            <Text>{item}</Text>
          </Group>
        ))}
      </Group>
      <Button
        variant="outline"
        radius="xl"
        size="sm"
        mt="md"
        styles={{
          root: {
            borderColor: '#C4C4C4',
            color: '#000',
            fontWeight: 500,
            padding: '6px 16px',
            backgroundColor: '#fff',
          },
        }}
      >
        View all 30 amenities
      </Button>
    </Box>
  );
}
