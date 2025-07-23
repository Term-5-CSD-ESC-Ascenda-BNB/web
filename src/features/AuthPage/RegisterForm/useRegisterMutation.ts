import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { registerUser } from './registerApi';
import type { AxiosError, AxiosResponse } from 'axios';

type RegisterUserInput = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export function useRegisterMutation(
  options?: UseMutationOptions<AxiosResponse<void>, AxiosError, RegisterUserInput>
) {
  return useMutation<AxiosResponse<void>, AxiosError, RegisterUserInput>({
    mutationFn: registerUser,
    ...options,
  });
}
