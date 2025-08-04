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
  destinationId: 'RsBU',
  hotelId: 'jOZC',
  name: 'ST Residences Novena',
  image: 'https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg',
  address: '145A Moulmein Road',
  rooms: 2,
  currency: 'S$',
  starRating: 3,
  reviewScore: 3,
  bookingInfo: {
    startDate: '2025-11-15',
    endDate: '2025-11-20',
    numberOfNights: 6,
    guests: 4,
    messageToHotel: 'Late check-in please',
    roomTypes: ['standard-room'],
  },
  roomDescription: 'Deluxe Double or Twin Room 2 Twin Beds',
  price: 499.99,
};

function Booking() {
  const guestInfo = useForm({
    initialValues: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: 'us',
      phone: '',
      specialRequests: '',
      adults: HotelProps.bookingInfo.guests,
      children: 0,
    },
    validate: {
      firstName: (value) => (value ? null : 'Required'),
      lastName: (value) => (value ? null : 'Required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value ? null : 'Required'),
    },
  });

  return (
    <Container size="lg" py="md" mt={20}>
      <Grid gutter="xl">
        <Grid.Col span={7}>
          <GuestInfoForm guestInfo={guestInfo} guests={HotelProps.bookingInfo.guests} />
          <PaymentMethodForm guestInfo={guestInfo} />
        </Grid.Col>
        <Grid.Col span={5}>
          <BookingDetailsCard
            name={HotelProps.name}
            image={HotelProps.image}
            address={HotelProps.address}
            roomType={HotelProps.roomDescription}
            starRating={HotelProps.starRating}
            reviewScore={HotelProps.reviewScore}
            checkin={HotelProps.bookingInfo.startDate}
            checkout={HotelProps.bookingInfo.endDate}
            guests={HotelProps.bookingInfo.guests}
          />
          <PriceDetailsCard
            roomType={HotelProps.roomDescription}
            rooms={HotelProps.rooms}
            roomPrice={HotelProps.price}
            checkin={HotelProps.bookingInfo.startDate}
            checkout={HotelProps.bookingInfo.endDate}
            currency={HotelProps.currency}
          />
          <CancellationPolicyCard currency="S$" fee={2123} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
