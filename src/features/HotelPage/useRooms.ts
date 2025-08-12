import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { RoomResultsSchema, type RoomResults } from '@/schemas/roomResult';
import { FetchHotelsParamsSchema, type FetchHotelsParams } from '@/schemas/hotelResults';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/ApiError';

const convertToStringParams = (params: FetchHotelsParams): Record<string, string> => {
  const stringParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      stringParams[key] = String(value);
    }
  }

  return stringParams;
};

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
    partner_id: '1',
  };

  const parsedParams = FetchHotelsParamsSchema.parse(params);

  return useQuery<RoomResults, AxiosError<ApiError>>({
    queryKey: ['hotelRooms', hotelId, parsedParams],
    queryFn: async () => {
      const query = new URLSearchParams(convertToStringParams(parsedParams)).toString();
      const res = await fetch(`/api/hotels/${hotelId}/price?${query}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch rooms: ${res.statusText}`);
      }
      const data: unknown = await res.json();
      return RoomResultsSchema.parse(data);
    },
    enabled:
      !!hotelId && !!params.destination_id && !!params.checkin && !!params.checkout && !!guests,
    retry: (failureCount) => failureCount < 2,
  });
}
