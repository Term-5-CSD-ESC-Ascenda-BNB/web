import { Paper, Title, Tabs, Group, Button, TextInput, Stack, Image } from '@mantine/core';
import { useForm, type UseFormReturnType } from '@mantine/form';
import { IconCreditCard } from '@tabler/icons-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import axios from 'axios';

const createBookingDto = {
  destinationId: 'dest-001',
  hotelId: 'hotel-001',
  bookingInfo: {
    startDate: '2025-08-01',
    endDate: '2025-08-05',
    numberOfNights: 4,
    adults: 2,
    children: 1,
    messageToHotel: 'Late check-in please',
    roomTypes: ['standard-room'],
  },
  price: 499.99,
  bookingReference: 'BNKG-123456',
  guest: {
    salutation: 'Mr.',
    firstName: 'John',
    lastName: 'Doe',
  },
  payment: {
    paymentId: 'pay-123456',
    payeeId: 'payee-98765',
  },
};

export interface PaymentMethodFormValues {
  cardholderName: string;
}

interface PaymentMethodFormProps {
  guestInfo: UseFormReturnType<{
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    specialRequests: string;
  }>;
}

function PaymentMethodForm({ guestInfo }: PaymentMethodFormProps) {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  const form = useForm({
    initialValues: {
      cardholderName: '',
    },
    validate: {
      cardholderName: (value) => {
        if (!value.trim()) return 'Cardholder name is required';
        if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name contains invalid characters';
        if (value.length < 2) return 'Name is too short';
        if (value.length > 50) return 'Name is too long';
        return null;
      },
    },
  });

  const handleSubmit = async (values: PaymentMethodFormValues) => {
    if (guestInfo.validate().hasErrors) {
      return;
    }

    if (!stripe) {
      console.error('Stripe.js has not loaded.');
      return;
    }

    if (!elements || typeof elements.getElement !== 'function') {
      console.error('Stripe Elements not loaded or invalid');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('CardElement not found.');
      return;
    }

    console.log(guestInfo.values);

    try {
      const res = await axios.post(
        'https://api-production-46df.up.railway.app/bookings/pay',
        {
          bookingInfo: createBookingDto.bookingInfo,
          hotelId: createBookingDto.hotelId,
          destination_id: createBookingDto.destinationId,
          country_code: 'SG', // example values — replace with real ones
          lang: 'en',
          currency: 'SGD',
          guests: createBookingDto.bookingInfo.adults + createBookingDto.bookingInfo.children,
        },
        { withCredentials: true }
      );

      console.log('✅ Payment response:', res.data);
    } catch (error) {
      console.error('❌ Error submitting payment:', error);
    }
  };

  return (
    <Paper withBorder radius="md" p="xl" mt="md">
      <Stack gap="md">
        <Title order={3} size="h4" mb={4}>
          Payment Method
        </Title>
        <Tabs defaultValue="prepay">
          <Tabs.List>
            <Tabs.Tab value="hotel">Pay at Hotel</Tabs.Tab>
            <Tabs.Tab value="prepay">Prepay Online</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="prepay" pt="xs">
            <Group gap="xs" mt="md">
              <Button
                leftSection={
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    width={28}
                    height={18}
                    alt="Visa"
                  />
                }
                variant="default"
                radius="xl"
              >
                *** 1234
              </Button>
              <Button
                leftSection={
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    width={28}
                    height={18}
                    alt="Mastercard"
                  />
                }
                variant="default"
                radius="xl"
              >
                *** 1234
              </Button>
              <Button
                leftSection={<IconCreditCard size={20} />}
                variant="filled"
                color="gray"
                radius="xl"
              >
                New Card
              </Button>
            </Group>
            <Group gap="xs" mt="sm" wrap="nowrap" ml={16}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                style={{ width: 15, height: 10 }}
                fit="contain"
                alt="Visa"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                style={{ width: 15, height: 10 }}
                fit="contain"
                alt="Mastercard"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg"
                style={{ width: 15, height: 10 }}
                fit="contain"
                alt="UnionPay"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg"
                style={{ width: 15, height: 10 }}
                fit="contain"
                alt="JCB"
              />
            </Group>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="sm" mt="sm">
                <TextInput
                  placeholder="Cardholder's name"
                  withAsterisk
                  radius="xl"
                  {...form.getInputProps('cardholderName')}
                />

                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    padding: '12px',
                    marginTop: '8px',
                  }}
                >
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#000',
                          '::placeholder': {
                            color: '#888',
                          },
                        },
                      },
                    }}
                  />
                </div>

                <Group justify="flex-end">
                  <Button type="submit" radius="xl">
                    Submit Payment
                  </Button>
                </Group>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Paper>
  );
}

export default PaymentMethodForm;
