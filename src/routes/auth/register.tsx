import { AuthCard } from '@/features/AuthPage/components/AuthCard/AuthCard';
import { SocialLoginButtons } from '@/features/AuthPage/components/SocialLoginButtons/SocialLoginButtons';
import { RegisterForm } from '@/features/AuthPage/register/RegisterForm';
import { Divider, Flex } from '@mantine/core';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
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
