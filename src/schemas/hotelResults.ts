import { z } from 'zod';

/**
 * For hotel search results
 */

export const ImageDetailsSchema = z.object({
  suffix: z.string(),
  count: z.number(),
  prefix: z.string(),
});

/**
 * This schema represents a hotel result in the search response.
 */
export const HotelResultSchema = z.object({
  id: z.string(),
  searchRank: z.number(),
  price: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  address: z.string(),
  rating: z.number(),
  score: z.number().nullable(),
  image_details: ImageDetailsSchema,
});

/**
 * This schema represents the entire response from the hotel search API.
 */
export const HotelsResponseSchema = z.object({
  completed: z.boolean(),
  currency: z.string(),
  hotels: z.array(HotelResultSchema),
  hotelsTotalLength: z.number(),
});

/**
 * This schema represents the search parameters that will be submitted to the backend.
 */
export const FetchHotelsParamsSchema = z
  .object({
    destination_id: z.string().catch(''),
    checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    country_code: z.string().length(2, 'must be ISO country code'),
    lang: z.string().min(2, 'lang is required'),
    currency: z.string().length(3, 'must be ISO currency code'),
    guests: z.string().regex(/^\d+(\|\d+)*$/, 'guests must be like `2` or `2|2|2`'),
    page: z.number().int().min(1, 'page must be a positive integer').catch(1),
    sort: z.enum(['rating', 'price', 'score', 'name']).catch('rating'),
    order: z.enum(['asc', 'desc']).catch('desc'),
    minPrice: z.number().min(0, 'minPrice must be a non-negative number').optional(),
    maxPrice: z.number().min(0, 'maxPrice must be a non-negative number').optional(),
    minRating: z.number().min(0, 'minRating must be a non-negative number').optional(),
    minReviewScore: z.number().min(0, 'minReviewScore must be a non-negative number').optional(),
  })
  .refine((obj) => obj.checkout > obj.checkin, {
    message: 'checkout date must be after checkin',
    path: ['checkout'],
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: 'minPrice must be less than or equal to maxPrice',
      path: ['minPrice', 'maxPrice'],
    }
  );

/**
 * This type represents a single hotel result in the search response.
 */
export type HotelResult = z.infer<typeof HotelResultSchema>;

/**
 * This type represents the entire response from the hotel search API.
 */
export type HotelsResponse = z.infer<typeof HotelsResponseSchema>;

/**
 * This type represents the parameters used to fetch hotels.
 */
export type FetchHotelsParams = z.infer<typeof FetchHotelsParamsSchema>;
