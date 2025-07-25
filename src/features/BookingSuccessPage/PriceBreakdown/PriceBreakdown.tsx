import { Paper, Stack, Text, Title, Divider, Group, Image, Box, Button, Grid } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import React from 'react';

const PriceBreakdown = () => {
  return (
    <Paper withBorder p="md" radius="md">
      <Stack>
        <Group justify="flex-start">
          <Title>Booking ID:</Title>
          <Title c="blue" ml={-5}>
            1234-5688-91011
          </Title>
        </Group>

        <Divider />

        <Group justify="flex-start" gap={40}>
          <Box>
            <Text fw={600}>Check-in</Text>
            <Paper withBorder p="sm" mt={4} radius="sm" w={120}>
              <Stack align="center" gap={0}>
                <Text size="xs">THU</Text>
                <Title order={3}>21</Title>
                <Text size="xs">December</Text>
              </Stack>
            </Paper>
          </Box>

          <Box>
            <Text fw={600}>Check-out</Text>
            <Paper withBorder p="sm" mt={4} radius="sm" w={120}>
              <Stack align="center" gap={0}>
                <Text size="xs">SUN</Text>
                <Title order={3}>24</Title>
                <Text size="xs">December</Text>
              </Stack>
            </Paper>
          </Box>
        </Group>

        <Divider />

        <Stack>
          <Text fw={600}>Room Fare Breakup</Text>
          <Group justify="space-between">
            <Stack>
              <Text c={'dimmed'}>Room Type</Text>
              <Text>Big Room</Text>
            </Stack>
            <Stack>
              <Text c={'dimmed'}>Room Price</Text>
              <Text>1200 * 2</Text>
            </Stack>
            <Stack>
              <Text c={'dimmed'}>Total</Text>
              <Text>2400</Text>
            </Stack>
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text>Amount paid</Text>
            <Text c="red"> S$2400</Text>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PriceBreakdown;
