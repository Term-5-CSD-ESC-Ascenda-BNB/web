import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import type { MockHotel } from '@/types/MockHotel';
import { IconCaretRightFilled } from '@tabler/icons-react';
import { Anchor, Flex, Stack, Title } from '@mantine/core';

interface FeaturedSectionProps {
  title: string;
  hotels: MockHotel[];
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
