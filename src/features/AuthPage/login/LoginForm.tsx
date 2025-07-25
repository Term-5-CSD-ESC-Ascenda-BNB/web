import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { useLoginForm } from './hooks/useLoginForm';
import { useLoginMutation } from './hooks/useLoginMutation';
import { useLoginNotifications } from './hooks/useLoginNotifications';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';

export function LoginForm() {
  const form = useLoginForm();
  const mutation = useLoginMutation();
  const { handleSuccess, handleError } = useLoginNotifications();

  const handleSubmit = (values: typeof form.values) => {
    console.log('Submitting login form values:', values);
    mutation.mutate(values, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            placeholder="Email"
            {...form.getInputProps('email', { withError: false })}
            error={form.errors.email ? true : false}
          />
          <PasswordInput
            placeholder="Password"
            {...form.getInputProps('password', { withError: false })}
            error={form.errors.password ? true : false}
          />

          <SubmitButton disabled={mutation.isPending}>Log in</SubmitButton>
        </Stack>
      </form>
    </>
  );
}
