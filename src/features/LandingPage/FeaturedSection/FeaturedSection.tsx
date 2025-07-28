import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { IconCaretRightFilled } from '@tabler/icons-react';
import { Anchor, Flex, Stack, Title } from '@mantine/core';
import type { Hotel } from '@/types/Hotel';

interface FeaturedSectionProps {
  title: string;
  hotels: Hotel[];
  isLoading: boolean;
}

export function FeaturedSection({ title, hotels, isLoading }: FeaturedSectionProps) {
  return (
    <Stack gap={0}>
      <Flex justify="center" align="center" mb={'xl'}>
        <Title order={2} fw={500} fz={'2rem'}>
          {title}
        </Title>
      </Flex>
      <HotelGrid hotels={hotels} isLoading={isLoading} />
      <Flex justify="flex-end">
        <Anchor href="search">
          View more <IconCaretRightFilled size={16} color="black" />
        </Anchor>
      </Flex>
    </Stack>
  );
}
