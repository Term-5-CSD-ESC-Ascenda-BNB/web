import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchHotels } from '@/features/SearchPage/api';
import { type HotelsResponse, FetchHotelsParamsSchema } from '@/schemas/hotelResults';
import type { AxiosError } from 'axios';

interface ApiError {
  message: string;
  status: number;
}

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

  return useQuery<HotelsResponse, AxiosError<ApiError>>({
    queryKey: ['hotels', params],
    queryFn: () => fetchHotels(parsedParams),
    placeholderData: keepPreviousData,
    retry: (failureCount) => {
      return failureCount < 2; // Retry twice
    },
    refetchInterval: (query) => {
      console.log('Refetching with query:', query);

      // if error stop polling
      if (query.state.status === 'error') {
        console.error('Error fetching hotels, stopping refetching:', query.state.error);
        return false;
      }

      // If data complete, return false to stop refetching else refetch in 2 sec
      return query.state.data?.completed ? false : 2000;
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
