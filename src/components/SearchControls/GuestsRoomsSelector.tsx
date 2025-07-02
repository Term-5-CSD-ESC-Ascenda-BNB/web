import { Button, Popover, Stack } from '@mantine/core';
import { IconUsers, IconBed } from '@tabler/icons-react';
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
    <Popover width={300} trapFocus position="bottom-end" shadow="md">
      <Popover.Target>
        <Button
          variant="outline"
          leftSection={<IconUsers size={16} />}
          w={190}
          justify="flex-start"
        >
          {guests} guest{guests !== 1 ? 's' : ''} • {rooms} room{rooms !== 1 ? 's' : ''}
        </Button>
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
