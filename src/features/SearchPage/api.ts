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
  const payload = {
    destination_id: params.destination_id,
    checkin: params.checkin,
    checkout: params.checkout,
    country_code: params.country_code,
    lang: params.lang,
    currency: params.currency,
    guests: params.guests,
  };

  console.log('Fetching hotels with params:', payload);

  // Log the full URL for debugging
  // const fullUrl = api.getUri({
  //   url: '/hotels/prices',
  //   params: payload,
  // });
  // console.log('Full API URL:', fullUrl);

  const response = await api.get('/hotels/prices', { params: payload });

  const result = HotelsResponseSchema.safeParse(response.data);
  if (!result.success) {
    console.error('Invalid response from API:', result.error);
    throw new Error('Invalid response from API');
  } else {
    console.log('Fetched hotels successfully:', result.data);
    return result.data;
  }
}
