import {
  Box,
  Text,
  TextInput,
  Group,
  Select,
  Textarea,
  Stack,
  Paper,
  Title,
  Flex,
  Button,
} from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { CounterField } from './CounterField';
const countryCodes = [
  { value: 'sg', label: 'SG +65' },
  { value: 'us', label: 'USA +1' },
  { value: 'uk', label: 'UK +44' },
  { value: 'au', label: 'Australia +61' },
  { value: 'ca', label: 'Canada +1' },
  { value: 'cn', label: 'China +86' },
  { value: 'fr', label: 'France +33' },
  { value: 'de', label: 'Germany +49' },
  { value: 'hk', label: 'Hong Kong +852' },
  { value: 'in', label: 'India +91' },
  { value: 'id', label: 'Indonesia +62' },
  { value: 'jp', label: 'Japan +81' },
  { value: 'kr', label: 'South Korea +82' },
  { value: 'my', label: 'Malaysia +60' },
  { value: 'nz', label: 'New Zealand +64' },
  { value: 'ph', label: 'Philippines +63' },
  { value: 'th', label: 'Thailand +66' },
  { value: 'tw', label: 'Taiwan +886' },
  { value: 'vn', label: 'Vietnam +84' },
];
export interface GuestInfo {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  specialRequests: string;
}
interface GuestInfoFormProps {
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
  guests: number;
}
function GuestInfoForm({ guestInfo, guests }: GuestInfoFormProps) {
  const { adults, children } = guestInfo.values;
  const updateAdults = (val: number) => {
    const newAdults = Math.max(0, Math.min(val, guests));
    const newChildren = guests - newAdults;
    guestInfo.setValues({ adults: newAdults, children: newChildren });
  };
  const updateChildren = (val: number) => {
    const newChildren = Math.max(0, Math.min(val, guests));
    const newAdults = guests - newChildren;
    guestInfo.setValues({ adults: newAdults, children: newChildren });
  };
  return (
    <Paper withBorder radius="md" p="xl">
      <Stack gap="md">
        {/* <Button
          variant="light"
          size="xs"
          onClick={() => {
            guestInfo.setValues({
              salutation: 'mr',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              countryCode: 'sg',
              phone: '91234567',
              specialRequests: 'Late check-in, please.',
              adults: guestInfo.values.adults,
              children: guestInfo.values.children,
            });
          }}
        >
          Fill with dummy data
        </Button> */}
        <Box>
          <Title order={2} size="h3" mb={4}>
            Guest Info
          </Title>
          <Text size="sm" c="dimmed">
            Guest names must match the valid ID which will be used at check-in
          </Text>
        </Box>
        <Flex gap="sm">
          <Select
            placeholder="Select"
            data={[
              { value: 'mr', label: 'Mr' },
              { value: 'ms', label: 'Ms' },
              { value: 'mrs', label: 'Mrs' },
            ]}
            style={{ maxWidth: 100, flexShrink: 0 }}
            {...guestInfo.getInputProps('salutation')}
          />
          <TextInput
            placeholder="First Name"
            {...guestInfo.getInputProps('firstName')}
            style={{ flex: 1 }}
          />
          <TextInput
            placeholder="Last Name"
            {...guestInfo.getInputProps('lastName')}
            style={{ flex: 1 }}
          />
        </Flex>
        <TextInput placeholder="Email" {...guestInfo.getInputProps('email')} />
        <Group gap={0} align="flex-start" style={{ flexWrap: 'nowrap' }}>
          <Select
            data={countryCodes}
            {...guestInfo.getInputProps('countryCode')}
            w={160}
            styles={{
              input: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            }}
          />
          <TextInput
            placeholder="Phone Number"
            style={{ flex: 1 }}
            {...guestInfo.getInputProps('phone')}
            styles={{
              input: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: 0,
              },
            }}
          />
        </Group>
        <Group gap={32}>
          <Group>
            <Text size="sm" c="dimmed">
              Adults:
            </Text>
            <CounterField
              value={adults}
              onChange={updateAdults}
              disabledDecrement={adults <= 1}
              disabledIncrement={adults >= guests}
            />
          </Group>
          <Group>
            <Text size="sm" c="dimmed">
              Children:
            </Text>
            <CounterField
              value={children}
              onChange={updateChildren}
              disabledDecrement={children <= 0}
              disabledIncrement={children >= guests - 1}
            />
          </Group>
        </Group>
        <Box mt="xl">
          <Text size="md" fw={500} mb={4}>
            Special Requests
          </Text>
          <Textarea
            placeholder="Special requests can't be guaranteed, but the property will do its best to meet your needs."
            autosize
            minRows={3}
            {...guestInfo.getInputProps('specialRequests')}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
export default GuestInfoForm;
