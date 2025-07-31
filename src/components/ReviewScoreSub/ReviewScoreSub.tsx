// src/components/ReviewScoreSub.tsx
import { RingProgress, Text, Box } from '@mantine/core';

interface ReviewScoreSubProps {
  score: number;
  size?: number;
  color?: string;
}

export function ReviewScoreSub({
  score,
  size = 88,
  color = '#564f7d', // Dark purple
}: ReviewScoreSubProps) {
  const percentage = Math.min(score * 10, 100); // convert score out of 10 → percentage

  return (
    <RingProgress
      size={size + 30}
      thickness={6}
      roundCaps
      sections={[{ value: percentage, color }]}
      label={
        <Box
          style={{
            backgroundColor: '#d8cfc0',
            borderRadius: '50%',
            width: size - 12,
            height: size - 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 'auto',
            fontFamily: 'Prata, serif',
          }}
        >
          <Text fz="lg" fw={600} lh={1} style={{ fontFamily: 'Prata, serif' }}>
            {score.toFixed(1)}
          </Text>
          <Text fz="sm" c="dimmed" lh={1} style={{ fontFamily: 'Prata, serif' }}>
            /10
          </Text>
        </Box>
      }
    />
  );
}
