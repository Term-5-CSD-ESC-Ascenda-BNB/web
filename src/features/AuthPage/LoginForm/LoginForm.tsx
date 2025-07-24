import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useLoginForm } from './useLoginForm';
import { useLoginMutation } from './useLoginMutation';
import { useLoginNotifications } from './useLoginNotifications';

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
          <TextInput withAsterisk placeholder="Email" {...form.getInputProps('email')} />
          <PasswordInput withAsterisk placeholder="Password" {...form.getInputProps('password')} />
          <Button
            type="submit"
            size={'lg'}
            radius={'xl'}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Log in
          </Button>
        </Stack>
      </form>
    </>
  );
}
