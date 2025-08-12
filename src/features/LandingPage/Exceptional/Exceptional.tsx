import { Card, Group, Stack, Text } from '@mantine/core';
import { type TablerIcon } from '@tabler/icons-react';

interface ExceptionalProps {
  icon: TablerIcon;
  header: string;
  body: string;
}

export function Exceptional({ icon: Icon, header, body }: ExceptionalProps) {
  return (
    <Card shadow={'0 2px 6px rgba(0,0,0,0.1)'} p={'xl'} data-testid="exceptional-item">
      <Stack>
        <Group>
          <Icon
            size={42}
            stroke={1.5}
            color="var(--mantine-color-primary-7)"
            data-testid="exceptional-icon"
          />
          <Text fw={500} fz={'lg'}>
            {header}
          </Text>
        </Group>
        <Text>{body}</Text>
      </Stack>
    </Card>
  );
}
