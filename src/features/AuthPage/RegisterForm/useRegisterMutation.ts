import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { registerUser, type RegisterUserInput } from './registerApi';
import type { AxiosError, AxiosResponse } from 'axios';

export function useRegisterMutation(
  options?: UseMutationOptions<AxiosResponse<void>, AxiosError, RegisterUserInput>
) {
  return useMutation<AxiosResponse<void>, AxiosError, RegisterUserInput>({
    mutationFn: registerUser,
    ...options,
  });
}
