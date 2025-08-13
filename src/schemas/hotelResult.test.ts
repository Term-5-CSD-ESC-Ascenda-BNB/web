import { describe, it, expect } from 'vitest';
import { HotelResponseSchema } from '@/schemas/hotelResult';

const validHotel = {
  id: 'hotel1',
  imageCount: 3,
  latitude: 1.234,
  longitude: 5.678,
  name: 'Test Hotel',
  address: '123 Road',
  address1: 'Suite 1',
  rating: 4.5,
  trustyou: {
    id: null,
    score: {
      overall: null,
      kaligo_overall: null,
      solo: null,
      couple: null,
      family: null,
      business: null,
    },
  },
  categories: {
    deluxe: { name: 'Deluxe', score: 8, popularity: 100 },
  },
  amenities_ratings: [{ name: 'WiFi', score: 5 }],
  description: 'A lovely place to stay.',
  amenities: { wifi: true, pool: false },
  original_metadata: { name: null, city: 'Metropolis', state: null, country: 'CountryX' },
  image_details: { suffix: '.jpg', count: 5, prefix: 'img_' },
  hires_image_index: '0',
  number_of_images: 5,
  default_image_index: 1,
  imgix_url: 'https://example.com/img.jpg',
  cloudflare_image_url: 'https://example.com/cf.jpg',
  checkin_time: '15:00',
};

describe('HotelResponseSchema', () => {
  it('parses a valid hotel object', () => {
    const parsed = HotelResponseSchema.parse(validHotel);
    expect(parsed).toEqual(validHotel);
  });

  it('throws when a required field is missing', () => {
    // name is required
    const { success, error } = HotelResponseSchema.safeParse({
      ...validHotel,
      name: undefined,
    });
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['name']);
    }
  });

  it('rejects invalid URLs for imgix_url and cloudflare_image_url', () => {
    expect(() =>
      HotelResponseSchema.parse({
        ...validHotel,
        imgix_url: 'not-a-url',
      })
    ).toThrow();
    expect(() =>
      HotelResponseSchema.parse({
        ...validHotel,
        cloudflare_image_url: '://bad-url',
      })
    ).toThrow();
  });

  it('allows null in nullable subfields', () => {
    const withNulls = {
      ...validHotel,
      trustyou: {
        id: 'trust123',
        score: {
          overall: null,
          kaligo_overall: null,
          solo: null,
          couple: null,
          family: null,
          business: null,
        },
      },
      original_metadata: { name: null, city: 'Metropolis', state: null, country: 'CountryX' },
    };
    const parsed = HotelResponseSchema.parse(withNulls);
    expect(parsed.trustyou.id).toBe('trust123');
    expect(parsed.trustyou.score.overall).toBeNull();
    expect(parsed.original_metadata.name).toBeNull();
  });

  it('fails when a numeric field has wrong type', () => {
    const { success, error } = HotelResponseSchema.safeParse({
      ...validHotel,
      rating: '4.5',
    });
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['rating']);
    }
  });
});
