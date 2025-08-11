import { z } from 'zod';

export const SORT_BY_FIELDS = ['rating', 'price', 'score', 'name'] as const;
export type SortBy = (typeof SORT_BY_FIELDS)[number];

export const defaultDate = (): [string, string] => {
  const checkin = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const checkout = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  return [checkin.toISOString().split('T')[0], checkout.toISOString().split('T')[0]];
};

const safeNumber = (defaultValue: number, min = 1, max = Number.MAX_SAFE_INTEGER) =>
  z.any().transform((val) => {
    try {
      const num = Number(val);
      if (isNaN(num) || !isFinite(num) || num < min || num > max) {
        return defaultValue;
      }
      return Math.floor(num);
    } catch {
      return defaultValue;
    }
  });

const safeOptionalNumber = (min = 0, max = Number.MAX_SAFE_INTEGER) =>
  z.any().transform((val) => {
    try {
      if (val === undefined || val === null || val === '') return undefined;
      const num = Number(val);
      if (isNaN(num) || !isFinite(num) || num < min || num > max) {
        return undefined;
      }
      return num;
    } catch {
      return undefined;
    }
  });

export const SearchParamsSchema = z
  .object({
    // basic search params
    uid: z.string().catch('RsBU'),
    term: z.string().catch('Singapore, Singapore'),
    date: z
      .tuple([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)])
      .refine((checkout) => checkout[0] < checkout[1], {
        message: 'Check-in date must be before check-out date',
      })
      .catch([defaultDate()[0], defaultDate()[1]]),
    guests: safeNumber(1, 1, 10),
    rooms: safeNumber(1, 1, 10),
    page: safeNumber(1, 1),

    // filtering and sorting
    sortBy: z.enum(SORT_BY_FIELDS).catch('rating'),
    sortOrder: z.enum(['asc', 'desc']).catch('desc'),
    minPrice: safeOptionalNumber(0, 100000),
    maxPrice: safeOptionalNumber(0, 100000),
    minRating: safeOptionalNumber(0, 5),
    minScore: safeOptionalNumber(0, 10),
  })
  .transform((data) => {
    // Auto-fix: if rooms > guests, set rooms = guests
    if (data.rooms > data.guests) {
      return { ...data, rooms: data.guests };
    }
    return data;
  });

export type SearchParams = z.infer<typeof SearchParamsSchema>;
