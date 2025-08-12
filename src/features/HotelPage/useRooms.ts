import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { RoomResultsSchema, type RoomResults } from '@/schemas/roomResult';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/ApiError';
import { z } from 'zod';

// Create a separate schema for room parameters
const FetchRoomsParamsSchema = z
  .object({
    destination_id: z.string().optional(),
    checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    country_code: z.string().length(2),
    lang: z.string().min(2),
    currency: z.string().length(3),
    guests: z.string().regex(/^\d+(\|\d+)*$/),
    // Removed partner_id - not accepted by rooms API
    // Only include sort if the API actually supports it with the correct values
    sort: z.enum(['price', 'rooms_available']).optional(),
  })
  .refine((obj) => obj.checkout > obj.checkin, {
    message: 'checkout date must be after checkin',
    path: ['checkout'],
  });

type FetchRoomsParams = z.infer<typeof FetchRoomsParamsSchema>;

export function useRooms() {
  const { hotelId } = useParams({ from: '/hotels/$hotelId' });
  const searchParams = useSearch({ from: '/hotels/$hotelId' });

  const guests = stringifyGuestsRooms(searchParams.guests, searchParams.rooms);

  const params = {
    destination_id: searchParams.uid || '',
    checkin: searchParams.date[0],
    checkout: searchParams.date[1],
    lang: 'en',
    currency: 'SGD',
    country_code: 'SG',
    guests,
    // Removed partner_id - not accepted by rooms API
    // Only include sort if you want to use it, and use a valid value
    // sort: 'price' as const,
  };

  const parsedParams = FetchRoomsParamsSchema.parse(params);

  return useQuery<RoomResults, AxiosError<ApiError>>({
    queryKey: ['hotelRooms', hotelId, parsedParams],
    queryFn: async () => {
      const convertToStringParams = (params: FetchRoomsParams): Record<string, string> => {
        const stringParams: Record<string, string> = {};
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined) {
            stringParams[key] = String(value);
          }
        }
        return stringParams;
      };

      const query = new URLSearchParams(convertToStringParams(parsedParams)).toString();
      const res = await fetch(`/api/hotels/${hotelId}/price?${query}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Room fetch error:', errorText);
        throw new Error(`Failed to fetch rooms: ${res.status} ${res.statusText}`);
      }

      const data: unknown = await res.json();
      return RoomResultsSchema.parse(data);
    },
    enabled:
      !!hotelId && !!params.destination_id && !!params.checkin && !!params.checkout && !!guests,
    retry: (failureCount) => failureCount < 2,
  });
}
