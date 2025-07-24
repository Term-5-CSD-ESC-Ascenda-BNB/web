import { Box, Group, useMantineTheme } from '@mantine/core';
import { Outlet, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useMantineTheme();
  const { pathname } = useLocation();

  return (
    <Group gap={0}>
      <Box mih={'100vh'} flex={1} bg={theme.colors.primary[5]}>
        Test
      </Box>
      <Box mih={'100vh'} flex={1}>
        <Outlet />
      </Box>
    </Group>
  );
}
