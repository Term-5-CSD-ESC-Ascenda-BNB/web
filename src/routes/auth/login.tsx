import { LoginForm } from '@/features/AuthPage/login/LoginForm';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
