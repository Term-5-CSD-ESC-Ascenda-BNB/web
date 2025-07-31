import { HotelResponseSchema, type FetchHotelParams } from '@/schemas/hotelResult';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

export async function fetchHotelDetails(hotelId: string, params: FetchHotelParams) {
  // Log the full url for debugging
  const fullUrl = api.getUri({
    url: `/hotels/${hotelId}`,
    params,
  });
  console.log('Full API URL:', fullUrl);

  const response = await api.get(`/hotels/${hotelId}`, { params });

  const result = HotelResponseSchema.safeParse(response.data);
  if (!result.success) {
    console.error('Invalid response from API:', result.error);
    throw new Error('Invalid response from API');
  } else {
    console.log('Fetched hotel details successfully:', result.data);
    return result.data;
  }
}
