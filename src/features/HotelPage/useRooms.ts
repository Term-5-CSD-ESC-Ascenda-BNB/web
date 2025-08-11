import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { RoomResultsSchema, type RoomResults } from '@/schemas/roomResult';
import { FetchHotelsParamsSchema } from '@/schemas/hotelResults';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/ApiError';

type Primitive = string | number | boolean | null | undefined;
type ParamValue = Primitive | Primitive[];

function toSearchParams(obj: Record<string, ParamValue>): URLSearchParams {
  const sp = new URLSearchParams();

  const append = (k: string, v: Primitive) => {
    if (v === null || v === undefined) return;
    if (typeof v === 'string') {
      sp.append(k, v);
    } else if (typeof v === 'number') {
      sp.append(k, String(v));
    } else if (typeof v === 'boolean') {
      sp.append(k, v ? 'true' : 'false');
    } else {
      throw new TypeError(`Unsupported value for "${k}"`);
    }
  };

  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      for (const item of v) append(k, item);
    } else {
      append(k, v);
    }
  }
  return sp;
}

export function useRooms() {
  const { hotelId } = useParams({ from: '/hotels/$hotelId' });
  const searchParams = useSearch({ from: '/hotels/$hotelId' });

  const [checkin, checkout] = Array.isArray(searchParams.date)
    ? [searchParams.date[0], searchParams.date[1]]
    : [undefined, undefined];

  const guests = (stringifyGuestsRooms(searchParams.guests, searchParams.rooms) ?? '').replace(
    /:/g,
    '|'
  );

  const params = {
    destination_id: searchParams.uid ?? '',
    checkin: checkin ?? '',
    checkout: checkout ?? '',
    lang: 'en',
    currency: 'SGD',
    country_code: 'SG',
    guests,
    partner_id: '1',
  };

  const parsed = FetchHotelsParamsSchema.parse(params);

  const queryKey = ['hotelRooms', String(hotelId), JSON.stringify(parsed)] as const;

  return useQuery<RoomResults, AxiosError<ApiError>>({
    queryKey,
    queryFn: async () => {
      const query = toSearchParams(parsed as unknown as Record<string, ParamValue>).toString();
      const res = await fetch(`/api/hotels/${hotelId}/price?${query}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch rooms: ${res.status} ${res.statusText}`);
      }
      const data: unknown = await res.json();
      return RoomResultsSchema.parse(data);
    },
    enabled:
      Boolean(hotelId) &&
      Boolean(params.destination_id) &&
      Boolean(params.checkin) &&
      Boolean(params.checkout) &&
      Boolean(guests),
    retry: (n) => n < 2,
    staleTime: 60_000,
  });
}
