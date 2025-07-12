import { Paper, Stack, Text, Divider, Group } from '@mantine/core';

export function PriceDetailsCard() {
  return (
    <Paper withBorder radius="md" p="md" mt="md">
      <Stack gap={4}>
        <Text fw={600} size="sm" mb={2}>
          Price Details
        </Text>
        <Divider />
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            1 room ($1,600) x 9 nights
          </Text>
          <Text size="sm">S$14,955.75</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            VAT and Fees
          </Text>
          <Text size="sm">S$1,495.53</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            City tax
          </Text>
          <Text size="sm">S$320.76</Text>
        </Group>
        <Divider />
        <Group justify="space-between">
          <Text fw={600}>Total</Text>
          <Text fw={600}>S$16,772.04</Text>
        </Group>
      </Stack>
    </Paper>
  );
}
