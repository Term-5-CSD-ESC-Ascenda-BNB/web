import { Text } from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';

interface LocationDisplayProps {
  address: string;
  iconSize?: number;
  iconColor?: string;
}

export function LocationDisplay({
  address,
  iconSize = 16,
  iconColor = 'var(--mantine-color-red-6)',
}: LocationDisplayProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px' }}>
      <div>
        <IconMapPinFilled size={iconSize} color={iconColor} />
      </div>
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        <Text c="dimmed" truncate="end" size="sm">
          {address}
        </Text>
      </div>
    </div>
  );
}
