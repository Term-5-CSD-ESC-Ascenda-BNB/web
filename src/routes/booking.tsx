import { CancellationPolicyCard } from '@/features/BookingPage/CancellationPolicyCard/CancellationPolicyCard';
import GuestInfoForm from '@/features/BookingPage/GuestInfoForm/GuestInfoForm';
import PaymentMethodForm from '@/features/BookingPage/PaymentMethodForm/PaymentMethodForm';
import { PriceDetailsCard } from '@/features/BookingPage/PriceDetailsCard/PriceDetailsCard';
import { BookingDetailsCard } from '@/features/BookingPage/BookingDetailsCard/BookingDetailsCard';

import { Container, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSearch } from '@tanstack/react-router';
import { BookingParamsSchema } from '@/schemas/bookingParams';

export const Route = createFileRoute({
  component: Booking,
  validateSearch: BookingParamsSchema,
});

function Booking() {
  const search = useSearch({ from: '/booking' });

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
            name={search.hotelName}
            image={search.hotelImage}
            address={search.hotelAddress}
            roomType={search.roomDescription}
            starRating={search.starRating}
            reviewScore={search.trustYouScore / 10}
            checkin={search.startDate}
            checkout={search.endDate}
            guests={search.guests}
          />

          <PriceDetailsCard
            roomType={search.roomDescription}
            rooms={1} // make this dynamic later
            roomPrice={search.price}
            checkin={search.startDate}
            checkout={search.endDate}
            currency={search.currency}
          />

          <CancellationPolicyCard currency={search.currency} fee={Math.floor(search.price * 0.4)} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
