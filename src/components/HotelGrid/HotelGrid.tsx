import { SimpleGrid, type SimpleGridProps } from '@mantine/core';
import { CarouselCard, CarouselCardSkeleton } from '@/components/CarouselCard';
import type { HotelResult } from '@/schemas/hotelResults';

interface HotelGridProps extends SimpleGridProps {
  hotels: HotelResult[];
  isLoading: boolean;
  onHotelMouseEnter?: (hotelId: string) => void;
  onHotelMouseLeave?: (hotelId: string) => void;
  onHotelClick: (hotelId: string) => void;
}

export function HotelGrid({
  hotels,
  isLoading,
  onHotelMouseEnter,
  onHotelMouseLeave,
  onHotelClick,
  ...props
}: HotelGridProps) {
  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`}>
          <CarouselCardSkeleton />
        </div>
      ));
  };

  const renderHotelCards = () => {
    return hotels.map((hotel) => (
      <div key={hotel.id}>
        <CarouselCard
          id={hotel.id}
          name={hotel.name}
          address={hotel.address}
          rating={hotel.rating}
          imageDetails={hotel.image_details}
          price={hotel.price}
          score={hotel.score}
          onMouseEnter={() => onHotelMouseEnter?.(hotel.id)}
          onMouseLeave={() => onHotelMouseLeave?.(hotel.id)}
          onClick={() => onHotelClick(hotel.id)}
        />
      </div>
    ));
  };

  return (
    <SimpleGrid type="container" cols={{ base: 2, '620px': 3 }} mb={'xl'} {...props}>
      {isLoading ? renderSkeletons() : renderHotelCards()}
    </SimpleGrid>
  );
}
