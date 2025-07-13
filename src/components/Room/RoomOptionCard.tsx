import { Box, Button, Divider, Group, Stack, Text, NumberInput } from '@mantine/core';
import {
  IconToolsKitchen2,
  IconCreditCard,
  IconCalendarCancel,
  IconCalendarCheck,
  IconX,
} from '@tabler/icons-react';

interface RoomOption {
  breakfast?: string;
  refundable: boolean;
  reschedulable: boolean;
  prepay: boolean;
  price: number;
  totalPrice: number;
}

interface RoomOptionCardProps {
  option: RoomOption;
}

export function RoomOptionCard({ option }: RoomOptionCardProps) {
  return (
    <Box
      p="md"
      style={{
        border: '1px solid #888888ff',
        backgroundColor: '#fff',
        borderRadius: '8px',
      }}
    >
      <Group align="flex-start" justify="space-between" wrap="nowrap">
        <Stack gap="xs" style={{ flex: 1 }}>
          {option.breakfast && (
            <Group gap={6}>
              <IconToolsKitchen2 size={16} />
              <Text size="sm" fw={500}>
                {option.breakfast}
              </Text>
            </Group>
          )}

          <Group gap={6}>
            <IconX size={16} />
            <Text size="sm">{option.refundable ? 'Refundable' : 'Non-Refundable'}</Text>
          </Group>

          <Group gap={6}>
            <IconCalendarCancel size={16} />
            <Text size="sm">{option.reschedulable ? 'Reschedulable' : 'Non-Reschedulable'}</Text>
          </Group>

          <Group gap={6}>
            <IconCreditCard size={16} />
            <Text size="sm">Prepay Online</Text>
          </Group>
        </Stack>

        <Stack gap="xs" align="flex-end" style={{ minWidth: 160 }}>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              No. of Rooms:
            </Text>
            <NumberInput
              min={0}
              max={10}
              size="xs"
              defaultValue={1}
              hideControls
              style={{ width: 50 }}
            />
          </Group>

          <Text size="sm">
            Nightly Rate: <b>SGD ${option.price}</b>
          </Text>
          <Text size="sm">
            Total (incl. fees & taxes): <b>SGD ${option.totalPrice}</b>
          </Text>

          <Button radius="xl" size="sm" style={{ backgroundColor: '#514D8A' }}>
            Reserve
          </Button>
        </Stack>
      </Group>
    </Box>
  );
}
