import { Group, Stack, Text } from '@mantine/core';
import styles from './Exceptional.module.css';
import type { IconProps } from '@tabler/icons-react'; // not from dist/esm/types

interface ExceptionalProps {
  icon: React.FC<IconProps>; // Type for any Tabler icon component
  header: string;
  body: string;
}

export function Exceptional({ icon: Icon, header, body }: ExceptionalProps) {
  return (
    <div className={styles['exceptional-content-container']}>
      <Stack>
        <Group>
          <Icon size={44} />
          <Text>
            <b>{header}</b>
          </Text>
        </Group>
        <Text>{body}</Text>
      </Stack>
    </div>
  );
}
