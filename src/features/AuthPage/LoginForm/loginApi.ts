import type { LoginSchema } from './loginSchema';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300,
});

export async function loginUser(data: LoginSchema) {
  return axiosInstance.post('/auth/login', data);
}
