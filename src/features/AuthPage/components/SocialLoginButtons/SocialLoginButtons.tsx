import { Group } from '@mantine/core';
import { IconBrandFacebook, IconBrandApple } from '@tabler/icons-react';
import { SocialButton } from '../SocialButton/SocialButton';
import { GoogleLoginButton } from '../../google/GoogleLoginButton';

export function SocialLoginButtons() {
  return (
    <Group align="center" justify="center" gap={16} mt="md" mb={4}>
      <GoogleLoginButton />
      <SocialButton disabled>
        <IconBrandFacebook size={26} color="#1877F3" />
      </SocialButton>
      <SocialButton disabled>
        <IconBrandApple size={26} color="#000" />
      </SocialButton>
    </Group>
  );
}
