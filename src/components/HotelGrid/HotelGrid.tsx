import { SimpleGrid } from '@mantine/core';
import { CarouselCard, CarouselCardSkeleton } from '@/components/CarouselCard';
import type { Hotel } from '@/types/Hotel';

export interface HotelGridProps {
  hotels: Hotel[];
  isLoading: boolean;
  skeletonCount?: number;
}

export function HotelGrid({ hotels, isLoading, skeletonCount = 6 }: HotelGridProps) {
  const renderSkeletons = () => {
    return Array(skeletonCount)
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
