import axios from 'axios';
import { HotelsResponseSchema, type FetchHotelsParams } from '@/schemas/hotelResults';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

export async function fetchHotels(params: FetchHotelsParams) {
  // Log the full URL for debugging
  // const fullUrl = api.getUri({
  //   url: '/hotels/prices',
  //   params: payload,
  // });
  // console.log('Full API URL:', fullUrl);

  const response = await api.get('/hotels/prices', { params });

  const result = HotelsResponseSchema.safeParse(response.data);
  if (!result.success) {
    console.error('Invalid response from API:', result.error);
    throw new Error('Invalid response from API');
  } else {
    console.log('Fetched hotels successfully:', result.data);
    return result.data;
  }
}
