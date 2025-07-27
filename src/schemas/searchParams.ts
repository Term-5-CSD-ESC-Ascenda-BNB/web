import { z } from 'zod';

export const SearchParamsSchema = z.object({
  uid: z.string().catch(''),
  term: z.string().catch(''),
  date: z.tuple([z.string().nullable(), z.string().nullable()]).catch([null, null]),
  guests: z.coerce.number().catch(1),
  rooms: z.coerce.number().catch(1),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;
