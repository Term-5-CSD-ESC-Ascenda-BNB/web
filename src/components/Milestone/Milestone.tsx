import { Text, Stack, useMantineTheme } from '@mantine/core';
import styles from './Milestone.module.css';

interface MilestoneProps {
  milestone: string;
  count: number;
}

export function Milestone({ milestone, count }: MilestoneProps) {
  const theme = useMantineTheme();

  return (
    <Stack className={styles['root-container']} gap={0}>
      <Text className={styles['number']} ff={theme.other.displayFont}>
        {count}
      </Text>
      <Text className={styles['text']} fw={600}>
        {milestone}
      </Text>
    </Stack>
  );
}
