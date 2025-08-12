import { Paper, Stack, Text, Divider, Group } from '@mantine/core';

interface PriceDetailsCardProps {
  roomType: string;
  rooms: number;
  roomPrice: number;
  checkin: string;
  checkout: string;
  currency: string;
  nights: number;
}

export function PriceDetailsCard({ rooms, roomPrice, currency, nights }: PriceDetailsCardProps) {
  return (
    <Paper withBorder radius="md" p="md" mt="md">
      <Stack gap={4}>
        <Text fw={600} size="sm" mb={2}>
          Price Details
        </Text>
        <Divider />
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {currency}
            {(roomPrice / rooms / nights).toFixed(2)} x {rooms} room x {nights} nights
          </Text>
          <Text size="sm">
            {currency}
            {roomPrice.toFixed(2)}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Add-Ons
          </Text>
          <Text size="sm">{currency}0</Text>
        </Group>

        <Divider />
        <Group justify="space-between">
          <Text fw={600}>Total</Text>
          <Text fw={600}>
            {currency}
            {roomPrice.toFixed(2)}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
