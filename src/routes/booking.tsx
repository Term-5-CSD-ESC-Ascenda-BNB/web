import { CancellationPolicyCard } from '@/components/CancellationPolicyCard/CancellationPolicyCard';
import GuestInfoForm from '@/components/GuestInfoForm/GuestInfoForm';
import PaymentMethodForm from '@/components/PaymentMethodForm/PaymentMethodForm';
import { PriceDetailsCard } from '@/components/PriceDetailsCard/PriceDetailsCard';
import { BookingDetailsCard } from '@/components/BookingDetailsCard/BookingDetailsCard';
import { Container, Grid } from '@mantine/core';

export const Route = createFileRoute({
  component: Booking,
});

function Booking() {
  return (
    <Container size="lg" py="md">
      <Grid gutter="xl">
        <Grid.Col span={7}>
          <GuestInfoForm />
          <PaymentMethodForm />
        </Grid.Col>
        <Grid.Col span={5}>
          <BookingDetailsCard
            name={'ST Residences Novena'}
            image={'https://d2ey9sqrvkqdfs.cloudfront.net/050G/0.jpg'}
            address={'145A Moulmein Road'}
            roomType={'Deluxe King Room'}
            starRating={3}
            reviewScore={3}
            checkin={'2025-10-01'}
            checkout={'2025-10-10'}
            guests={2}
          />
          <PriceDetailsCard
            roomType={'Deluxe King Room'}
            rooms={2}
            checkin={'2025-10-01'}
            checkout={'2025-10-10'}
            currency="SGD"
          />
          <CancellationPolicyCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
