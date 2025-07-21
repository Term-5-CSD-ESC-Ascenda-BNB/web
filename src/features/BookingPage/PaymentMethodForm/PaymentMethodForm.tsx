import { Paper, Title, Tabs, Group, Button, TextInput, Switch, Stack, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCreditCard } from '@tabler/icons-react';

interface PaymentMethodFormValues {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const handleSubmit = (values: PaymentMethodFormValues): void => {
  console.log(values);
};

function PaymentMethodForm() {
  const form = useForm({
    initialValues: {
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validate: {
      name: (value) => {
        if (!value.trim()) return 'Cardholder name is required';
        if (!/^[A-Za-z\s'-]+$/.test(value)) return 'Name contains invalid characters';
        if (value.length < 2) return 'Name is too short';
        if (value.length > 50) return 'Name is too long';
        return null;
      },
      cardNumber: (value) =>
        value.length === 16 && /^\d+$/.test(value) ? null : 'Card number must be 16 digits',
      expiryDate: (value) =>
        /^\d{2}\/\d{2}$/.test(value) ? null : 'Expiry date must be in MM/YY format',
      cvv: (value) => (value.length === 3 && /^\d+$/.test(value) ? null : 'CVV must be 3 digits'),
    },
  });

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
                <TextInput
                  placeholder="Card number"
                  withAsterisk
                  radius="xl"
                  {...form.getInputProps('cardNumber')}
                />
                <Group grow gap="sm">
                  <TextInput
                    placeholder="Expiration date (MM/YY)"
                    withAsterisk
                    radius="xl"
                    {...form.getInputProps('expiryDate')}
                  />
                  <TextInput
                    placeholder="CVV / CVC"
                    withAsterisk
                    radius="xl"
                    {...form.getInputProps('cvv')}
                  />
                </Group>
                <Group justify="space-between">
                  <Switch
                    label="Save card for future purchases"
                    color="dark"
                    mt="sm"
                    withThumbIndicator={false}
                  />
                  <Button type="submit" radius={'xl'}>
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

  // return (
  //   <Box mx="auto" mt={16} style={{ maxWidth: 750, margin: '0 auto' }}>
  //     <Card withBorder padding="lg" radius="md">
  //       <Text size="lg" fw="500" mb="md">
  //         Payment Method
  //       </Text>
  //       <form onSubmit={form.onSubmit(handleSubmit)}>
  //         <TextInput withAsterisk placeholder="Cardholder's name" {...form.getInputProps('name')} />
  //         <TextInput
  //           withAsterisk
  //           placeholder="Card number"
  //           {...form.getInputProps('cardNumber')}
  //           mt={'16'}
  //         />
  //         <Group grow mt={'16'}>
  //           <TextInput
  //             withAsterisk
  //             placeholder="Expiration Date"
  //             {...form.getInputProps('expiryDate')}
  //           />
  //           <TextInput withAsterisk placeholder="CVV/CVC" {...form.getInputProps('cvv')} />
  //         </Group>
  //         <Group justify="space-between" mt="md">
  //           <Switch label="Remember card?" withThumbIndicator={false} />
  //           <Button type="submit">Submit Payment</Button>
  //         </Group>
  //       </form>
  //     </Card>
  //   </Box>
  // );
}

export default PaymentMethodForm;
