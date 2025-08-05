import { z } from 'zod';

export const SORT_BY_FIELDS = ['rating', 'price', 'score', 'name'] as const;
export type SortBy = (typeof SORT_BY_FIELDS)[number];

function defaultDate() {
  const checkin = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const checkout = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  return [checkin.toISOString().split('T')[0], checkout.toISOString().split('T')[0]];
}

export const SearchParamsSchema = z.object({
  // basic search params
  uid: z.string().catch('RsBU'),
  term: z.string().catch('Singapore, Singapore'),
  date: z
    .tuple([z.string().nullable(), z.string().nullable()])
    .catch([defaultDate()[0], defaultDate()[1]]),
  guests: z.coerce.number().min(1).catch(1),
  rooms: z.coerce.number().min(1).catch(1),
  page: z.coerce.number().min(1).catch(1),

  // filtering and sorting
  sortBy: z.enum(SORT_BY_FIELDS).catch('rating'),
  sortOrder: z.enum(['asc', 'desc']).catch('desc'),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  minScore: z.coerce.number().optional(),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;
