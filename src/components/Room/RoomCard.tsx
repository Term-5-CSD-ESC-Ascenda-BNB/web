import { useState } from 'react';
import {
  Box,
  Card,
  Image,
  Text,
  Group,
  Stack,
  Radio,
  Button,
  Divider,
  Tooltip,
} from '@mantine/core';
import { getRoomFeatureIcon } from '@/utils/getRoomFeatureIcon';

interface RoomOption {
  title: string;
  refundable: boolean;
  breakfast: string;
  price: number;
  totalPrice: number;
}

interface RoomCardProps {
  name: string;
  images: string[];
  features: string[];
  options: RoomOption[];
  size: string;
  occupancy: string;
  bedType: string;
  wifi: string;
  view: string;
  tv?: string;
  bath?: string;
}

export function RoomCard({
  name,
  images,
  options,
  size,
  occupancy,
  bedType,
  wifi,
  view,
  tv,
  bath,
}: RoomCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const featureList = [
    { label: size },
    { label: occupancy },
    { label: bedType },
    { label: wifi },
    { label: view },
    ...(tv ? [{ label: tv }] : []),
    ...(bath ? [{ label: bath }] : []),
  ];

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      p="md"
      w={360}
      miw={300}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Card.Section>
        <Image src={images?.[0]} height={180} alt={name} />
      </Card.Section>

      <Box style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack gap="xs" mt="xs">
          <Text fw={600}>{name}</Text>

          <Group gap="xs" wrap="wrap" mt="xs">
            {featureList.map(({ label }, idx) => (
              <Tooltip key={idx} label={label}>
                <Group gap={4}>
                  {getRoomFeatureIcon(label)}
                  <Text fz="xs">{label}</Text>
                </Group>
              </Tooltip>
            ))}
          </Group>
        </Stack>

        <Divider my="sm" />

        <Radio.Group
          value={String(selectedIndex)}
          onChange={(value) => setSelectedIndex(parseInt(value))}
          color="#514D8A"
        >
          <Stack gap="xs">
            {options.map((opt, idx) => (
              <Card
                key={idx}
                withBorder
                radius="md"
                padding="sm"
                style={{
                  borderColor: idx === selectedIndex ? '#7B76B5' : undefined,
                  backgroundColor: idx === selectedIndex ? '#F1F0FB' : undefined,
                }}
              >
                <Radio value={String(idx)} label={opt.title} />
                <Stack gap={2} mt="xs">
                  <Text fz="xs" c="dimmed">
                    {opt.refundable ? 'Fully refundable' : 'Non-refundable'}
                  </Text>
                  <Text fz="xs">
                    {opt.breakfast === 'Included' ? 'Breakfast included' : 'No breakfast'}
                  </Text>
                  <Text fw={600} mt="xs">
                    + ${opt.totalPrice.toFixed(2)}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Radio.Group>

        <Box mt="auto" />
      </Box>

      <Button fullWidth mt="md" color="#514D8A">
        Select
      </Button>
    </Card>
  );
}
