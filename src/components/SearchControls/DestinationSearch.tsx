import { Autocomplete, Group, Text } from '@mantine/core';
import { useDestinationSearch } from '@/hooks/useDestinationSearch';
import { IconMapPinFilled } from '@tabler/icons-react';

interface DestinationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DestinationSearch({
  value,
  onChange,
  placeholder = 'Search destinations...',
}: DestinationSearchProps) {
  const { searchResults, searchResultsWithIcons, error } = useDestinationSearch(value);

  // If destinations fail to load, show empty results
  if (error) {
    return <Autocomplete value={value} onChange={onChange} placeholder={placeholder} data={[]} />;
  }

  return (
    <Autocomplete
      leftSection={<IconMapPinFilled size={16} />}
      radius={9999}
      size={'md'}
      flex={1}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      limit={7}
      filter={({ options }) => options} // Disable Mantine's internal filtering - we handle it with Fuse.js
      data={searchResults}
      renderOption={({ option }) => {
        const optionData = searchResultsWithIcons.find((item) => item.label === option.value);
        if (!optionData) return option.value;

        const IconComponent = optionData.icon;
        return (
          <Group gap="xs" wrap="nowrap">
            <IconComponent size={16} style={{ flexShrink: 0 }} />
            <Text size="sm">{option.value}</Text>
          </Group>
        );
      }}
    />
  );
}
