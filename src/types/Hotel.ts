import mockData from '@/.mock_data/hotels.json';

// TODO: Explicitly define the type of hotel data
// This is just a temporary solution until the actual API is implemented
type MockHotel = typeof mockData extends Array<infer U> ? U : never;

export type Hotel = MockHotel & {
  price: number;
};
