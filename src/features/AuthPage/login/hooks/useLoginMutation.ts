import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { loginUser } from '../api';
import type { AxiosError, AxiosResponse } from 'axios';
import type { LoginSchema } from '../schema';

export function useLoginMutation(
  options?: UseMutationOptions<AxiosResponse<void>, AxiosError, LoginSchema>
) {
  return useMutation<AxiosResponse<void>, AxiosError, LoginSchema>({
    mutationFn: loginUser,
    ...options,
  });
}
