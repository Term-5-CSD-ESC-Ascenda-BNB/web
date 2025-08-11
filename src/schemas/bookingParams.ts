import { z } from 'zod';

export const BookingParamsSchema = z.object({
  destination_id: z.string(),
  hotelId: z.string(),
  hotelName: z.string(),
  hotelAddress: z.string(),
  hotelImage: z.string().url(),
  roomDescription: z.string(),
  starRating: z.coerce.number(),
  trustYouScore: z.coerce.number(),
  country_code: z.string(),
  lang: z.string(),
  currency: z.string(),
  guests: z.coerce.number(),
  startDate: z.string(),
  endDate: z.string(),
  numberOfNights: z.coerce.number(),
  price: z.coerce.number(),
});
export type BookingParams = z.infer<typeof BookingParamsSchema>;
