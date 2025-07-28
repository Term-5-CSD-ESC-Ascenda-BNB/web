import type { HotelSchema } from '@/schemas/hotelResults';
import { z } from 'zod';

export type ImageDetails = {
  suffix: string;
  count: number;
  prefix: string;
};

export type Hotel = z.infer<typeof HotelSchema>;
