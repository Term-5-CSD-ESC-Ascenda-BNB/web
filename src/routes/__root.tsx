import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '@/components/Footer/Footer';
import { Stack } from '@mantine/core';

export const Route = createRootRoute({
  component: () => (
    <>
      <Stack mih={'100vh'}>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </Stack>

      <TanStackRouterDevtools />
    </>
  ),
});
