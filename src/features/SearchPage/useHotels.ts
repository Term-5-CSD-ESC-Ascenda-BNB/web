import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from './api';
import { type HotelsResponse, FetchHotelsParamsSchema } from '@/schemas/hotelResults';
import { useSearch } from '@tanstack/react-router';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/ApiError';

export function useHotels() {
  const search = useSearch({ from: '/search' });

  const params = {
    destination_id: search.uid || '',
    checkin: search.date[0],
    checkout: search.date[1],
    country_code: 'SG',
    lang: 'en_US',
    currency: 'SGD',
    guests: stringifyGuestsRooms(search.guests, search.rooms),
    sort: search.sortBy,
    order: search.sortOrder,
    // temporarily commented out while waiting for backend to support these filters
    // minPrice: search.minPrice,
    // maxPrice: search.maxPrice,
    // minRating: search.minRating,
    // minReviewScore: search.minScore,
    page: search.page || 1,
  };

  const parsedParams = FetchHotelsParamsSchema.parse(params);

  return useQuery<HotelsResponse, AxiosError<ApiError>>({
    queryKey: ['hotels', params],
    queryFn: () => fetchHotels(parsedParams),
    retry: (failureCount) => {
      // console.log('Retrying fetchHotels, failure count:', failureCount);
      return failureCount < 2; // Retry twice
    },
    refetchInterval: (query) => {
      // console.log('Refetching with query:', query);

      // if error stop polling
      if (query.state.status === 'error') {
        console.error('Error fetching hotels, stopping refetching:', query.state.error);
        return false;
      }

      // If data complete, return false to stop refetching else refetch in 2 sec
      return query.state.data?.completed ? false : 5000;
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
        score: hotel.score ? Number((hotel.score / 10).toFixed(2)) : null,
        price: Number((hotel.price / nights).toFixed(2)),
      }));

      const newData = {
        ...data,
        hotels,
      };

      return newData;
    },
  });
}
