import { describe, it, expect } from 'vitest';
import {
  ImageDetailsSchema,
  HotelResultSchema,
  HotelsResponseSchema,
  FetchHotelsParamsSchema,
} from './hotelResults';

describe('hotelResults schemas', () => {
  it('ImageDetailsSchema parses valid data', () => {
    const valid = { suffix: '.jpg', count: 5, prefix: 'img_' };
    const parsed = ImageDetailsSchema.parse(valid);
    expect(parsed).toEqual(valid);
  });

  it('HotelResultSchema parses a valid hotel result', () => {
    const valid = {
      id: 'h1',
      searchRank: 2,
      price: 120,
      latitude: 1.23,
      longitude: 4.56,
      name: 'Hotel One',
      address: '1 Test St',
      rating: 4.0,
      score: null,
      image_details: { suffix: '.png', count: 3, prefix: 'pre_' },
    };
    const parsed = HotelResultSchema.parse(valid);
    expect(parsed).toEqual(valid);
  });

  it('HotelsResponseSchema parses a valid response object', () => {
    const valid = {
      completed: true,
      currency: 'USD',
      hotels: [
        {
          id: 'h1',
          searchRank: 1,
          price: 100,
          latitude: 0,
          longitude: 0,
          name: 'Test',
          address: 'Addr',
          rating: 5,
          score: 9.5,
          image_details: { suffix: '.jpg', count: 2, prefix: 'x_' },
        },
      ],
      hotelsTotalLength: 1,
    };
    const parsed = HotelsResponseSchema.parse(valid);
    expect(parsed.hotelsTotalLength).toBe(1);
    expect(parsed.hotels[0].name).toBe('Test');
  });

  describe('FetchHotelsParamsSchema validation', () => {
    const base = {
      destination_id: 'DEST',
      checkin: '2025-08-15',
      checkout: '2025-08-20',
      country_code: 'SG',
      lang: 'en',
      currency: 'SGD',
      guests: '2|2',
      page: 1,
      sort: 'rating',
      order: 'desc',
    };

    it('accepts valid params', () => {
      const parsed = FetchHotelsParamsSchema.parse(base);
      expect(parsed).toEqual(base);
    });

    it('rejects when checkout ≤ checkin', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        checkout: '2025-08-15',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['checkout']);
      }
    });

    it('rejects malformed guests string', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        guests: '2||2',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['guests']);
      }
    });

    it('rejects invalid country_code length', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        country_code: 'SGP',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['country_code']);
      }
    });

    it('rejects invalid date formats', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        checkin: '15-08-2025',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['checkin']);
      }
    });

    it('rejects when minPrice > maxPrice', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        minPrice: 200,
        maxPrice: 100,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].path).toEqual(['minPrice', 'maxPrice']);
        expect(result.error.errors[0].message).toBe(
          'minPrice must be less than or equal to maxPrice'
        );
      }
    });

    it('accepts when minPrice <= maxPrice', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        minPrice: 100,
        maxPrice: 200,
      });
      expect(result.success).toBe(true);
    });

    it('accepts when minPrice equals maxPrice', () => {
      const result = FetchHotelsParamsSchema.safeParse({
        ...base,
        minPrice: 150,
        maxPrice: 150,
      });
      expect(result.success).toBe(true);
    });
  });
});
