import axios, { type AxiosResponse } from 'axios';
import type { RegisterSchema } from './registerSchema';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300,
});

export type RegisterUserInput = Omit<RegisterSchema, 'confirmPassword'>;

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 * @param data - The registration data containing email, password, confirmPassword, firstName, and lastName.
 * @returns A promise that resolves to the Axios response containing the server's response.
 */
export async function registerUser(data: RegisterUserInput): Promise<AxiosResponse<void>> {
  return axiosInstance.post('/auth/register', data);
}
