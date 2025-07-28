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
}

export default GuestInfoForm;
