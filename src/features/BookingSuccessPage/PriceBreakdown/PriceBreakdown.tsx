import { Paper, Stack, Text, Title, Divider, Group, Image, Box, Button, Grid } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import React from 'react';

interface PriceBreakdownProps {
  bookingId: string;
  startDate: string;
  endDate: string;
  nights: number;
  roomDescription: string;
  price: number;
  currency: string;
  rooms: number;
}

function formatDateInfo(dateStr: string) {
  const date = new Date(dateStr);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return {
    day: days[date.getUTCDay()],
    date: date.getUTCDate(),
    month: months[date.getUTCMonth()],
    year: date.getUTCFullYear(),
  };
}

const PriceBreakdown = ({
  bookingId,
  startDate,
  endDate,
  nights,
  roomDescription,
  price,
  currency,
  rooms,
}: PriceBreakdownProps) => {
  const { day: sDay, date: sDate, month: sMonth, year: sYear } = formatDateInfo(startDate);
  const { day: eDay, date: eDate, month: eMonth, year: eYear } = formatDateInfo(endDate);

  return (
    <Paper withBorder p="md" radius="md">
      <Stack>
        <Group justify="flex-start">
          <Title>Booking ID:</Title>
          <Title c="blue" ml={-5}>
            {bookingId}
          </Title>
        </Group>

        <Divider />

        <Group justify="flex-start" gap={40}>
          <Box>
            <Text fw={600}>Check-in</Text>
            <Paper withBorder p="sm" mt={4} radius="sm" w={120}>
              <Stack align="center" gap={0}>
                <Text size="xs">{sDay}</Text>
                <Title order={3}>{sDate}</Title>
                <Text size="xs">{sMonth}</Text>
                <Text size="xs">{sYear}</Text>
              </Stack>
            </Paper>
          </Box>

          <Box>
            <Text fw={600}>Check-out</Text>
            <Paper withBorder p="sm" mt={4} radius="sm" w={120}>
              <Stack align="center" gap={0}>
                <Text size="xs">{eDay}</Text>
                <Title order={3}>{eDate}</Title>
                <Text size="xs">{eMonth}</Text>
                <Text size="xs">{eYear}</Text>
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
              <Text>{roomDescription}</Text>
            </Stack>
            <Stack>
              <Text c={'dimmed'}>Room Price</Text>
              <Text>
                {price} * {rooms}
              </Text>
            </Stack>
            <Stack>
              <Text c={'dimmed'}>Total</Text>
              <Text>{price * rooms}</Text>
            </Stack>
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text>Amount paid</Text>
            <Text c="red">
              {' '}
              {currency}
              {price * rooms}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PriceBreakdown;
