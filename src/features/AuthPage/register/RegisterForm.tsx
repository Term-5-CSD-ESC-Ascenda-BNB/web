import { Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useRegisterForm } from './hooks/useRegisterForm';
import { useRegisterMutation } from './hooks/useRegisterMutation';
import { useRegisterNotifications } from './hooks/useRegisterNotifications';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';

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
        <Stack gap={'xs'}>
          {/* First, last name */}
          <Group grow>
            <TextInput
              placeholder="First name"
              {...form.getInputProps('firstName', { withError: false })}
              error={form.errors.firstName ? true : false}
            />
            <TextInput
              placeholder="Last name"
              {...form.getInputProps('lastName', { withError: false })}
              error={form.errors.lastName ? true : false}
            />
          </Group>

          {/* Email */}
          <TextInput
            placeholder="Enter your email"
            {...form.getInputProps('email', { withError: false })}
            error={form.errors.email ? true : false}
          />

          {/* Password */}
          <PasswordInput
            placeholder="Password"
            {...form.getInputProps('password', { withError: false })}
            error={form.errors.password ? true : false}
          />
          <PasswordInput
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword', { withError: false })}
            error={form.errors.confirmPassword ? true : false}
          />

          <SubmitButton disabled={mutation.isPending}>Sign up</SubmitButton>
        </Stack>
      </form>
    </>
  );
}
