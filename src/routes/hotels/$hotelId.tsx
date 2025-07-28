import { useState } from 'react';
import { Footer } from '@/components/Footer/Footer';
import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import { useHotel } from '@/hooks/useHotel';
import { useSurroundings } from '@/hooks/useSurroundings';
import { Stack, Flex } from '@mantine/core';

import { HotelHeader } from '@/features/HotelPage/HotelHeader/HotelHeader';
import { HotelAmenities } from '@/features/HotelPage/HotelAmenities/HotelAmenities';
import { HotelSurroundings } from '@/features/HotelPage/HotelSurroundings/HotelSurroundings';
import { HotelRooms } from '@/features/HotelPage/HotelRooms/HotelRooms';
import { HotelReviews } from '@/features/HotelPage/HotelReviews/HotelReviews';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { hotelId } = Route.useParams();
  const { hotel, images } = useHotel(hotelId);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  const latitude = hotel?.latitude ?? 0;
  const longitude = hotel?.longitude ?? 0;

  const { surroundings } = useSurroundings({ lat: latitude, lng: longitude });

  if (!hotel) return <div>Hotel not found</div>;

  const { name, address, rating, trustyou, amenities_ratings, amenities } = hotel;

  const formattedSurroundings = surroundings.map((s) => ({
    type: s.type ?? 'POI',
    name: s.name || 'Unnamed',
    distance: `${s.dist} m`,
    latitude: s.point.lat,
    longitude: s.point.lon,
  }));

  return (
    <>
      <Stack pl="10vh" pr="10vh" pt="2rem" gap="xl" mb="xl">
        <ImageGallery images={images} />

        <HotelHeader
          name={name}
          address={address}
          rating={rating}
          trustyouScore={trustyou?.score?.overall ?? undefined}
          trustyou={trustyou}
          ratings={amenities_ratings}
          modalOpen={reviewsModalOpen}
          setModalOpen={setReviewsModalOpen}
        />

        <Flex justify="space-between" wrap="wrap" mt="xl" gap="xl">
          <HotelAmenities amenities={amenities} />
          <HotelSurroundings
            hotel={hotel}
            surroundings={formattedSurroundings}
            dimmed={reviewsModalOpen}
          />
        </Flex>

        <HotelRooms />
      </Stack>

      <HotelReviews
        trustyou={trustyou}
        ratings={amenities_ratings}
        opened={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
      />
    </>
  );
}
