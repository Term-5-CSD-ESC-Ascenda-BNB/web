import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';
import type { ResponseSchema } from '@/features/AuthPage/schemas/responseSchema';

export function useGoogleNotifications() {
  const navigate = useNavigate();

  const handleSuccess = (user: ResponseSchema) => {
    notifications.show({
      title: 'Logged in with Google',
      message: `Welcome, ${user.firstName}! Redirecting…`,
      color: 'green',
      withBorder: true,
      loading: true,
      autoClose: 2000,
      position: 'bottom-right',
    });
    setTimeout(() => void navigate({ to: '/', replace: true }), 2000);
  };

  const handleError = (error: unknown) => {
    notifications.show({
      title: 'Google Login Failed',
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      color: 'red',
      withBorder: true,
      autoClose: 5000,
      position: 'bottom-right',
    });
  };

  return { handleSuccess, handleError };
}
