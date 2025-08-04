import HotelInfo from '@/features/BookingSuccessPage/HotelInfo/HotelInfo';
import PriceBreakdown from '@/features/BookingSuccessPage/PriceBreakdown/PriceBreakdown';
import { Container, Grid, Paper, Box, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useSearch } from '@tanstack/react-router';

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
    };
  },
});

// const BookingSuccessProps = {
//   bookingId: '1234-5688-91011',
//   startDate: '2025-11-15',
//   endDate: '2025-11-20',
//   nights: 4,
//   roomDescription: 'Deluxe Double or Twin Room 2 Twin Beds',
//   price: 1200,
//   currency: 'S$',
//   hotelName: 'ST Residences Novena',
//   hotelImage: 'https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg',
//   address: '145A Moulmein Road',
// };

function BookingSuccess() {
  const theme = useMantineTheme();
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
  } = useSearch({ from: '/bookingsuccess' });
  return (
    <Box>
      <Paper p="md" radius="md" style={{ backgroundColor: '#fff9db' }}>
        <Stack align="center" gap="xs" mb={40}>
          <IconCircleCheck size={120} color="green" />
          <Title order={2}>Thank You! Payment Successful</Title>
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
