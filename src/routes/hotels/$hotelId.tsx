import { useState } from 'react';
import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import { useSurroundings } from '@/hooks/useSurroundings';
import { Stack, Flex, Center, Loader } from '@mantine/core';
import { HotelHeader } from '@/features/HotelPage/HotelHeader/HotelHeader';
import { HotelAmenities } from '@/features/HotelPage/HotelAmenities/HotelAmenities';
import { HotelSurroundings } from '@/features/HotelPage/HotelSurroundings/HotelSurroundings';
import { HotelRooms } from '@/features/HotelPage/HotelRooms/HotelRooms';
import { HotelReviews } from '@/features/HotelPage/HotelReviews/HotelReviews';
import { SearchParamsSchema } from '@/schemas/searchParams';
import { useHotel } from '@/features/HotelPage/useHotel';
import { getFirstFiveImages } from '@/utils/getFirstFiveImages';
import { ErrorAlert } from '@/components/ErrorAlert/ErrorAlert';

export const Route = createFileRoute({
  component: RouteComponent,
  validateSearch: SearchParamsSchema,
});

function RouteComponent() {
  const { data: hotel, isLoading, error, isError } = useHotel();

  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  const latitude = hotel?.latitude ?? 0;
  const longitude = hotel?.longitude ?? 0;

  const { surroundings } = useSurroundings({ lat: latitude, lng: longitude });

  const formattedSurroundings = surroundings.map((s) => ({
    type: s.type ?? 'POI',
    name: s.name || 'Unnamed',
    distance: `${s.dist} m`,
    latitude: s.point.lat,
    longitude: s.point.lon,
  }));

  if (isLoading) {
    return (
      <Center h={'100vh'}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (isError || !hotel) {
    return (
      <Center h={'100vh'}>
        <ErrorAlert title="Error loading hotel details" message={error?.message} />
      </Center>
    );
  }

  return (
    <>
      <Stack pl="10vh" pr="10vh" pt="2rem" gap="xl" mb="xl">
        <ImageGallery images={getFirstFiveImages(hotel.image_details)} />

        <HotelHeader
          name={hotel.name || 'Hotel Name'}
          address={hotel.address || 'Hotel Address'}
          rating={hotel.rating || 0}
          trustyouScore={hotel.trustyou.score.overall}
          trustyou={hotel.trustyou}
          ratings={hotel.amenities_ratings || {}}
          modalOpen={reviewsModalOpen}
          setModalOpen={setReviewsModalOpen}
        />

        <Flex justify="space-between" wrap="wrap" mt="xl" gap="xl">
          {hotel.amenities && Object.keys(hotel.amenities).length > 0 ? (
            <HotelAmenities amenities={hotel.amenities} />
          ) : (
            <Center mx={'xl'}>No amenities available</Center>
          )}

          <HotelSurroundings
            hotel={hotel}
            surroundings={formattedSurroundings}
            dimmed={reviewsModalOpen}
          />
        </Flex>

        <HotelRooms />
      </Stack>

      <HotelReviews
        trustyou={hotel.trustyou}
        ratings={hotel.amenities_ratings}
        opened={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
      />
    </>
  );
}
