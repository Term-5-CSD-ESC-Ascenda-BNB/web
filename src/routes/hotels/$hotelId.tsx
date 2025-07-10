import { Footer } from '@/components/Footer/Footer';
import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import { HotelDetails } from '@/features/HotelPage/HotelDetails/HotelDetails';
import { useHotel } from '@/hooks/useHotel';
import { Stack } from '@mantine/core';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { hotelId } = Route.useParams();
  const { hotel, images } = useHotel(hotelId);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <>
      <Stack pl={'10vh'} pr={'10vh'} pt={'2rem'} gap={'xl'} mb={'xl'}>
        <ImageGallery images={images} />
        <HotelDetails
          name={hotel.name}
          address={hotel.address}
          starRating={hotel.rating}
          reviewScore={hotel.trustyou.score.overall ?? 0}
        />
      </Stack>
      <Footer />
    </>
  );
}
