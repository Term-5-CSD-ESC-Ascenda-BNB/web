import { AspectRatio, Group, Paper, Text, useMantineTheme } from '@mantine/core';
import styles from './ReviewScoreLarge.module.css';

export function ReviewScoreLarge({ score }: { score: number }) {
  const theme = useMantineTheme();
  return (
    <>
      <AspectRatio ratio={1} w={100}>
        <Paper bg={theme.colors.primary[7]} radius={9999}>
          <Group justify="center" align="center" h="100%" w="100%">
            <Text
              className={styles.score}
              c={theme.colors.primary[0]}
              fz={'2rem'}
              ff={theme.other.displayFont}
            >
              {score}
            </Text>
          </Group>
        </Paper>
      </AspectRatio>
    </>
  );
}
