import { useDestination } from '@/hooks/useDestinations';
import { Stack, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { useSearchControls } from './hooks';
import { DestinationSearchInput } from './DestinationSearchInput';

interface SearchControlsProps {
  flex?: number;
}

interface Option {
  label: string;
  value: string;
}

export function SearchControlsLanding({ flex: _flex = 1 }: SearchControlsProps) {
  // Example date result: ['2025-07-01', '2025-07-10']
  const { terms } = useDestination(); // fetch terms
  const { date, guests, rooms, setDate, handleGuestsChange, handleRoomsChange } =
    useSearchControls();

  const [_selectedLocation, setSelectedLocation] = useState('');

  const options: Option[] = terms.map((term) => ({
    label: term,
    value: term,
  }));

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="wrap" style={{ gap: 8 }}>
        <div style={{ flexGrow: 1 }}>
          <DestinationSearchInput
            options={options}
            onSelect={(value) => setSelectedLocation(value)}
            placeholder="Where to next?"
            radius={25}
          />
        </div>
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
