import { useGoogleMutation } from './useGoogleMutation';
import { useGoogleNotifications } from './useGoogleNotifications';
import { IconBrandGoogle } from '@tabler/icons-react';
import { SocialButton } from '../components/SocialButton/SocialButton';

export function GoogleLoginButton() {
  const mutation = useGoogleMutation();
  const { handleSuccess, handleError } = useGoogleNotifications();

  const onGoogleClick = () => {
    mutation.mutate(undefined, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <SocialButton onClick={onGoogleClick} disabled={mutation.isPending}>
      <IconBrandGoogle size={26} color="#EA4335" />
    </SocialButton>
  );
}
