import { useDestination } from '@/hooks/useDestinations';
import { Stack, Group, useMantineTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconMapPinFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { SearchButton } from './SearchButton';

interface SearchControlsProps {
  flex?: number;
}

interface Option {
  label: string;
  value: string;
}

interface SearchBarWithDropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const SearchBarWithDropdown: React.FC<SearchBarWithDropdownProps> = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = options.filter((option) => {
        const label = option.label;
        if (typeof label !== 'string') return false; // skip if not string
        const search = searchTerm.toLowerCase();
        return label.toLowerCase().startsWith(search);
      });
      setFilteredOptions(filtered);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchTerm, options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (option: Option) => {
    setSearchTerm(option.label);
    onSelect(option.value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="search-bar-container" style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        placeholder="Where to next?"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)} // Delay to allow click
        style={{
          width: '100%',
          padding: '12px 40px 12px 40px',
          borderRadius: 25,
          border: '1px solid #ccc',
          paddingLeft: 40,
        }}
      />
      <IconMapPinFilled
        size={16}
        style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#888',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 6,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <SearchButton />
      </div>
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul
          className="dropdown-list"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '16px',
            maxHeight: 200,
            overflowY: 'auto',
            zIndex: 100,
            listStyle: 'none',
            margin: 0,
            marginTop: '5px',
            padding: 0,
          }}
        >
          {filteredOptions.slice(0, 10).map(
            (
              option // sliced it so that it wont lag so much when typing
            ) => (
              <li
                key={option.value}
                // onClick={() => handleSelect(option)}
                onMouseDown={() => handleSelect(option)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
              >
                <strong>{option.label.slice(0, searchTerm.length)}</strong>
                {option.label.slice(searchTerm.length)}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export function SearchControlsLanding({ flex = 1 }: SearchControlsProps) {
  // Example date result: ['2025-07-01', '2025-07-10']
  const { terms, isLoading } = useDestination(); // fetch terms

  const [selectedLocation, setSelectedLocation] = useState('');
  const [date, setDate] = useState<[string | null, string | null]>([null, null]);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleGuestsChange = (delta: number) => {
    setGuests((prev) => Math.max(1, prev + delta));
  };

  const handleRoomsChange = (delta: number) => {
    setRooms((prev) => Math.max(1, prev + delta));
  };

  const theme = useMantineTheme();

  const options: Option[] = terms.map((term) => ({
    label: term,
    value: term,
  }));

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="wrap" style={{ gap: 8 }}>
        <div style={{ flexGrow: 1 }}>
          <SearchBarWithDropdown
            options={options}
            onSelect={(value) => setSelectedLocation(value)}
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
