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
  type BoxComponentProps,
  type ElementProps,
} from '@mantine/core';
import { Link, useLocation } from '@tanstack/react-router';
import styles from './ImagePanel.module.css';

interface ImagePanelProps extends BoxComponentProps, ElementProps<'div'> {}

export function ImagePanel({ h = '100vh', pos = 'relative', ...props }: ImagePanelProps) {
  const theme = useMantineTheme();

  const { pathname } = useLocation();

  // Initialise variables based on the current page
  const text = pathname === '/register' ? 'Already have an account?' : "Don't have an account?";
  const buttonText = pathname === '/register' ? 'Log in' : 'Register';
  const to = pathname === '/register' ? '/login' : '/register';

  return (
    <>
      <Box h={h} pos={pos} {...props}>
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
