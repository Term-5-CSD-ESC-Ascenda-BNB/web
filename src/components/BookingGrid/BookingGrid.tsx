import { SimpleGrid } from '@mantine/core';
import { BookingGridDetailsCard } from './BookingGridDetailsCard';
import { BookingDetailsCardSkeleton } from '@/features/BookingPage/BookingDetailsCard/BookingDetailsCardSkeleton';
import type { BookingDetails } from '@/hooks/useBookings';

interface BookingGridProps {
  bookings: BookingDetails[];
  isLoading: boolean;
  onHotelMouseEnter?: (hotelId: string) => void;
  onHotelMouseLeave?: (hotelId: string) => void;
  onHotelClick: (hotelId: string) => void;
}

export function BookingGrid({
  bookings,
  isLoading,
  onHotelMouseEnter,
  onHotelMouseLeave,
  onHotelClick,
  ...props
}: BookingGridProps) {
  const renderSkeletons = () =>
    Array(4)
      .fill(0)
      .map((_, index) => <BookingDetailsCardSkeleton key={`skeleton-${index}`} />);

  const renderBookingCards = () => {
    return bookings.map((booking) => (
      <div key={booking.hotelId}>
        <BookingGridDetailsCard
          name={'ST Residences Novena'}
          image={'https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg'}
          address={'145A Moulmein Road'}
          roomType={'Deluxe King Room'}
          starRating={3}
          reviewScore={3}
          checkin={'2025-10-01'}
          checkout={'2025-10-10'}
          guests={2}
          onMouseEnter={() => onHotelMouseEnter?.('050G')}
          onMouseLeave={() => onHotelMouseLeave?.('050G')}
          onClick={() => onHotelClick('050G')}
        />
      </div>
    ));
  };

  return (
    <SimpleGrid type="container" cols={{ base: 2, '620px': 2 }} mb={'xl'} {...props}>
      {isLoading ? renderSkeletons() : renderBookingCards()}
    </SimpleGrid>
  );
}
