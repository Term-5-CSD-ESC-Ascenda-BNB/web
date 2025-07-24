import { Group, Text } from '@mantine/core';

interface ReviewScoreSmallProps {
  score: number;
}

export function ReviewScoreSmall({ score }: ReviewScoreSmallProps) {
  return (
    <div style={{ borderRadius: '999px', overflow: 'hidden' }}>
      <Group gap={2} bg="primary.7" align="center" p="0 0.6rem">
        <Text fz="md" c="primary.1">
          {score.toFixed(1)}
        </Text>
        <Text fz="xs" c="dimmed">
          /10
        </Text>
      </Group>
    </div>
  );
}
