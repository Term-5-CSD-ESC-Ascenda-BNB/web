import { CancellationPolicyCard } from '@/features/BookingPage/CancellationPolicyCard/CancellationPolicyCard';
import GuestInfoForm, { type GuestInfo } from '@/features/BookingPage/GuestInfoForm/GuestInfoForm';
import PaymentMethodForm from '@/features/BookingPage/PaymentMethodForm/PaymentMethodForm';
import { PriceDetailsCard } from '@/features/BookingPage/PriceDetailsCard/PriceDetailsCard';
import { BookingDetailsCard } from '@/features/BookingPage/BookingDetailsCard/BookingDetailsCard';
import { Container, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';

export const Route = createFileRoute({
  component: Booking,
});

const HotelProps = {
  name: 'ST Residences Novena',
  image: 'https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg',
  address: '145A Moulmein Road',
  roomType: 'Deluxe King Room',
  roomPrice: 1200,
  rooms: 2,
  currency: 'S$',
  starRating: 3,
  reviewScore: 3,
  checkin: '2025-10-01',
  checkout: '2025-10-10',
  guests: 2,
};

function Booking() {
  const guestInfo = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      countryCode: 'us',
      phone: '',
      specialRequests: '',
    },
    validate: {
      firstName: (value) => (value ? null : 'Required'),
      lastName: (value) => (value ? null : 'Required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value ? null : 'Required'),
    },
  });

  return (
    <Container size="lg" py="md">
      <Grid gutter="xl">
        <Grid.Col span={7}>
          <GuestInfoForm guestInfo={guestInfo} />
          <PaymentMethodForm guestInfo={guestInfo} />
        </Grid.Col>
        <Grid.Col span={5}>
          <BookingDetailsCard
            name={HotelProps.name}
            image={HotelProps.image}
            address={HotelProps.address}
            roomType={HotelProps.roomType}
            starRating={HotelProps.starRating}
            reviewScore={HotelProps.reviewScore}
            checkin={HotelProps.checkin}
            checkout={HotelProps.checkout}
            guests={HotelProps.guests}
          />
          <PriceDetailsCard
            roomType={HotelProps.roomType}
            rooms={HotelProps.rooms}
            roomPrice={HotelProps.roomPrice}
            checkin={HotelProps.checkin}
            checkout={HotelProps.checkout}
            currency={HotelProps.currency}
          />
          <CancellationPolicyCard currency="S$" fee={2123} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
