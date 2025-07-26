import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from './api';
import { type HotelsResponse, FetchHotelsParamsSchema } from './schemas';
import { useSearch } from '@tanstack/react-router';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';

export function useHotels() {
  const search = useSearch({ from: '/search' });

  const params = {
    destination_id: search.uid || '',
    checkin: search.date[0],
    checkout: search.date[1],
    country_code: 'SG',
    lang: 'en',
    currency: 'SGD',
    guests: stringifyGuestsRooms(search.guests, search.rooms),
  };

  const parsedParams = FetchHotelsParamsSchema.parse(params);

  return useQuery<HotelsResponse, Error>({
    queryKey: ['hotels', params],
    queryFn: () => fetchHotels(parsedParams),
  });
}
