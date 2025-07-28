import { SimpleGrid, type SimpleGridProps } from '@mantine/core';
import { CarouselCard, CarouselCardSkeleton } from '@/components/CarouselCard';
import { getFirstFiveImages } from '@/utils/getFirstFiveImages';
import type { Hotel } from '@/types/Hotel';

interface HotelGridProps extends SimpleGridProps {
  hotels: Hotel[];
  isLoading: boolean;
  onHotelMouseEnter?: (hotelId: string) => void;
  onHotelMouseLeave?: (hotelId: string) => void;
}

export function HotelGrid({
  hotels,
  isLoading,
  onHotelMouseEnter,
  onHotelMouseLeave,
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
          address={hotel.address ?? ''}
          rating={hotel.rating}
          images={getFirstFiveImages(hotel.image_details)}
          price={hotel.price}
          score={hotel.score}
          onMouseEnter={() => onHotelMouseEnter?.(hotel.id)}
          onMouseLeave={() => onHotelMouseLeave?.(hotel.id)}
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
