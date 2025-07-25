import { Logo } from '@/components/Logo/Logo';
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Overlay,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Link, useLocation } from '@tanstack/react-router';
import styles from './ImagePanel.module.css';

export function ImagePanel() {
  const theme = useMantineTheme();

  const { pathname } = useLocation();

  // Initialise variables based on the current page
  const text = pathname === '/auth/login' ? "Don't have an account?" : 'Already have an account?';
  const buttonText = pathname === '/auth/login' ? 'Register' : 'Log in';
  const to = pathname === '/auth/login' ? '/auth/register' : '/auth/login';

  return (
    <>
      <Box flex={1} h={'100vh'} pos={'relative'}>
        <Logo
          pos={'absolute'}
          mx={'xl'}
          my={'lg'}
          c={theme.colors.gray[1]}
          style={{ zIndex: 100 }}
        />

        <BackgroundImage src="/assets/auth-background.webp" h={'100vh'}>
          <Overlay
            blur={3}
            zIndex={0}
            gradient="radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.6) 100%)"
          />
          <Overlay zIndex={0} color="black" opacity={0.7} />

          <Center>
            <Stack h={'100vh'} style={{ zIndex: 1 }} align="center" justify="center">
              <Title
                order={1}
                c={theme.colors.gray[0]}
                ff={theme.other.displayFont}
                fz={'2.5rem'}
                maw={'7.5em'}
                fw={500}
                ta={'center'}
              >
                {text}
              </Title>

              <Button
                component={Link}
                to={to}
                className={styles.frosted}
                size={'xl'}
                radius={'xl'}
                variant="outline"
              >
                {buttonText}
              </Button>
            </Stack>
          </Center>
        </BackgroundImage>
      </Box>
    </>
  );
}
