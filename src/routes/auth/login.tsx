import { AuthCard } from '@/features/AuthPage/components/AuthCard/AuthCard';
import { SocialLoginButtons } from '@/features/AuthPage/components/SocialLoginButtons/SocialLoginButtons';
import { LoginForm } from '@/features/AuthPage/login/LoginForm';
import { Divider, Flex } from '@mantine/core';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
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
