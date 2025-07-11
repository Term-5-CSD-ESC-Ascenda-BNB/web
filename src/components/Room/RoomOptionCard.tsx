import { Badge, Box, Button, Group, Stack, Text, NumberInput } from '@mantine/core';

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
    <Box p="md" mb="md" withBorder radius="md">
      <Stack gap="xs">
        {option.breakfast && <Text size="sm">{option.breakfast}</Text>}

        <Group gap="xs" wrap="wrap">
          {option.refundable && (
            <Badge color="green" variant="light">
              Refundable
            </Badge>
          )}
          {option.reschedulable && (
            <Badge color="blue" variant="light">
              Reschedulable
            </Badge>
          )}
          {option.prepay && (
            <Badge color="orange" variant="light">
              Prepay Required
            </Badge>
          )}
        </Group>

        <Group position="apart" align="center" mt="sm">
          <Stack gap={0}>
            <Text fw={500}>SGD ${option.price}</Text>
            <Text size="xs" c="dimmed">
              Total: ${option.totalPrice}
            </Text>
          </Stack>

          <Group gap="xs">
            <NumberInput min={0} max={10} defaultValue={1} size="xs" />
            <Button size="xs" radius="md">
              Reserve
            </Button>
          </Group>
        </Group>
      </Stack>
    </Box>
  );
}
