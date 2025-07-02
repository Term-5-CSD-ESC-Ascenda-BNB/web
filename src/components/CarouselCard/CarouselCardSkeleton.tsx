import { AspectRatio, Group, Skeleton, Stack } from '@mantine/core';

export function CarouselCardSkeleton() {
  return (
    <Stack gap="xs">
      <AspectRatio ratio={1}>
        <Skeleton width="100%" radius="md" />
      </AspectRatio>

      <Stack gap="sm">
        <Skeleton height={20} width="70%" />

        <Skeleton height={16} width="90%" />

        <Group justify="space-between">
          <Skeleton height={16} width={100} />
          <Skeleton height={24} width={40} radius="xl" />
        </Group>

        <Skeleton height={24} width={120} mt="auto" />
      </Stack>
    </Stack>
  );
}
