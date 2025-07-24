import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

export function useRegisterNotifications() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    const AUTO_CLOSE_MS = 2000;
    notifications.show({
      title: 'Registration successful',
      message: 'Redirecting to login...',
      color: 'green',
      withBorder: true,
      loading: true,
      withCloseButton: false,
      autoClose: AUTO_CLOSE_MS,
      position: 'bottom-right',
    });

    setTimeout(() => {
      void navigate({ to: '/auth/login', replace: true });
    }, AUTO_CLOSE_MS);
  };

  const handleError = (error: AxiosError) => {
    notifications.show({
      title: 'Registration Error',
      message: error.message || 'An error occurred during registration.',
      color: 'red',
      withBorder: true,
      withCloseButton: true,
      autoClose: 7000,
      position: 'bottom-right',
    });
  };

  return { handleSuccess, handleError };
}
