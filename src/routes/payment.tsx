import { CancellationPolicyCard } from '@/components/CancellationPolicyCard/CancellationPolicyCard';
import GuestInfoForm from '@/components/GuestInfoForm/GuestInfoForm';
import PaymentMethodForm from '@/components/PaymentMethodForm/PaymentMethodForm';
import { PriceDetailsCard } from '@/components/PriceDetailsCard/PriceDetailsCard';
import { TripDetailsCard } from '@/components/TripDetailsCard/TripDetailsCard';
import { Container, Grid, useMantineTheme } from '@mantine/core';

export const Route = createFileRoute({
  component: Payment,
});

// const getChild = (height: number) => <Skeleton height={height} radius="md" animate={false} />;
// const BASE_HEIGHT = 360;
// const getSubHeight = (children: number, spacing: number) =>
//   BASE_HEIGHT / children - spacing * ((children - 1) / children);

function Payment() {
  // const theme = useMantineTheme();
  return (
    // <Container my="md" className="p-2">
    //   <SimpleGrid cols={{ base: 1, xs: 2 }}>
    //     <Stack>
    //       {/* {getChild(getSubHeight(2, px(theme.spacing.md) as number))} */}
    //       <GuestInfoForm />
    //       <PaymentMethodForm />
    //     </Stack>
    //     <Stack>
    //       {/* {getChild(getSubHeight(3, px(theme.spacing.md) as number))} */}
    //       <TripDetailsCard />
    //       <PriceDetailsCard />
    //       <CancellationPolicyCard />
    //     </Stack>
    //   </SimpleGrid>
    // </Container>
    <Container size="lg" py="md">
      <Grid gutter="xl">
        <Grid.Col span={7}>
          <GuestInfoForm />
          <PaymentMethodForm />
        </Grid.Col>
        <Grid.Col span={5}>
          <TripDetailsCard />
          <PriceDetailsCard />
          <CancellationPolicyCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
