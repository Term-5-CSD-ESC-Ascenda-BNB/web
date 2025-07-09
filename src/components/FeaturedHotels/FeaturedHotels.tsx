import { SimpleGrid } from '@mantine/core';
import { CarouselCard, CarouselCardSkeleton } from '@/components/CarouselCard';
import type { Hotel } from '@/types/Hotel';

interface FeaturedGridProps {
  hotels: Hotel[];
  isLoading: boolean;
  onHotelMouseEnter: (hotelId: string) => void;
  onHotelMouseLeave: (hotelId: string) => void;
}

export function FeaturedHotels({
  hotels,
  isLoading,
  onHotelMouseEnter,
  onHotelMouseLeave,
}: FeaturedGridProps) {
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
          images={hotel.images}
          price={hotel.price}
          score={hotel.score}
          onMouseEnter={() => onHotelMouseEnter(hotel.id)}
          onMouseLeave={() => onHotelMouseLeave(hotel.id)}
        />
      </div>
    ));
  };

  return (
    <SimpleGrid type="container" cols={{ base: 2, '620px': 3 }} mb={'xl'}>
      {isLoading ? renderSkeletons() : renderHotelCards()}
    </SimpleGrid>
  );
}
