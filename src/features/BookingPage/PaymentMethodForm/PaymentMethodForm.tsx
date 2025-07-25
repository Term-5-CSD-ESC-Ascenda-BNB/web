import { Paper, Title, Tabs, Group, Button, TextInput, Stack, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCreditCard } from '@tabler/icons-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

interface PaymentMethodFormValues {
  name: string;
}

function PaymentMethodForm() {
  const stripe = useStripe();
  const elements = useElements();

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => {
        if (!value.trim()) return 'Cardholder name is required';
        if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name contains invalid characters';
        if (value.length < 2) return 'Name is too short';
        if (value.length > 50) return 'Name is too long';
        return null;
      },
    },
  });

  const handleSubmit = async (values: PaymentMethodFormValues) => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('CardElement not found.');
      return;
    }

    try {
      const res = await axios.post(
        'https://api-production-46df.up.railway.app/bookings/pay',
        {
          destinationId: 'cdwcd',
          hotelId: 'csdcsf',
          bookingInfo: {
            startDate: '04/04/2025',
            endDate: '08/04/2025',
            numberOfNights: 4,
            adults: 2,
            children: 2,
            messageToHotel: 'nil',
            roomTypes: ['Big room', 'Small room'],
          },
          price: 200,
          bookingReference: 'cdcdsdcs',
          guest: {
            salutation: 'Mr',
            firstName: 'qi han',
            lastName: 'liew',
          },
          payment: {
            paymentId: 'cdsfsdf',
            payeeId: 'cdsfds',
          },
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
                  {...form.getInputProps('name')}
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
