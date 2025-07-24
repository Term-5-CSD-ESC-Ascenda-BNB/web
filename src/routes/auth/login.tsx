import { LoginForm } from '@/features/AuthPage/LoginForm/LoginForm';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
