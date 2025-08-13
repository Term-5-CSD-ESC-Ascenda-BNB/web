import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useDeleteAccount() {
  return useMutation({
    mutationFn: async () => {
      try {
        await axios.post(`https://api-production-46df.up.railway.app/me/delete`, null, {
          withCredentials: true,
        });
      } catch (error) {
        console.error('Delete account error:', error);
        throw error;
      }
    },
  });
}
