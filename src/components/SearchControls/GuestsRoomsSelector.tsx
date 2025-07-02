import { UnstyledButton, Popover, Stack, Group, Text } from '@mantine/core';
import { IconUsers, IconBed, IconChevronDown } from '@tabler/icons-react';
import { CounterSelector } from './CounterSelector';

interface GuestsRoomsSelectorProps {
  guests: number;
  rooms: number;
  onGuestsChange: (delta: number) => void;
  onRoomsChange: (delta: number) => void;
}

export function GuestsRoomsSelector({
  guests,
  rooms,
  onGuestsChange,
  onRoomsChange,
}: GuestsRoomsSelectorProps) {
  return (
    <Popover width={260} trapFocus position="bottom-end" shadow="md">
      <Popover.Target>
        <UnstyledButton
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 200,
            padding: '8px 12px',
            border: '1px solid var(--mantine-color-gray-4)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: 'var(--mantine-color-white)',
            whiteSpace: 'nowrap',
          }}
        >
          <Group gap="xs" wrap="nowrap">
            <IconUsers size={16} />
            <Text size="sm">
              {guests} guest{guests !== 1 ? 's' : ''} • {rooms} room{rooms !== 1 ? 's' : ''}
            </Text>
          </Group>
          <IconChevronDown size={14} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="md" p="xs">
          <CounterSelector
            label="Guests"
            icon={<IconUsers size={16} />}
            value={guests}
            onValueChange={onGuestsChange}
          />
          <CounterSelector
            label="Rooms"
            icon={<IconBed size={16} />}
            value={rooms}
            onValueChange={onRoomsChange}
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
