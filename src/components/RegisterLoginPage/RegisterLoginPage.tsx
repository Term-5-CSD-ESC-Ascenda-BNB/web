import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  PasswordInput,
  TextInput,
  Text,
  Alert,
  rem,
} from '@mantine/core';
import { SocialLoginButtons } from '../../features/AuthPage/components/SocialLoginButtons/SocialLoginButtons';
import { IconBrandGoogle, IconBrandFacebook, IconBrandApple } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

const API_URL: string = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000';
// const API_URL = import.meta.env.DEV ? '/api' : 'https://api-production-46df.up.railway.app';

export function RegisterLoginPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [errorState, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const regForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstName: (v) => (!v ? 'First name required' : null),
      lastName: (v) => (!v ? 'Last name required' : null),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length < 8 ? 'Password must be at least 8 characters' : null),
      confirmPassword: (v, values) => (v !== values.password ? 'Passwords do not match' : null),
    },
  });

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (!v ? 'Password required' : null),
    },
  });

  const handleRegister = async (values: typeof regForm.values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      });
      if (res.status === 201) {
        setSuccess('Registration successful! Please log in.');
        regForm.reset();
        setIsRegister(false);
      } else if (res.status === 409) {
        setError('This email is already registered.');
      } else {
        setError(await res.text());
      }
    } catch (err: unknown) {
      console.error(err);
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values: typeof loginForm.values) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      if (res.status === 201) {
        setSuccess('Login successful! Redirecting...');
        // setTimeout(() => (window.location.href = '/search'), 1000);
      } else if (res.status === 400) {
        setError('Invalid email or password.');
      } else {
        setError(await res.text());
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    const popup = window.open(`${API_URL}/auth/google`, 'oauth', 'width=500,height=600');
    if (!popup) {
      setError('Popup blocked. Please allow popups and try again.');
      return;
    }

    const popupTimer = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupTimer);
        setError('Authentication popup closed. Please try again.');
      }
    }, 500);

    const messageHandler = (event: MessageEvent) => {
      console.log(event);
      console.log('Received message:', event.data);
      console.log('Event origin:', event.origin);

      // Accept only messages from your API
      if (!event.origin.startsWith(API_URL)) return;

      const data = event.data as { type: string; message?: string } | undefined;

      if (data?.type === 'OAUTH_SUCCESS') {
        clearInterval(popupTimer);
        popup.close();
        setSuccess('Login successful! Redirecting...');
        // setTimeout(() => (window.location.href = '/search'), 1000);
      } else if (data?.type === 'OAUTH_ERROR') {
        clearInterval(popupTimer);
        popup.close();
        setError(data.message || 'Google login failed. Please try again.');
      }
    };

    window.addEventListener('message', messageHandler);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('message', messageHandler);
      clearInterval(popupTimer);
    };
  };

  const leftBoxBackground = {
    background: `linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.35) 50%), url('/assets/background.png') center/cover no-repeat`,
    minHeight: '100vh',
  };

  const serif = '"Cormorant Garamond", Georgia, Times, serif';

  return (
    <Flex
      mih="100vh"
      style={{
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left panel */}
      <Box w="50vw" pos="relative" style={leftBoxBackground}>
        <Box pos="absolute" top={rem(32)} left={rem(40)}>
          <Text
            style={{
              fontFamily: serif,
              color: '#fff',
              fontSize: '1.6rem',
              fontWeight: 400,
              letterSpacing: -1,
            }}
          >
            Wayfare
          </Text>
        </Box>
        <Flex direction="column" align="center" justify="center" h="100vh" w="100%">
          <Text
            ta="center"
            style={{
              color: '#fff',
              fontFamily: serif,
              fontWeight: 400,
              fontSize: '2.7rem',
              lineHeight: '1.1',
              marginBottom: rem(12),
              letterSpacing: '-0.5px',
              marginTop: rem(-40),
            }}
          >
            {isRegister ? 'Already have an account?' : 'New to Wayfare?'}
          </Text>
          <Button
            variant="outline"
            size="lg"
            radius="xl"
            fw={400}
            color="#fff"
            px="xl"
            style={{
              borderColor: 'white',
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              fontFamily: serif,
              fontSize: '1.3rem',
              minWidth: 140,
            }}
            onClick={() => {
              setIsRegister((v) => !v);
              setError(null);
              setSuccess(null);
              regForm.reset();
              loginForm.reset();
            }}
          >
            {isRegister ? 'Log in' : 'Create account'}
          </Button>
        </Flex>
      </Box>
      {/* Right panel */}
      <Flex
        w="50vw"
        h="100vh"
        align="center"
        justify="center"
        style={{
          background: 'linear-gradient(120deg, #fff 60%, #f6f7fa 120%)',
        }}
      >
        <Card
          radius="xl"
          p={48}
          style={{
            minWidth: 420,
            maxWidth: 480,
            width: '100%',
            background: '#fff',
            border: '1px solid #F2F2F7',
            boxShadow: '0 8px 28px 0 rgba(100,100,120,0.08)',
          }}
        >
          <Text
            ta="center"
            mb={2}
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: '2.4rem',
              letterSpacing: -1,
              lineHeight: 1,
            }}
          >
            {isRegister ? 'Create your account' : 'Log in to your account'}
          </Text>
          <Text
            size="md"
            ta="center"
            c="gray.7"
            mb="xl"
            style={{ fontFamily: 'inherit', fontWeight: 400 }}
          >
            Carefully selected stays, one account away.
          </Text>
          {errorState && (
            <Alert color="red" mb="xs">
              {errorState}
            </Alert>
          )}
          {success && (
            <Alert color="green" mb="xs">
              {success}
            </Alert>
          )}
          <form
            autoComplete="off"
            onSubmit={
              isRegister ? regForm.onSubmit(handleRegister) : loginForm.onSubmit(handleLogin)
            }
          >
            {isRegister && (
              <Group grow gap="sm" mb="sm" style={{ alignItems: 'flex-start' }}>
                <TextInput
                  placeholder="First name"
                  {...regForm.getInputProps('firstName')}
                  radius="md"
                  styles={{ input: { fontFamily: serif, fontSize: 17 } }}
                  data-autofocus
                />
                <TextInput
                  placeholder="Last name"
                  {...regForm.getInputProps('lastName')}
                  radius="md"
                  styles={{ input: { fontFamily: serif, fontSize: 17 } }}
                />
              </Group>
            )}
            <TextInput
              placeholder="Email"
              {...(isRegister ? regForm.getInputProps('email') : loginForm.getInputProps('email'))}
              radius="md"
              mb="sm"
              styles={{ input: { fontFamily: serif } }}
              autoComplete="email"
            />
            <PasswordInput
              placeholder="Password"
              {...(isRegister
                ? regForm.getInputProps('password')
                : loginForm.getInputProps('password'))}
              radius="md"
              mb="sm"
              styles={{ input: { fontFamily: serif } }}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
            {isRegister && (
              <PasswordInput
                placeholder="Confirm Password"
                {...regForm.getInputProps('confirmPassword')}
                radius="md"
                mb="md"
                styles={{ input: { fontFamily: serif } }}
                autoComplete="new-password"
              />
            )}
            <Button
              type="submit"
              size="lg"
              radius="xl"
              fullWidth
              loading={loading}
              style={{
                background: '#746cb3',
                fontSize: '1.17rem',
                marginTop: rem(16),
                marginBottom: rem(14),
                height: '48px',
                fontFamily: serif,
                fontWeight: 500,
              }}
              disabled={loading}
            >
              {isRegister ? 'Sign up' : 'Log in'}
            </Button>
          </form>
          <Divider my="sm" label="or login with" labelPosition="center" />
          <SocialLoginButtons loading={loading} onGoogleClick={handleGoogle} />
        </Card>
      </Flex>
    </Flex>
  );
}
