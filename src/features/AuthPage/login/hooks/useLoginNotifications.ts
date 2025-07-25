import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

export function useLoginNotifications() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    const AUTO_CLOSE_MS = 2000;
    notifications.show({
      title: 'Login successful',
      message: 'Redirecting...',
      color: 'green',
      withBorder: true,
      loading: true,
      withCloseButton: false,
      autoClose: AUTO_CLOSE_MS,
      position: 'bottom-right',
    });

    setTimeout(() => {
      void navigate({ to: '/', replace: true });
    }, AUTO_CLOSE_MS);
  };

  const handleError = (error: AxiosError) => {
    notifications.show({
      title: 'Login Error',
      message: error.message || 'An error occurred during login.',
      color: 'red',
      autoClose: 5000,
      withBorder: true,
      withCloseButton: true,
      position: 'bottom-right',
    });
  };

  return { handleSuccess, handleError };
}
