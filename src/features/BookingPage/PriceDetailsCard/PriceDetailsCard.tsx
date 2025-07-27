import { Paper, Stack, Text, Divider, Group } from '@mantine/core';

interface PriceDetailsCardProps {
  roomType: string;
  rooms: number;
  roomPrice: number;
  checkin: string;
  checkout: string;
  currency: string;
}

export function PriceDetailsCard({
  roomType,
  rooms,
  roomPrice,
  checkin,
  checkout,
  currency,
}: PriceDetailsCardProps) {
  function getNumberOfNights(checkin: string, checkout: string): number {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffTime = checkoutDate.getTime() - checkinDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // ms to days
    return diffDays;
  }
  const nights: number = getNumberOfNights(checkin, checkout);
  return (
    <Paper withBorder radius="md" p="md" mt="md">
      <Stack gap={4}>
        <Text fw={600} size="sm" mb={2}>
          Price Details
        </Text>
        <Divider />
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {rooms} room ({currency}
            {roomPrice}) x {nights} nights
          </Text>
          <Text size="sm">
            {currency}
            {roomPrice * nights}
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
            {roomPrice * nights}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
