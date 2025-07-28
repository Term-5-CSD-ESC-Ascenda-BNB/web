import { z } from 'zod';

export const ImageDetailsSchema = z.object({
  suffix: z.string(),
  count: z.number(),
  prefix: z.string(),
});

export const HotelSchema = z.object({
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

export const HotelsResponseSchema = z.object({
  completed: z.boolean(),
  currency: z.string(),
  hotels: z.array(HotelSchema),
});

export const FetchHotelsParamsSchema = z
  .object({
    destination_id: z.string().min(1, 'destination_id is required'),
    checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    country_code: z.string().length(2, 'must be ISO country code'),
    lang: z.string().min(2, 'lang is required'),
    currency: z.string().length(3, 'must be ISO currency code'),
    guests: z.string().regex(/^\d+(\|\d+)*$/, 'guests must be like `2` or `2|2|2`'),
  })
  .refine((obj) => obj.checkout > obj.checkin, {
    message: 'checkout date must be after checkin',
    path: ['checkout'],
  });

export type HotelsResponse = z.infer<typeof HotelsResponseSchema>;
export type FetchHotelsParams = z.infer<typeof FetchHotelsParamsSchema>;
