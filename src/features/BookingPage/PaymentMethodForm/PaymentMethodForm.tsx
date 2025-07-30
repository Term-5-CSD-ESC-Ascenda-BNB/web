import { Paper, Title, Tabs, Group, Button, TextInput, Stack, Image } from '@mantine/core';
import { useForm, type UseFormReturnType } from '@mantine/form';
import { IconCreditCard } from '@tabler/icons-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import axios from 'axios';
import type { StringValidation } from 'zod';

const createBookingDto = {
  destinationId: 'RsBU',
  hotelId: 'jOZC',
  bookingInfo: {
    startDate: '2025-09-10',
    endDate: '2025-09-15',
    numberOfNights: 6,
    adults: 1,
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

  interface CreatePaymentResponse {
    clientSecret: string;
    payeeId: string;
    paymentId: string;
  }

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
      const res = await axios.post<CreatePaymentResponse>(
        'https://api-production-46df.up.railway.app/bookings/pay',
        {
          hotelId: createBookingDto.hotelId,
          destination_id: createBookingDto.destinationId,
          country_code: 'SG', // example values — replace with real ones
          lang: 'en_US',
          currency: 'SGD',
          guests: createBookingDto.bookingInfo.adults + createBookingDto.bookingInfo.children,
          startDate: createBookingDto.bookingInfo.startDate,
          endDate: createBookingDto.bookingInfo.endDate,
          roomTypes: createBookingDto.bookingInfo.roomTypes,
          roomDescription: 'Deluxe Double or Twin Room 1 Double Bed',
        },
        { withCredentials: true }
      );

      console.log('✅ Payment response:', res.data);

      const clientSecret = res.data.clientSecret;
      const payeeId = String(res.data.payeeId);
      const paymentId = String(res.data.paymentId);
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: values.cardholderName,
            email: guestInfo.values.email,
          },
        },
      });
      if (stripeError) {
        console.error('❌ Payment failed:', stripeError.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('✅ Payment successful:', paymentIntent);
        const bookingPayload = {
          hotelId: createBookingDto.hotelId,
          destinationId: createBookingDto.destinationId,

          bookingInfo: {
            startDate: createBookingDto.bookingInfo.startDate,
            endDate: createBookingDto.bookingInfo.endDate,
            numberOfNights: createBookingDto.bookingInfo.numberOfNights,
            adults: createBookingDto.bookingInfo.adults,
            children: createBookingDto.bookingInfo.children,
            roomTypes: createBookingDto.bookingInfo.roomTypes,
            messageToHotel: createBookingDto.bookingInfo.messageToHotel,
          },
          price: createBookingDto.price,
          guest: {
            salutation: createBookingDto.guest.salutation,
            firstName: guestInfo.values.firstName,
            lastName: guestInfo.values.lastName,
          },
          payment: {
            paymentId: paymentId,
            payeeId: payeeId,
          },
        };
        try {
          const bookingRes = await axios.post(
            'https://api-production-46df.up.railway.app/bookings',
            bookingPayload,
            { withCredentials: true }
          );
          console.log('✅ Booking successful:', bookingRes.data);
        } catch (bookingError) {
          console.error('❌ Booking failed:', bookingError);
        }
      }
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
