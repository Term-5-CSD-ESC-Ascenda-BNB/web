import { HotelAmenitiesSection } from '@/components/AmenitiesList/HotelAmenitiesSection';

interface HotelAmenitiesProps {
  amenities: Record<string, boolean | undefined>;
}

export function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  return <HotelAmenitiesSection amenities={amenities} />;
}
