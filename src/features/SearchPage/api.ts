import axios from 'axios';
import { HotelsResponseSchema, type FetchHotelsParams } from './schemas';

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

  const response = await api.get('/hotels/prices', { params: payload });

  return HotelsResponseSchema.parse(response.data);
}
