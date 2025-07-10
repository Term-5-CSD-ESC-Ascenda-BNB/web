import PaymentForm from '@/components/PaymentForm/PaymentForm';

export const Route = createFileRoute({
  component: Payment,
});

function Payment() {
  return (
    <>
      <div className="p-2">
        <PaymentForm></PaymentForm>
      </div>
    </>
  );
}
