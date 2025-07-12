import { Paper, Title, Tabs, Group, Button, TextInput, Switch, Stack, Image } from '@mantine/core';
import { IconCreditCard } from '@tabler/icons-react';

function PaymentMethodForm() {
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
            <Stack gap="sm" mt="sm">
              <TextInput placeholder="Cardholder's name" radius="xl" />
              <TextInput placeholder="Card number" radius="xl" />
              <Group grow gap="sm">
                <TextInput placeholder="Expiration date (MM/YY)" radius="xl" />
                <TextInput placeholder="CVV / CVC" radius="xl" />
              </Group>
              <Group justify="space-between">
                <Switch label="Save card for future purchases" color="dark" mt="sm" />
                <Button type="submit" radius={'xl'}>
                  Submit Payment
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Paper>
  );

  // const form = useForm({
  //   initialValues: {
  //     name: '',
  //     cardNumber: '',
  //     expiryDate: '',
  //     cvv: '',
  //   },
  //   validate: {
  //     cardNumber: (value) => (value.length === 16 ? null : 'Card number must be 16 digits'),
  //     expiryDate: (value) => (value.length === 5 ? null : 'Expiry date must be MM/YY format'),
  //     cvv: (value) => (value.length === 3 ? null : 'CVV must be 3 digits'),
  //   },
  // });

  // interface PaymentMethodFormValues {
  //   name: string;
  //   cardNumber: string;
  //   expiryDate: string;
  //   cvv: string;
  // }

  // const handleSubmit = (values: PaymentMethodFormValues): void => {
  //   console.log(values);
  //   // In a real application, you would send this data to your payment gateway.
  // };

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
