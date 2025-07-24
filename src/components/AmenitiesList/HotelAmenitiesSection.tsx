import { Box } from '@mantine/core';
import { AmenitiesList } from './AmenitiesList';

interface HotelAmenitiesSectionProps {
  amenities?: Record<string, boolean | undefined>;
}

export function HotelAmenitiesSection({ amenities }: HotelAmenitiesSectionProps) {
  const formattedAmenities = amenities
    ? Object.keys(amenities)
        .filter((key) => amenities[key])
        .map((key) =>
          key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/t V/, 'TV')
        )
    : [];

  return (
    <Box style={{ flex: 1, minWidth: 300 }}>
      <AmenitiesList amenities={formattedAmenities} />
    </Box>
  );
}
