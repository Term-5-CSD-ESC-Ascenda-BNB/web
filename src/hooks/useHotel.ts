import hotelsData from '@/.mock_data/hotels.json';

type MockHotel = typeof hotelsData extends Array<infer U> ? U : never;

export function useHotel(hotelId: string) {
  // TODO: Implement actual data fetching
  const baseHotel = hotelsData.find((hotel: MockHotel) => hotel.id === hotelId);

  const images: string[] = [];
  if (baseHotel?.image_details && baseHotel.hires_image_index) {
    const { prefix, suffix } = baseHotel.image_details;
    const indices = baseHotel.hires_image_index
      .split(',')
      .map((i: string) => i.trim())
      .slice(0, 5);

    for (const idx of indices) {
      images.push(`${prefix}${idx}${suffix}`);
    }
  }

  return {
    hotel: baseHotel,
    images,
    isLoading: false, // TODO: Implement actual loading state
    error: null, // TODO: Implement actual error handling
  };
}
