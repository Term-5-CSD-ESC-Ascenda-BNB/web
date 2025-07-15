import { TextInput, useMantineTheme } from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { SearchButton } from './SearchButton';
import styles from './DestinationSearchInput.module.css';

interface Option {
  label: string;
  value: string;
}

interface DestinationSearchInputProps {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  radius?: number;
}

export function DestinationSearchInput({
  options,
  onSelect,
  placeholder = 'Where to next?',
  radius = 25,
}: DestinationSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const theme = useMantineTheme();

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

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on dropdown items
    setTimeout(() => setIsDropdownOpen(false), 100);
  };

  return (
    <div className={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        leftSection={<IconMapPinFilled size={16} color={theme.colors.gray[6]} />}
        rightSection={<SearchButton />}
        radius={radius}
        size="md"
        styles={{
          input: {
            paddingRight: 45, // Make space for the search button
          },
        }}
      />

      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className={styles.dropdown}>
          {filteredOptions.slice(0, 10).map((option) => (
            <li
              key={option.value}
              onMouseDown={() => handleSelect(option)}
              className={styles.dropdownItem}
            >
              <strong>{option.label.slice(0, searchTerm.length)}</strong>
              {option.label.slice(searchTerm.length)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
