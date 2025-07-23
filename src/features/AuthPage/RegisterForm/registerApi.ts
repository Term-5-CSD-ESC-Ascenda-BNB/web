import axios, { type AxiosResponse } from 'axios';
import type { RegisterSchema } from './registerSchema';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 * @param data - The registration data containing email, password, confirmPassword, firstName, and lastName.
 * @returns A promise that resolves to the Axios response containing the server's response.
 */
export async function registerUser(data: RegisterSchema): Promise<AxiosResponse<void>> {
  return axios.post(`${API_BASE_URL}/auth/register`, data);
}
