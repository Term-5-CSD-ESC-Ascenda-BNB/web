/* v8 ignore start */

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { loginWithGoogle } from './googleApi';
import type { ResponseSchema } from '@/features/AuthPage/schemas/responseSchema';

export function useGoogleMutation(options?: UseMutationOptions<ResponseSchema, Error, void>) {
  return useMutation<ResponseSchema, Error, void>({
    mutationFn: loginWithGoogle,
    ...options,
  });
}
