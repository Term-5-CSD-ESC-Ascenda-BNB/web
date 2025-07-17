import { Combobox, Group, InputBase, Text, useCombobox } from '@mantine/core';
import { useDestinationSearch, type DestinationSearchResult } from '@/hooks/useDestinationSearch';
import { IconMapPinFilled } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

interface DestinationSearchProps {
  onDestinationChange: (value: string) => void;
}

export function DestinationSearch({ onDestinationChange }: DestinationSearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const { searchResults, isLoading, error } = useDestinationSearch(searchValue);

  const lastValidTerm = useRef('');

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.targetRef.current?.blur();
    },
  });

  const handleSearchBegin = () => {
    combobox.openDropdown();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    combobox.updateSelectedOptionIndex();
    setSearchValue(event.currentTarget.value);
  };

  const handleSubmit = (value: DestinationSearchResult) => {
    onDestinationChange(value.uid);
    setSearchValue(value.term);
    lastValidTerm.current = value.term;
    combobox.closeDropdown();
  };

  const handleBlur = () => {
    // Rollback text input to the last valid search term
    setSearchValue(lastValidTerm.current);
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox}>
      <Combobox.Target>
        <InputBase
          onClick={() => handleSearchBegin()}
          onFocus={() => handleSearchBegin()}
          onChange={handleSearchChange}
          onBlur={handleBlur}
          value={searchValue}
          placeholder="Search for a destination..."
          flex={1}
          size="md"
          radius={9999}
          leftSection={<IconMapPinFilled size={16} />}
        />
      </Combobox.Target>
      <Combobox.Dropdown mah={250} style={{ overflowY: 'auto' }}>
        <Combobox.Options>
          {isLoading && (
            <Text mx={'md'} my={'sm'}>
              Loading...
            </Text>
          )}
          {error && (
            <Text c="red" mx={'md'} my={'sm'}>
              Error loading destinations
            </Text>
          )}

          {!isLoading && !error && searchResults.length === 0 && (
            <Text mx={'md'} my={'sm'}>
              No results found
            </Text>
          )}

          {searchResults.map((result, index) => (
            <Combobox.Option key={index} value={result.term} onClick={() => handleSubmit(result)}>
              <Group wrap="nowrap">
                <result.icon size={20} style={{ flexShrink: 0 }} />
                <Text>{result.term}</Text>
              </Group>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
