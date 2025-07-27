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
  Badge,
  Tooltip,
} from '@mantine/core';
import { IconBed, IconRulerMeasure, IconUsers, IconWifi, IconEye } from '@tabler/icons-react';

interface RoomOption {
  title: string;
  refundable: boolean;
  refundableUntil?: string;
  reschedulable: boolean;
  breakfast: string;
  prepay: boolean;
  price: number;
  totalPrice: number;
  promo?: string;
  availability?: string;
}

interface RoomCardProps {
  name: string;
  images: string[];
  features: string[];
  options: RoomOption[];
}

export function RoomCard({ name, images, options }: RoomCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      {/* Top Image */}
      <Card.Section>
        <Image src={images?.[0]} height={180} alt={name} />
      </Card.Section>

      {/* Middle Section - Grows to push button down */}
      <Box style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Room Info */}
        <Stack gap="xs" mt="xs">
          <Text fw={600}>{name}</Text>
          <Text fz="sm" c="dimmed">
            Good • 4 reviews
          </Text>

          {/* Icons */}
          <Group gap="xs" wrap="wrap" mt="xs">
            <Tooltip label="Size">
              <Group gap={4}>
                <IconRulerMeasure size={14} /> <Text fz="xs">409 sq ft</Text>
              </Group>
            </Tooltip>
            <Tooltip label="Occupancy">
              <Group gap={4}>
                <IconUsers size={14} /> <Text fz="xs">Sleeps 3</Text>
              </Group>
            </Tooltip>
            <Tooltip label="Bedding">
              <Group gap={4}>
                <IconBed size={14} /> <Text fz="xs">1 Double OR 2 Twin Beds</Text>
              </Group>
            </Tooltip>
            <Tooltip label="Wi-Fi">
              <Group gap={4}>
                <IconWifi size={14} /> <Text fz="xs">Free WiFi</Text>
              </Group>
            </Tooltip>
            <Tooltip label="View">
              <Group gap={4}>
                <IconEye size={14} /> <Text fz="xs">Hill view</Text>
              </Group>
            </Tooltip>
          </Group>
        </Stack>

        <Divider my="sm" />

        {/* Room Option Selector */}
        <Radio.Group
          value={String(selectedIndex)}
          onChange={(value) => setSelectedIndex(parseInt(value))}
        >
          <Stack gap="xs">
            {options.map((opt, idx) => (
              <Card
                key={idx}
                withBorder
                radius="md"
                padding="sm"
                style={{
                  borderColor: idx === selectedIndex ? '#1c7ed6' : undefined,
                  backgroundColor: idx === selectedIndex ? '#f0f8ff' : undefined,
                }}
              >
                <Radio value={String(idx)} label={opt.title} />
                <Stack gap={2} mt="xs">
                  <Text fz="xs" c="dimmed">
                    {opt.refundable
                      ? `Fully refundable before ${opt.refundableUntil}`
                      : 'Non-refundable'}
                  </Text>
                  <Text fz="xs">
                    {opt.breakfast === 'Included' ? 'Breakfast included' : 'No breakfast'}
                  </Text>
                  {opt.promo && <Badge color="yellow">{opt.promo}</Badge>}
                  {opt.availability && (
                    <Text c="red" fz="xs">
                      {opt.availability}
                    </Text>
                  )}
                  <Text fw={600} mt="xs">
                    + ${opt.totalPrice.toFixed(2)}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Radio.Group>

        {/* Spacer to push button down */}
        <Box mt="auto" />
      </Box>

      {/* Sticky Select Button at Bottom */}
      <Button fullWidth mt="md">
        Select
      </Button>
    </Card>
  );
}
