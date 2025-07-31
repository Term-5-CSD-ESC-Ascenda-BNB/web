import { SimpleGrid } from '@mantine/core';
import { BookingDetailsCard } from '@/features/BookingPage/BookingDetailsCard/BookingDetailsCard';
import { BookingDetailsCardSkeleton } from '@/features/BookingPage/BookingDetailsCard/BookingDetailsCardSkeleton';
import type { Hotel } from '@/types/Hotel';

interface BookingGridProps {
  hotels: Hotel[];
  isLoading: boolean;
  onHotelMouseEnter?: (hotelId: string) => void;
  onHotelMouseLeave?: (hotelId: string) => void;
}

export function BookingGrid({
  hotels,
  isLoading,
  onHotelMouseEnter,
  onHotelMouseLeave,
}: BookingGridProps) {
  const renderSkeletons = () =>
    Array(4)
      .fill(0)
      .map((_, index) => <BookingDetailsCardSkeleton key={`skeleton-${index}`} />);

  const renderHotelCards = () =>
    hotels.map((hotel) => (
      <div
        key={hotel.id}
        onMouseEnter={() => onHotelMouseEnter?.(hotel.id)}
        onMouseLeave={() => onHotelMouseLeave?.(hotel.id)}
      >
        <BookingDetailsCard
          name={'ST Residences Novena'}
          image={'https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg'}
          address={'145A Moulmein Road'}
          roomType={'Deluxe King Room'}
          starRating={3}
          reviewScore={3}
          checkin={'2025-10-01'}
          checkout={'2025-10-10'}
          guests={2}
        />
      </div>
    ));

  return (
    <SimpleGrid type="container" cols={{ base: 2, '620px': 2 }} mb="xl">
      {isLoading ? renderSkeletons() : renderHotelCards()}
    </SimpleGrid>
  );
}
