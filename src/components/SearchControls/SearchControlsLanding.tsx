import { useDestinations } from '@/hooks/useDestinations';
import { Stack, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { useSearchControls } from './useSearchControls';
import { DestinationSearchInput } from './DestinationSearchInput';
import { DestinationSearch } from './DestinationSearch';
import { SearchButton } from '../buttons/SearchButton/SearchButton';

interface SearchControlsProps {
  flex?: number;
}

interface Option {
  label: string;
  value: string;
}

export function SearchControlsLanding({ flex: _flex = 1 }: SearchControlsProps) {
  // Example date result: ['2025-07-01', '2025-07-10']
  const { terms } = useDestinations(); // fetch terms
  const { date, guests, rooms, setDate, handleGuestsChange, handleRoomsChange } =
    useSearchControls();

  const [_selectedLocation, setSelectedLocation] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const options: Option[] = terms.map((term) => ({
    label: term,
    value: term,
  }));

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="wrap" style={{ gap: 8 }}>
        <DestinationSearchInput
          options={options}
          onSelect={(value) => setSelectedLocation(value)}
          placeholder="Where to next?"
          radius={25}
        />
      </Group>
      <Group justify="space-between" wrap="wrap" style={{ gap: 8 }}>
        <DestinationSearch
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Select your destination"
        />
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
