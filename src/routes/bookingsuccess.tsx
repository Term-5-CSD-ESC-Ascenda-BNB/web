import HotelInfo from '@/features/BookingSuccessPage/HotelInfo/HotelInfo';
import PriceBreakdown from '@/features/BookingSuccessPage/PriceBreakdown/PriceBreakdown';
import { Container, Grid, Paper, Box, Stack, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IndexTopNavBar } from '@/features/LandingPage/IndexTopNavBar/IndexTopNavBar';
export const Route = createFileRoute({
  component: BookingSuccess,
  validateSearch: (search) => {
    return {
      bookingId: String(search.bookingId),
      startDate: String(search.startDate),
      endDate: String(search.endDate),
      nights: Number(search.nights),
      roomDescription: String(search.roomDescription),
      price: Number(search.price),
      currency: String(search.currency),
      hotelName: String(search.hotelName),
      hotelImage: String(search.hotelImage),
      address: String(search.address),
      rooms: Number(search.rooms),
    };
  },
});
function BookingSuccess() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    void confetti({
      particleCount: 150,
      spread: 160,
      origin: { y: 0.6 },
    });
  }, []);
  const {
    bookingId,
    startDate,
    endDate,
    nights,
    roomDescription,
    price,
    currency,
    hotelName,
    hotelImage,
    address,
    rooms,
  } = useSearch({ from: '/bookingsuccess' });
  return (
    <Box>
      <IndexTopNavBar />
      <Paper p="md" radius="md" style={{ backgroundColor: '#fff9db' }}>
        <Stack align="center" gap="xs" mb={40} mt={40}>
          <IconCircleCheck size={120} color="green" />
          <Title order={2} data-testid="success-message">
            Thank You! Payment Successful
          </Title>
        </Stack>
      </Paper>
      <Container size="lg" py="md" mt={16} mb={90}>
        <Grid gutter="xl">
          <Grid.Col span={7}>
            <PriceBreakdown
              bookingId={bookingId}
              startDate={startDate}
              endDate={endDate}
              nights={nights}
              roomDescription={roomDescription}
              price={price}
              currency={currency}
              rooms={rooms}
            ></PriceBreakdown>
          </Grid.Col>
          <Grid.Col span={5}>
            <HotelInfo hotelName={hotelName} hotelImage={hotelImage} address={address}></HotelInfo>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
