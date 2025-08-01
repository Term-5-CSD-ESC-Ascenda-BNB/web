import { Group, Text, ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface CounterSelectorProps {
  label: string;
  icon: ReactNode;
  value: number;
  onValueChange: (delta: number) => void;
  minValue?: number;
  maxValue?: number;
}

export function CounterSelector({
  label,
  icon,
  value,
  onValueChange,
  minValue = 1,
  maxValue = 10,
}: CounterSelectorProps) {
  return (
    <Group justify="space-between" wrap="nowrap">
      <Group gap="xs">
        {icon}
        <Text size="sm" fw={500}>
          {label}
        </Text>
      </Group>
      <Group gap="xs" wrap="nowrap">
        <ActionIcon
          variant="outline"
          size="sm"
          onClick={() => onValueChange(-1)}
          disabled={value <= minValue}
          data-testid={`${label.toLowerCase()}-decrement`}
        >
          <IconMinus size={12} />
        </ActionIcon>
        <Text size="sm" fw={500} w={20} ta="center">
          {value}
        </Text>
        <ActionIcon
          variant="outline"
          size="sm"
          onClick={() => onValueChange(1)}
          disabled={value >= maxValue}
          data-testid={`${label.toLowerCase()}-increment`}
        >
          <IconPlus size={12} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
