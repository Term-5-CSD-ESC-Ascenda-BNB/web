import { ImagePanel } from '@/features/AuthPage/components/ImagePanel/ImagePanel';
import { Box } from '@mantine/core';
import { useLocation } from '@tanstack/react-router';
import { animated, useSpring } from '@react-spring/web';
import { useEffect } from 'react';
import { LoginPanel } from '@/features/AuthPage/login/LoginPanel';
import { RegisterPanel } from '@/features/AuthPage/register/RegisterPanel';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();

  const [styles, api] = useSpring(() => ({
    left: pathname === '/login' ? '0%' : '-50%',
    config: { tension: 300, friction: 30 },
  }));

  useEffect(() => {
    if (pathname === '/login' || pathname === '/register') {
      const isLogin = pathname === '/login';
      void api.start({ to: { left: isLogin ? '0%' : '-50%' } });
    }
  }, [pathname, api]);

  return (
    <Box h="100vh" w="100%" pos="relative" style={{ overflow: 'hidden' }}>
      <animated.div
        style={{
          position: 'absolute',
          display: 'flex',
          width: '150%',
          height: '100%',
          ...styles,
        }}
      >
        <Box w={'50%'} h={'100%'} pos={'relative'}>
          <LoginPanel />
        </Box>
        <Box w={'50%'} h={'100%'} pos={'relative'}>
          <ImagePanel />
        </Box>
        <Box w={'50%'} h={'100%'} pos={'relative'}>
          <RegisterPanel />
        </Box>
      </animated.div>
    </Box>
  );
}
