import { Divider, Group, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';

export function SearchControls() {
  // Example date result: ['2025-07-01', '2025-07-10']
  const [date, setDate] = useState<[string | null, string | null]>([null, null]);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleGuestsChange = (delta: number) => {
    setGuests((prev) => Math.max(1, prev + delta));
  };

  const handleRoomsChange = (delta: number) => {
    setRooms((prev) => Math.max(1, prev + delta));
  };

  return (
    <Group>
      <TextInput />
      <Divider orientation="vertical" />
      <DatePickerInput
        type="range"
        placeholder="Choose dates"
        value={date}
        onChange={setDate}
        valueFormat="D MMM"
        excludeDate={(dateStr) => {
          const today = new Date();
          const selectedDate = new Date(dateStr);
          return selectedDate <= today;
        }}
        leftSection={<IconCalendar size={16} />}
        style={{ width: 165 }}
      />
      <Divider orientation="vertical" />
      <GuestsRoomsSelector
        guests={guests}
        rooms={rooms}
        onGuestsChange={handleGuestsChange}
        onRoomsChange={handleRoomsChange}
      />
    </Group>
  );
}
