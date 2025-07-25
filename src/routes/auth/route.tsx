import { ImagePanel } from '@/features/AuthPage/components/ImagePanel/ImagePanel';
import { Box, Group } from '@mantine/core';
import { Outlet, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();

  return (
    <Group gap={0}>
      {pathname === '/auth/login' && <ImagePanel />}

      <Box h={'100vh'} flex={1}>
        <Outlet />
      </Box>

      {pathname === '/auth/register' && <ImagePanel />}
    </Group>
  );
}
