import { Stack, Group, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { useSearchControls } from './useSearchControls';
import { DestinationSearch } from './DestinationSearch';
import { SearchButton } from '../buttons/SearchButton/SearchButton';

interface SearchControlsProps {
  flex?: number;
}

export function SearchControlsLanding({ flex = 1 }: SearchControlsProps) {
  // Example date result: ['2025-07-01', '2025-07-10']
  const { date, guests, rooms, setDate, handleGuestsChange, handleRoomsChange } =
    useSearchControls();

  const [selectedUid, setSelectedUid] = useState('');

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="wrap" style={{ gap: 8 }}>
        <DestinationSearch onDestinationChange={setSelectedUid} />
        <SearchButton />
      </Group>

      <Group gap="xs" wrap="wrap">
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
          radius={50}
        />
        <GuestsRoomsSelector
          guests={guests}
          rooms={rooms}
          onGuestsChange={handleGuestsChange}
          onRoomsChange={handleRoomsChange}
        />
      </Group>
    </Stack>
  );
}
