import { Group, TextInput, useMantineTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconMapPinFilled } from '@tabler/icons-react';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { useSearchControls } from './useSearchControls';

interface SearchControlsProps {
  flex?: number;
}

export function SearchControls({ flex = 1 }: SearchControlsProps) {
  // Example date result: ['2025-07-01', '2025-07-10']
  const { date, guests, rooms, setDate, handleGuestsChange, handleRoomsChange } =
    useSearchControls();

  const theme = useMantineTheme();

  return (
    <Group gap="xs" flex={flex} display={'flex'}>
      {/* // TODO: Make this text input autocomplete */}
      <TextInput
        flex={flex}
        miw={100}
        leftSection={<IconMapPinFilled size={16} color={theme.colors.primary[4]} />}
        radius={50}
      />
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
  );
}
