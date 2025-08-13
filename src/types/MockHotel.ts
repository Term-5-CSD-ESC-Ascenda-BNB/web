import mockData from '@/.mock_data/hotels.json';

// TODO: remove this when no longer needed
export type BaseMockHotel = typeof mockData extends Array<infer U> ? U : never;

export type MockHotel = BaseMockHotel & {
  price: number;
  images: string[];
  score: number;
};

export interface TestHotel {
  id: string;
  name: string;
  images: string;
  address: string;
  roomType: string;
  starRating: number;
  reviewScore: number;
  checkin: string;
  checkout: string;
  guests: number;
}
