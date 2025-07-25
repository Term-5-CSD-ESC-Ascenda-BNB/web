import hotelsData from '@/.mock_data/hotels.json';

type MockHotel = typeof hotelsData extends Array<infer U> ? U : never;

export type Hotel = MockHotel & {
  images: string[];
  price: number;
  score: number;
};

export function useHotel(hotelId: string) {
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

  const enrichedHotel: Hotel | null = baseHotel
    ? {
        ...baseHotel,
        images,
        price: Math.floor(Math.random() * 200) + 100,
        score: baseHotel.trustyou?.score?.overall ?? 0,
      }
    : null;

  return {
    hotel: enrichedHotel,
    images,
    isLoading: false,
    error: null,
  };
}
