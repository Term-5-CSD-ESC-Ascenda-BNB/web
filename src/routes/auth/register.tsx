import { RegisterForm } from '@/features/AuthPage/register/RegisterForm';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
