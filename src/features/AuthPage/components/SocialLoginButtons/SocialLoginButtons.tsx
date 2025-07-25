import { Group } from '@mantine/core';
import { IconBrandGoogle, IconBrandFacebook, IconBrandApple } from '@tabler/icons-react';
import { SocialButton } from '../SocialButton/SocialButton';

interface SocialLoginButtonsProps {
  loading?: boolean;
  onGoogleClick?: () => void;
}

export function SocialLoginButtons({ loading = false, onGoogleClick }: SocialLoginButtonsProps) {
  return (
    <Group align="center" justify="center" gap={16} mt="md" mb={4}>
      <SocialButton onClick={onGoogleClick} disabled={loading}>
        <IconBrandGoogle size={26} color="#EA4335" />
      </SocialButton>
      <SocialButton disabled>
        <IconBrandFacebook size={26} color="#1877F3" />
      </SocialButton>
      <SocialButton disabled>
        <IconBrandApple size={26} color="#000" />
      </SocialButton>
    </Group>
  );
}
