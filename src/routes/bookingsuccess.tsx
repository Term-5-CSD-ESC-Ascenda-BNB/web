import HotelInfo from '@/features/BookingSuccessPage/HotelInfo/HotelInfo';
import PriceBreakdown from '@/features/BookingSuccessPage/PriceBreakdown/PriceBreakdown';
import { Container, Grid, Paper, Box, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

export const Route = createFileRoute({
  component: BookingSuccess,
});

function BookingSuccess() {
  const theme = useMantineTheme();
  return (
    <Box>
      <Paper p="md" radius="md" style={{ backgroundColor: '#fff9db' }}>
        <Stack align="center" gap="xs" mb={40}>
          <IconCircleCheck size={120} color="green" />
          <Title order={2}>Thank You! Payment Successful</Title>
        </Stack>
      </Paper>
      <Container size="lg" py="md">
        <Grid gutter="xl">
          <Grid.Col span={7}>
            <PriceBreakdown></PriceBreakdown>
          </Grid.Col>
          <Grid.Col span={5}>
            <HotelInfo></HotelInfo>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
