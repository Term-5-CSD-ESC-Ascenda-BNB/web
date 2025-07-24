import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useRegisterForm } from './useRegisterForm';
import { useRegisterMutation } from './useRegisterMutation';
import { useRegisterNotifications } from './useRegisterNotifications';

export function RegisterForm() {
  const form = useRegisterForm();
  const mutation = useRegisterMutation();
  const { handleSuccess, handleError } = useRegisterNotifications();

  const handleSubmit = (values: typeof form.values) => {
    // Omit confirmPassword from the data
    const { confirmPassword: _, ...data } = values;

    console.log('Submitting form values:', data);

    mutation.mutate(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {/* First, last name */}
          <Group grow>
            <TextInput withAsterisk placeholder="First name" {...form.getInputProps('firstName')} />
            <TextInput withAsterisk placeholder="Last name" {...form.getInputProps('lastName')} />
          </Group>

          {/* Email */}
          <TextInput withAsterisk placeholder="Enter your email" {...form.getInputProps('email')} />

          {/* Password */}
          <PasswordInput withAsterisk placeholder="Password" {...form.getInputProps('password')} />
          <PasswordInput
            withAsterisk
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />

          {/* Submit button */}
          <Button
            type="submit"
            size={'lg'}
            radius={'xl'}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Sign up
          </Button>
        </Stack>
      </form>
    </>
  );
}
