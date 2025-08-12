/* v8 ignore start */
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { loginUser } from '../api';
import type { AxiosError, AxiosResponse } from 'axios';
import type { LoginSchema } from '../schema';
import type { ResponseSchema } from '../../schemas/responseSchema';

export function useLoginMutation(
  options?: UseMutationOptions<AxiosResponse<ResponseSchema>, AxiosError, LoginSchema>
) {
  return useMutation<AxiosResponse<ResponseSchema>, AxiosError, LoginSchema>({
    mutationFn: loginUser,
    ...options,
  });
}
