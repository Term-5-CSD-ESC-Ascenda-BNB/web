import {
  Paper,
  Title,
  Group,
  Button,
  TextInput,
  Stack,
  Image,
  Modal,
  Divider,
  Text,
} from '@mantine/core';
import { useForm, type UseFormReturnType } from '@mantine/form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
export interface PaymentMethodFormValues {
  cardholderName: string;
}
export interface PaymentMethodFormProps {
  guestInfo: UseFormReturnType<{
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    specialRequests: string;
    adults: number;
    children: number;
  }>;
  hotelId: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  guests: number;
  roomDescription: string;
  currency: string;
  nights: number;
  price: number;
  country_code: string;
  lang: string;
  hotelName: string;
  hotelImage: string;
  hotelAddress: string;
  setLoading: (val: boolean) => void;
  rooms: number;
}
interface BookingResponse {
  adults: number;
  bookingReference: string;
  children: number;
  createdAt: string;
  destinationId: string;
  endDate: string;
  firstName: string;
  hotelId: string;
  id: number;
  lastName: string;
  messageToHotel: string;
  numberOfNights: number;
  payeeId: string;
  paymentId: string;
  price: string;
  roomTypes: string[];
  salutation: string;
  startDate: string;
  updatedAt: string;
  userId: number;
}
function PaymentMethodForm({
  guestInfo,
  hotelId,
  destinationId,
  startDate,
  endDate,
  guests,
  roomDescription,
  currency,
  nights,
  price,
  country_code,
  lang,
  hotelName,
  hotelImage,
  hotelAddress,
  setLoading,
  rooms,
}: PaymentMethodFormProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [pendingValues, setPendingValues] = useState<PaymentMethodFormValues | null>(null);
  const [failureModalOpen, { open: openFailureModal, close: closeFailureModal }] =
    useDisclosure(false);
  const [failureMessage, setFailureMessage] = useState<string>('An unknown error occurred.');
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();
  const router = useRouter();
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
    setLoading(true);
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
    console.log(
      'hotelId:',
      hotelId,
      'destination_id:',
      destinationId,
      'country_code:',
      country_code,
      'lang:',
      lang,
      'currency:',
      currency,
      'guests:',
      guests,
      'startDate:',
      startDate,
      'endDate:',
      endDate,
      'roomDescription:',
      roomDescription,
      'roomNum:',
      rooms,
      'price:',
      price
    );
    const guestsPerRoom: number = Math.ceil(guests / rooms);
    try {
      const res = await axios.post<CreatePaymentResponse>(
        'https://api-production-46df.up.railway.app/bookings/pay',
        {
          hotelId: hotelId,
          destination_id: destinationId,
          country_code: country_code, // example values — replace with real ones
          lang: lang,
          currency: currency,
          guests: guestsPerRoom,
          startDate: startDate,
          endDate: endDate,
          roomTypes: [roomDescription],
          roomDescription: roomDescription,
          roomNum: rooms,
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
        setFailureMessage(stripeError.message || 'Payment failed');
        openFailureModal();
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('✅ Payment successful:', paymentIntent);
        const bookingPayload = {
          hotelId: hotelId,
          destinationId: destinationId,
          bookingInfo: {
            startDate: startDate,
            endDate: endDate,
            numberOfNights: nights,
            adults: guestInfo.values.adults,
            children: guestInfo.values.children,
            roomTypes: [roomDescription],
            messageToHotel: guestInfo.values.specialRequests,
          },
          price: price,
          guest: {
            salutation: guestInfo.values.salutation,
            firstName: guestInfo.values.firstName,
            lastName: guestInfo.values.lastName,
          },
          payment: {
            paymentId: paymentId,
            payeeId: payeeId,
          },
        };
        try {
          const bookingRes = await axios.post<BookingResponse>(
            'https://api-production-46df.up.railway.app/bookings',
            bookingPayload,
            { withCredentials: true }
          );
          console.log('✅ Booking successful:', bookingRes.data);
          void router.navigate({
            to: '/bookingsuccess',
            search: {
              bookingId: bookingRes.data.bookingReference,
              startDate: startDate,
              endDate: endDate,
              nights: nights,
              roomDescription: roomDescription,
              price: Number(price), // ensure it's a number
              currency: currency,
              hotelName: hotelName,
              hotelImage: hotelImage,
              address: hotelAddress,
              rooms: rooms,
            },
            replace: true,
          });
        } catch (bookingError) {
          console.error('❌ Booking failed:', bookingError);
          setFailureMessage('Booking failed. Please try again.');
          openFailureModal();
        }
      }
    } catch (error) {
      setFailureMessage('Please make sure you are logged in.');
      openFailureModal();
      console.error('❌ Error submitting payment:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper withBorder radius="md" p="xl" mt="md">
      <Stack gap="md">
        <Modal
          opened={failureModalOpen}
          onClose={closeFailureModal}
          title="Something went wrong"
          centered
        >
          <p>{failureMessage}</p>
          <Group justify="flex-end" mt="md">
            <Button onClick={closeFailureModal}>Close</Button>
          </Group>
        </Modal>
        <Modal opened={opened} onClose={close} title="Confirm your booking" centered>
          <p>Are you sure you want to proceed with the booking and payment?</p>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button
              color="blue"
              onClick={() => {
                if (pendingValues) {
                  void handleSubmit(pendingValues);
                }
                close();
              }}
            >
              Confirm
            </Button>
          </Group>
        </Modal>
        <Title order={3} size="h4">
          Payment Method
        </Title>
        <Group gap={'lg'}>
          <Text size="sm" c="green">
            ✔ Secure transmission
          </Text>
          <Text size="sm" c="green">
            ✔ Protects personal information
          </Text>
        </Group>
        <Divider />
        <Group gap="xs" wrap="nowrap" ml={16}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            style={{ width: 25, height: 20 }}
            fit="contain"
            alt="Visa"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            style={{ width: 25, height: 20 }}
            fit="contain"
            alt="Mastercard"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg"
            style={{ width: 25, height: 20 }}
            fit="contain"
            alt="UnionPay"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg"
            style={{ width: 25, height: 20 }}
            fit="contain"
            alt="JCB"
          />
        </Group>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const guestInfoErrors = guestInfo.validate();
            const paymentErrors = form.validate();
            if (guestInfoErrors.hasErrors || paymentErrors.hasErrors) {
              return;
            }
            setPendingValues(form.getValues());
            open();
          }}
        >
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
      </Stack>
    </Paper>
  );
}
export default PaymentMethodForm;
