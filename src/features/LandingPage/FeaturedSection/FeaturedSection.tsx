import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { IconCaretRightFilled } from '@tabler/icons-react';
import { Anchor, Flex, Stack, Title } from '@mantine/core';
import type { HotelResult } from '@/schemas/hotelResults';
import { useNavigate } from '@tanstack/react-router';
import { SearchParamsSchema } from '@/schemas/searchParams';

interface FeaturedSectionProps {
  title: string;
  hotels: HotelResult[];
  isLoading: boolean;
}

export function FeaturedSection({ title, hotels, isLoading }: FeaturedSectionProps) {
  const navigate = useNavigate();

  const params = {
    uid: 'RsBU',
    term: 'Singapore, Singapore',
    date: [
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    ],
    guests: 1,
    rooms: 1,
    page: 1,
  };

  const handleHotelClick = (hotelId: string) => {
    void navigate({
      to: `/hotels/${hotelId}`,
      search: SearchParamsSchema.parse(params),
    });
  };

  return (
    <Stack gap={0}>
      <Flex justify="center" align="center" mb={'xl'}>
        <Title order={2} fw={500} fz={'2rem'}>
          {title}
        </Title>
      </Flex>
      <HotelGrid hotels={hotels} isLoading={isLoading} onHotelClick={handleHotelClick} />
      <Flex justify="flex-end">
        <Anchor href="search">
          View more <IconCaretRightFilled size={16} color="black" />
        </Anchor>
      </Flex>
    </Stack>
  );
}
