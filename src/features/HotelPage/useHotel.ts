import type { HotelResponse } from '@/schemas/hotelResult';
import { FetchHotelsParamsSchema } from '@/schemas/hotelResults';
import type { ApiError } from '@/types/ApiError';
import { stringifyGuestsRooms } from '@/utils/stringifyGuestsRooms';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { fetchHotelDetails } from './api';
import { getHiresCount } from '@/utils/getHiresCount';

export function useHotel() {
  const searchParams = useSearch({ from: '/hotels/$hotelId' });
  const { hotelId } = useParams({ from: '/hotels/$hotelId' });

  const params = {
    destination_id: searchParams.uid || '',
    checkin: searchParams.date[0],
    checkout: searchParams.date[1],
    country_code: 'SG',
    lang: 'en',
    currency: 'SGD',
    guests: stringifyGuestsRooms(searchParams.guests, searchParams.rooms),
  };

  const parsedParams = FetchHotelsParamsSchema.parse(params);

  return useQuery<HotelResponse, AxiosError<ApiError>>({
    queryKey: ['hotel', { params, hotelId }],
    queryFn: () => fetchHotelDetails(hotelId, parsedParams),
    retry: (failureCount) => {
      return failureCount < 2; // Retry twice
    },
    select: (data) => {
      // replace image_details.count with hires_count
      const hiresCount = getHiresCount(data.hires_image_index);
      const imageDetails = {
        ...data.image_details,
        count: hiresCount,
      };

      const newData = {
        ...data,
        image_details: imageDetails,
      };

      return newData;
    },
  });
}
