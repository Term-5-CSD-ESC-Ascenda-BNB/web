import { z } from 'zod';

function defaultDate() {
  const checkin = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const checkout = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  return [checkin.toISOString().split('T')[0], checkout.toISOString().split('T')[0]];
}

export const SearchParamsSchema = z.object({
  uid: z.string().catch('RsBU'),
  term: z.string().catch('Singapore, Singapore'),
  date: z
    .tuple([z.string().nullable(), z.string().nullable()])
    .catch([defaultDate()[0], defaultDate()[1]]),
  guests: z.coerce.number().catch(1),
  rooms: z.coerce.number().catch(1),
  page: z.coerce.number().catch(1),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;
