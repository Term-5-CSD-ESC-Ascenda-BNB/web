import { ImagePanel } from '@/features/AuthPage/components/ImagePanel/ImagePanel';
import { Box } from '@mantine/core';
import { useLocation } from '@tanstack/react-router';
import { animated, useSpringValue } from '@react-spring/web';
import { LoginPanel } from '@/features/AuthPage/login/LoginPanel';
import { RegisterPanel } from '@/features/AuthPage/register/RegisterPanel';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();

  const isLogin = pathname === '/login';

  const leftValue = useSpringValue(isLogin ? '0%' : '-50%', {
    config: { tension: 300, friction: 30 },
  });

  const handleButtonClick = () => {
    console.log('Button clicked');
    if (isLogin) {
      void leftValue.start('-50%');
    } else {
      void leftValue.start('0%');
    }
  };

  return (
    <Box h="100vh" w="100%" pos="relative" style={{ overflow: 'hidden' }}>
      <animated.div
        style={{
          position: 'absolute',
          display: 'flex',
          width: '150%',
          height: '100%',
          left: leftValue,
        }}
      >
        <Box w={'50%'} h={'100%'} pos={'relative'}>
          <LoginPanel />
        </Box>
        <Box w={'50%'} h={'100%'} pos={'relative'}>
          <ImagePanel handleButtonClick={handleButtonClick} />
        </Box>
        <Box w={'50%'} h={'100%'} pos={'relative'}>
          <RegisterPanel />
        </Box>
      </animated.div>
    </Box>
  );
}
