import { CancellationPolicyCard } from '@/features/BookingPage/CancellationPolicyCard/CancellationPolicyCard';
import GuestInfoForm from '@/features/BookingPage/GuestInfoForm/GuestInfoForm';
import PaymentMethodForm from '@/features/BookingPage/PaymentMethodForm/PaymentMethodForm';
import { PriceDetailsCard } from '@/features/BookingPage/PriceDetailsCard/PriceDetailsCard';
import { BookingDetailsCard } from '@/features/BookingPage/BookingDetailsCard/BookingDetailsCard';

import { Container, Grid, Loader, Modal, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSearch } from '@tanstack/react-router';
import { BookingParamsSchema } from '@/schemas/bookingParams';
import { useState } from 'react';

export const Route = createFileRoute({
  component: Booking,
  validateSearch: BookingParamsSchema,
});

function Booking() {
  const [loading, setLoading] = useState(false);
  const search = useSearch({ from: '/booking' });

  const guestInfo = useForm({
    initialValues: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: 'us',
      phone: '',
      specialRequests: '',
      adults: search.guests,
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
    <Container
      size="lg"
      py="md"
      mt={20}
      mb={50}
      style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.6 : 1 }}
    >
      <Modal
        opened={loading}
        onClose={() => {}}
        withCloseButton={false}
        centered
        overlayProps={{
          blur: 3,
          backgroundOpacity: 0.6,
        }}
      >
        <Stack align="center" gap="md">
          <Title order={4}>Processing your booking...</Title>
          <Loader color="blue" size="lg" />
        </Stack>
      </Modal>
      <Grid gutter="xl">
        <Grid.Col span={7}>
          <GuestInfoForm guestInfo={guestInfo} guests={search.guests} />
          <PaymentMethodForm
            guestInfo={guestInfo}
            hotelId={search.hotelId}
            destinationId={search.destination_id}
            startDate={search.startDate}
            endDate={search.endDate}
            guests={search.guests}
            roomDescription={search.roomDescription}
            currency={search.currency}
            nights={search.numberOfNights}
            price={search.price}
            country_code={search.country_code}
            lang={search.lang}
            hotelName={search.hotelName}
            hotelAddress={search.hotelAddress}
            hotelImage={search.hotelImage}
            setLoading={setLoading}
            rooms={2}
          />
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
            rooms={2} // make this dynamic later
            roomPrice={search.price}
            checkin={search.startDate}
            checkout={search.endDate}
            currency={search.currency}
            nights={2}
          />

          <CancellationPolicyCard currency={search.currency} fee={Math.floor(search.price * 0.4)} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
