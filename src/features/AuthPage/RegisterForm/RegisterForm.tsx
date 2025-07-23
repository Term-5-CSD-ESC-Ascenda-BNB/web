import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useRegisterForm } from './useRegisterForm';
import { useRegisterMutation } from './useRegisterMutation';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';

export function RegisterForm() {
  const navigate = useNavigate();

  const form = useRegisterForm();
  const mutation = useRegisterMutation();

  const handleSubmit = (values: typeof form.values) => {
    console.log('Form values:', values);

    mutation.mutate(values, {
      onSuccess: () => {
        console.log('Registration successful');
        void navigate({
          to: '/auth/login',
          replace: true,
        });
      },
      onError: (error) => {
        console.error('Registration failed:', error);

        notifications.show({
          title: 'Registration Error',
          message: error.message || 'An error occurred during registration.',
          color: 'red',
          autoClose: 5000,
          withCloseButton: true,
          position: 'bottom-right',
        });
      },
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
