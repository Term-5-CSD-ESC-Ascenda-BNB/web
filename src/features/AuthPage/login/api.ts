import type { ResponseSchema } from '../schemas/responseSchema';
import type { LoginSchema } from './schema';
import axios, { type AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300,
});

export async function loginUser(data: LoginSchema): Promise<AxiosResponse<ResponseSchema>> {
  return api.post('/auth/login', data);
}
