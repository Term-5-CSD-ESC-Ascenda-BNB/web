import { Group, SimpleGrid, Text } from '@mantine/core';
import {
  IconBath,
  IconHome2,
  IconDeviceTv,
  IconUser,
  IconBed,
  IconWind,
  IconCoffee,
  IconRulerMeasure,
  IconWifi,
  IconEye,
  IconSmokingNo,
  IconHelpCircle,
} from '@tabler/icons-react';

interface RoomFeaturesProps {
  features: string[];
}

const FEATURE_ICON_MAP: Record<string, JSX.Element> = {
  Bathtub: <IconBath size={16} />,
  Balcony: <IconHome2 size={16} />,
  'Smart TV': <IconDeviceTv size={16} />,
  'Sleeps 2': <IconUser size={16} />,
  '1 King Bed': <IconBed size={16} />,
  'Air Conditioning': <IconWind size={16} />,
  'Coffee Machine': <IconCoffee size={16} />,
  '45m² | Floor: 5–16': <IconRulerMeasure size={16} />,
  'Free Wi-Fi': <IconWifi size={16} />,
  'Garden View': <IconEye size={16} />,
  'Non-Smoking': <IconSmokingNo size={16} />,
};

export function RoomFeatures({ features }: RoomFeaturesProps) {
  return (
    <SimpleGrid cols={2} spacing={8} mt="md" style={{ maxWidth: 360, width: '100%' }}>
      {features.map((feature, i) => (
        <Group key={i} gap={6} align="center">
          {FEATURE_ICON_MAP[feature] || <IconHelpCircle size={16} />}
          <Text size="sm">{feature}</Text>
        </Group>
      ))}
    </SimpleGrid>
  );
}
