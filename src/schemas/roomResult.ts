import { z } from 'zod';

export const RoomRawSchema = z.object({
  key: z.string(),
  description: z.string(),
  roomDescription: z.string(),
  roomNormalizedDescription: z.string(),
  type: z.string(),
  free_cancellation: z.boolean(),
  long_description: z.string(),
  amenities: z.array(z.string()),
  images: z.array(z.object({ url: z.string() })),
  price: z.number(),
  roomAdditionalInfo: z
    .object({
      breakfastInfo: z.string().optional(),
    })
    .optional(),
});

export const RoomResultsSchema = z.object({
  completed: z.boolean().optional(),
  rooms: z.array(RoomRawSchema),
});

export type RoomRaw = z.infer<typeof RoomRawSchema>;
export type RoomResults = z.infer<typeof RoomResultsSchema>;
