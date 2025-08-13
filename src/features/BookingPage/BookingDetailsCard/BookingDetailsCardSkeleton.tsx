import { Paper, Group, Stack, Skeleton, Box, Divider } from '@mantine/core';

export function BookingDetailsCardSkeleton() {
  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Group align="flex-start" gap="md">
          <Skeleton height={80} width={90} radius="md" />
          <Box style={{ flex: 1 }}>
            <Skeleton height={14} width="60%" mb={6} />
            <Skeleton height={12} width="30%" mb={4} />
            <Skeleton height={10} width="80%" mb={4} />
            <Skeleton height={10} width="40%" mb={8} />
            <Group gap={24} mt={2}>
              <Skeleton height={12} width={50} />
              <Skeleton height={12} width={50} />
            </Group>
          </Box>
          <Skeleton height={36} width={48} radius="md" />
        </Group>

        <Divider />

        <Group grow>
          <Box>
            <Skeleton height={10} width={60} mb={4} />
            <Skeleton height={14} width={90} mb={4} />
            <Skeleton height={10} width={80} />
          </Box>
          <Box>
            <Skeleton height={10} width={60} mb={4} />
            <Skeleton height={14} width={90} mb={4} />
            <Skeleton height={10} width={80} />
          </Box>
        </Group>

        {/* Uncomment if you decide to show room/night controls during loading
        <Divider />
        <Group grow mt="sm">
          <Skeleton height={30} width="40%" />
          <Skeleton height={30} width="40%" />
        </Group>
        */}
      </Stack>
    </Paper>
  );
}
