import mockData from '@/.mock_data/hotels.json';

// Use inferred shape of mock hotel object
type MockHotel = typeof mockData extends Array<infer U> ? U : never;

// Main Hotel type (with additions)
export type Hotel = MockHotel & {
  price: number;
  images: string[];
  score: number;
};

// For HotelReviews
export interface AmenityRating {
  name: string;
  score: number;
}

export interface TrustYouScore {
  score: {
    overall?: number | null;
    [key: string]: number | null | undefined;
  };
}

// Optional: used for props in HotelSurroundings
export interface Surrounding {
  type: string;
  name: string;
  distance: string;
  latitude: number;
  longitude: number;
}
