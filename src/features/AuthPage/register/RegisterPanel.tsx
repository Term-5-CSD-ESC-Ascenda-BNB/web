import { Divider, Flex } from '@mantine/core';
import { AuthCard } from '../components/AuthCard/AuthCard';
import { RegisterForm } from './RegisterForm';
import { SocialLoginButtons } from '../components/SocialLoginButtons/SocialLoginButtons';

export function RegisterPanel() {
  return (
    <>
      <Flex align={'center'} justify="center" style={{ height: '100vh', width: '100%' }}>
        <AuthCard
          title="Create an account"
          subtitle="Join us and start exploring personalized recommendations."
        >
          <RegisterForm />
          <Divider my="lg" label="or continue with" labelPosition="center" />
          <SocialLoginButtons />
        </AuthCard>
      </Flex>
    </>
  );
}
