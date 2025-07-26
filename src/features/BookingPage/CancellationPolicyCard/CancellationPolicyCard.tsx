import { Paper, Stack, Text } from '@mantine/core';

interface CancellationPolicyCardProps {
  currency: string;
  fee: number;
}

export function CancellationPolicyCard({ currency, fee }: CancellationPolicyCardProps) {
  return (
    <Paper withBorder radius="md" p="md" mt="md">
      <Stack gap={4}>
        <Text fw={600} size="sm">
          Cancellation Policy
        </Text>
        <Text size="sm">
          <b>
            Cancellation fee: {currency}
            {fee}
          </b>
        </Text>
        <Text size="xs" c="dimmed">
          This booking cannot be modified, and no refund will be given if you cancel it. If you fail
          to check in, a penalty equivalent to the cancellation fee will be charged. If you apply a
          discount to your booking, the cancellation fee will be based on the total you paid.
        </Text>
      </Stack>
    </Paper>
  );
}
