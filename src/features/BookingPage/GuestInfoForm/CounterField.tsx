import { Paper, UnstyledButton, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
interface CounterFieldProps {
  value: number;
  onChange: (newValue: number) => void;
  disabledDecrement?: boolean;
  disabledIncrement?: boolean;
}
export const CounterField = ({
  value,
  onChange,
  disabledDecrement,
  disabledIncrement,
}: CounterFieldProps) => {
  return (
    <Paper
      withBorder
      radius="xl"
      style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: 90,
        padding: '2px 8px',
        gap: 12,
        justifyContent: 'center',
      }}
    >
      <UnstyledButton
        aria-label="decrement"
        display={'flex'}
        onClick={() => onChange(value - 1)}
        disabled={disabledDecrement}
      >
        <IconMinus size={16} />
      </UnstyledButton>
      <Text size="xl" w={40} ta="center">
        {value}
      </Text>
      <UnstyledButton
        aria-label="increment"
        display={'flex'}
        onClick={() => onChange(value + 1)}
        disabled={disabledIncrement}
      >
        <IconPlus size={16} />
      </UnstyledButton>
    </Paper>
  );
};
