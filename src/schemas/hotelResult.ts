/**
 * For individual hotel results
 */
import { z } from 'zod';
import type { FetchHotelsParams } from './hotelResults';

export const HotelResponseSchema = z.object({
  id: z.string(),
  imageCount: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  address: z.string(),
  address1: z.string(),
  rating: z.number(),
  trustyou: z.object({
    id: z.string().nullable(),
    score: z.object({
      overall: z.number().nullable(),
      kaligo_overall: z.number().nullable(),
      solo: z.number().nullable(),
      couple: z.number().nullable(),
      family: z.number().nullable(),
      business: z.number().nullable(),
    }),
  }),
  categories: z.record(
    z.object({
      name: z.string(),
      score: z.number(),
      popularity: z.number(),
    })
  ),
  amenities_ratings: z.array(
    z.object({
      name: z.string(),
      score: z.number(),
    })
  ),
  description: z.string(),
  amenities: z.record(z.boolean()),
  original_metadata: z.object({
    name: z.string().nullable(),
    city: z.string(),
    state: z.string().nullable(),
    country: z.string(),
  }),
  image_details: z.object({
    suffix: z.string(),
    count: z.number(),
    prefix: z.string(),
  }),
  hires_image_index: z.string(),
  number_of_images: z.number(),
  default_image_index: z.number(),
  imgix_url: z.string().url(),
  cloudflare_image_url: z.string().url(),
  checkin_time: z.string(),
});

export type HotelResponse = z.infer<typeof HotelResponseSchema>;
export type FetchHotelParams = FetchHotelsParams;
