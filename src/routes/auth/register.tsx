import { RegisterForm } from '@/features/AuthPage/RegisterForm/RegisterForm';

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
