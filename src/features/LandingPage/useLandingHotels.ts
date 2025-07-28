import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '@/features/SearchPage/api';
import { type HotelsResponse, FetchHotelsParamsSchema } from '@/schemas/hotelResults';

export function useLandingHotels() {
  // Hardcoded params for the landing page just for show
  const params = {
    destination_id: 'RsBU',
    checkin: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    checkout: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    country_code: 'SG',
    lang: 'en',
    currency: 'SGD',
    guests: '1',
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

      const checkinDate = parsedParams.checkin;
      const checkoutDate = parsedParams.checkout;

      const nights = Math.ceil(
        (new Date(checkoutDate).getTime() - new Date(checkinDate).getTime()) / (1000 * 60 * 60 * 24)
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
