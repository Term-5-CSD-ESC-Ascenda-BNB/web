import { Divider, Flex } from '@mantine/core';
import { AuthCard } from '../components/AuthCard/AuthCard';
import { LoginForm } from './LoginForm';
import { SocialLoginButtons } from '../components/SocialLoginButtons/SocialLoginButtons';

export function LoginPanel() {
  return (
    <>
      <Flex align={'center'} justify="center" style={{ height: '100vh', width: '100%' }}>
        <AuthCard
          title="Sign in and explore"
          subtitle="Your personalised recommendations, just a click away."
        >
          <LoginForm />
          <Divider my="lg" label="or continue with" labelPosition="center" />
          <SocialLoginButtons />
        </AuthCard>
      </Flex>
    </>
  );
}
