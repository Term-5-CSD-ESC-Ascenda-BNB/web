import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://api-production-46df.up.railway.app';

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE_URL}/me/delete`, { withCredentials: true });
    },
  });
}
