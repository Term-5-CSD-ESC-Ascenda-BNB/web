import { Text, Stack, Image } from '@mantine/core';
import styles from './Milestone.module.css';

interface MilestoneBadgeProps {
  // image: string;
  country: string;
  // date: string;
}

export function MilestoneBadge({
  // image,
  country,
  // date,
}: MilestoneBadgeProps) {
  return (
    <Stack className={styles['badge-container']} gap={0}>
      {/* <Image src={image} /> */}
      <Text className={styles['text']} fw={600}>
        {country}
      </Text>
      {/* <Text className={styles['text']}>{date}</Text> */}
    </Stack>
  );
}
