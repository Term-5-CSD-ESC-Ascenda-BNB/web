import { UnstyledButton, Popover, Stack, Group, Text } from '@mantine/core';
import { IconUsers, IconBed, IconChevronDown } from '@tabler/icons-react';
import { CounterSelector } from './CounterSelector';

interface GuestsRoomsSelectorProps {
  guests: number;
  rooms: number;
  setGuests: (guests: number) => void;
  setRooms: (rooms: number) => void;
}

export function GuestsRoomsSelector({
  guests,
  rooms,
  setGuests,
  setRooms,
}: GuestsRoomsSelectorProps) {
  const handleGuestsChange = (delta: number) => {
    setGuests(guests + delta);
    if (rooms > guests + delta) {
      setRooms(guests + delta);
    }
  };
  const handleRoomsChange = (delta: number) => {
    setRooms(rooms + delta);
  };

  return (
    <Popover width={260} trapFocus position="bottom-end" shadow="md">
      <Popover.Target>
        <UnstyledButton
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 200,
            height: 42,
            padding: '8px 12px',
            borderRadius: 50,
            backgroundColor: 'var(--mantine-color-white)',
            whiteSpace: 'nowrap',
            border: '1px solid var(--mantine-color-gray-4)',
          }}
        >
          <Group gap="xs" wrap="nowrap">
            <IconUsers size={16} color="var(--mantine-color-gray-6)" />
            <Text size="sm">
              {guests} guest{guests !== 1 ? 's' : ''} • {rooms} room{rooms !== 1 ? 's' : ''}
            </Text>
          </Group>
          <IconChevronDown size={16} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="md" p="xs">
          <CounterSelector
            label="Guests"
            icon={<IconUsers size={16} />}
            value={guests}
            onValueChange={handleGuestsChange}
            minValue={1}
            maxValue={10}
          />
          <CounterSelector
            label="Rooms"
            icon={<IconBed size={16} />}
            value={rooms}
            onValueChange={handleRoomsChange}
            minValue={1}
            maxValue={guests}
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
