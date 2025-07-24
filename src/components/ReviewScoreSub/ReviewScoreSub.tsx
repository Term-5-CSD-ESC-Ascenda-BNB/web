import { Box, Text } from '@mantine/core';

interface ReviewScoreSubProps {
  score: number;
}

export function ReviewScoreSub({ score }: ReviewScoreSubProps) {
  return (
    <Box
      style={{
        backgroundColor: '#d8cfc0',
        borderRadius: '50%',
        width: 72,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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
  );
}
