import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box, Card, Text } from '@mantine/core';

function PaymentForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      cardNumber: (value) => (value.length === 16 ? null : 'Card number must be 16 digits'),
      expiryDate: (value) => (value.length === 5 ? null : 'Expiry date must be MM/YY format'),
      cvv: (value) => (value.length === 3 ? null : 'CVV must be 3 digits'),
    },
  });

  interface PaymentFormValues {
    name: string;
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }

  const handleSubmit = (values: PaymentFormValues): void => {
    console.log(values);
    // In a real application, you would send this data to your payment gateway.
  };

  return (
    <Box maw={400} mx="auto" mt={16}>
      <Card withBorder padding="lg" radius="md">
        <Text size="lg" fw="500" mb="md">
          Payment Information
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            withAsterisk
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            {...form.getInputProps('cardNumber')}
          />
          <Group grow>
            <TextInput
              withAsterisk
              label="Expiry Date"
              placeholder="MM/YY"
              {...form.getInputProps('expiryDate')}
            />
            <TextInput withAsterisk label="CVV" placeholder="123" {...form.getInputProps('cvv')} />
          </Group>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit Payment</Button>
          </Group>
        </form>
      </Card>
    </Box>
  );
}

export default PaymentForm;
