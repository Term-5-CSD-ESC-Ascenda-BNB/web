import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from './api';
import { type HotelsResponse, FetchHotelsParamsSchema } from '@/schemas/hotelResults';
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
    retry: (failureCount, error) => {
      console.error(`Error fetching hotels (attempt ${failureCount}):`, error);
      return failureCount < 10; // Retry up to 10 times
    },
    refetchInterval: (query) => {
      console.log('Refetching hotels data...');
      console.log('Current query:', query);

      const data = query.state.data;
      console.log('Current data:', data);

      // If data complete, return false to stop refetching else refetch in 2 sec
      return data?.completed ? false : 2000;
    },

    select: (data) => {
      // Get no of nights from checkin and checkout in seach params
      if (search.date.length !== 2) throw new Error('Invalid search date parameters');

      const checkinDate = new Date(search.date[0] ?? '');
      const checkoutDate = new Date(search.date[1] ?? '');

      if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
        throw new Error('Invalid checkin or checkout date');
      }

      const nights = Math.ceil(
        (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // For all hotels divide score by 10 to match the UI requirements
      const hotels = data.hotels.map((hotel) => ({
        ...hotel,
        score: hotel.score ? hotel.score / 10 : null,
        price: hotel.price / nights, // Adjust price based on number of nights
      }));

      const newData = {
        ...data,
        hotels,
      };

      return newData;
    },
  });
}
