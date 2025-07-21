import { Box, Text, TextInput, Group, Select, Textarea, Stack, Paper, Title } from '@mantine/core';

const countryCodes = [
  { value: 'us', label: 'USA +1' },
  { value: 'uk', label: 'UK +44' },
  { value: 'sg', label: 'SG +65' },
  // Add more as needed
];

function GuestInfoForm() {
  return (
    <Paper withBorder radius="md" p="xl">
      <Stack gap="md">
        <Box>
          <Title order={2} size="h3" mb={4}>
            Guest Info
          </Title>
          <Text size="sm" c="dimmed">
            Guest names must match the valid ID which will be used at check-in
          </Text>
        </Box>
        <Group grow gap="sm">
          <TextInput placeholder="First Name" />
          <TextInput placeholder="Last Name" />
        </Group>
        <TextInput placeholder="Email" />
        <Group gap={0} align="flex-start" style={{ flexWrap: 'nowrap' }}>
          <Select
            data={countryCodes}
            defaultValue="us"
            w={160}
            styles={{
              input: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            }}
          />
          <TextInput
            placeholder="Phone Number"
            style={{ flex: 1 }}
            styles={{
              input: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: 0,
              },
            }}
          />
        </Group>
        <Box mt="xl">
          <Text size="md" fw={500} mb={4}>
            Special Requests
          </Text>
          <Textarea
            placeholder="Special requests can't be guaranteed, but the property will do its best to meet your needs."
            autosize
            minRows={3}
          />
        </Box>
      </Stack>
    </Paper>
  );

  // const form = useForm({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     cardNumber: '',
  //     expiryDate: '',
  //     cvv: '',
  //   },
  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  //     cardNumber: (value) => (value.length === 16 ? null : 'Card number must be 16 digits'),
  //     expiryDate: (value) => (value.length === 5 ? null : 'Expiry date must be MM/YY format'),
  //     cvv: (value) => (value.length === 3 ? null : 'CVV must be 3 digits'),
  //   },
  // });

  // interface PaymentFormValues {
  //   name: string;
  //   email: string;
  //   cardNumber: string;
  //   expiryDate: string;
  //   cvv: string;
  // }

  // const handleSubmit = (values: PaymentFormValues): void => {
  //   console.log(values);
  //   // In a real application, you would send this data to your payment gateway.
  // };

  // return (
  //   <Box maw={400} mx="auto" mt={16}>
  //     <Card withBorder padding="lg" radius="md">
  //       <Text size="lg" fw="500" mb="md">
  //         Payment Information
  //       </Text>
  //       <form onSubmit={form.onSubmit(handleSubmit)}>
  //         <TextInput
  //           withAsterisk
  //           label="Name"
  //           placeholder="John Doe"
  //           {...form.getInputProps('name')}
  //         />
  //         <TextInput
  //           withAsterisk
  //           label="Email"
  //           placeholder="your@email.com"
  //           {...form.getInputProps('email')}
  //         />
  //         <TextInput
  //           withAsterisk
  //           label="Card Number"
  //           placeholder="1234 5678 9012 3456"
  //           {...form.getInputProps('cardNumber')}
  //         />
  //         <Group grow>
  //           <TextInput
  //             withAsterisk
  //             label="Expiry Date"
  //             placeholder="MM/YY"
  //             {...form.getInputProps('expiryDate')}
  //           />
  //           <TextInput withAsterisk label="CVV" placeholder="123" {...form.getInputProps('cvv')} />
  //         </Group>
  //         <Group justify="flex-end" mt="md">
  //           <Button type="submit">Submit Payment</Button>
  //         </Group>
  //       </form>
  //     </Card>
  //   </Box>
  // );
}

export default GuestInfoForm;
