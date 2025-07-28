import { Paper, Group, Text, Divider, Stack, Image, Box, ThemeIcon } from '@mantine/core';
import { IconStar, IconUser, IconRulerMeasure, IconCalendarTime } from '@tabler/icons-react';
import { useState } from 'react';
import { useCounter } from '@mantine/hooks';
import { ReviewScoreLarge } from '@/components/ReviewScoreLarge/ReviewScoreLarge';

interface BookingDetailsCardProps {
  name: string;
  image: string;
  starRating: number;
  address: string;
  roomType: string;
  reviewScore: number;
  checkin: string;
  checkout: string;
  guests: number;
}

export function BookingDetailsCard({
  name,
  image,
  starRating,
  address,
  roomType,
  reviewScore,
  checkin,
  checkout,
  guests,
}: BookingDetailsCardProps) {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short', // "Mon"
      month: 'short', // "Dec"
      day: '2-digit', // "22"
      year: 'numeric', // "2025"
    });
  }

  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Group align="flex-start" gap="md">
          <Image src={image} alt="Hotel" radius="md" w={90} h={80} fit="cover" />
          <Box style={{ flex: 1 }}>
            <Text fw={600}>{name}</Text>
            <Group gap={4}>
              <ThemeIcon size={16} color="yellow" variant="subtle">
                <IconStar size={14} />
              </ThemeIcon>
              <Text size="xs" fw={600}>
                {starRating}
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              {address}
            </Text>
            <Text size="xs" c="dimmed">
              {roomType}
            </Text>
            <Group gap={24} mt={2}>
              <Box>
                <IconUser size={14} style={{ verticalAlign: 'middle' }} /> x{guests}
              </Box>
              <Box>
                <IconRulerMeasure size={14} style={{ verticalAlign: 'middle' }} /> 36m²
              </Box>
            </Group>
          </Box>
          <ReviewScoreLarge score={reviewScore}></ReviewScoreLarge>
        </Group>
        <Divider />
        <Group grow>
          <Box>
            <Text size="xs" c="dimmed">
              Check-in
            </Text>
            <Text fw={500}>{formatDate(checkin)}</Text>
            <Text size="xs" c="dimmed">
              From 3:00 PM
            </Text>
          </Box>
          <Box>
            <Text size="xs" c="dimmed">
              Check-out
            </Text>
            <Text fw={500}>{formatDate(checkout)}</Text>
            <Text size="xs" c="dimmed">
              Before 12:00 PM
            </Text>
          </Box>
        </Group>
      </Stack>
    </Paper>
  );
}
