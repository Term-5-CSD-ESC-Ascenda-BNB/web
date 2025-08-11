import { Select, ActionIcon } from '@mantine/core';
import type { SelectProps } from '@mantine/core';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useState } from 'react';

interface SortableSelectProps<T extends string>
  extends Omit<
    SelectProps,
    | 'data'
    | 'value'
    | 'onChange'
    | 'leftSection'
    | 'leftSectionWidth'
    | 'leftSectionPointerEvents'
    | 'leftSectionProps'
  > {
  fields: T[];
  defaultField?: T;
  defaultOrder?: 'asc' | 'desc';
  onSortChange?: (field: T, order: 'asc' | 'desc') => void;
}

export function SortableSelect<T extends string>({
  fields,
  defaultField,
  defaultOrder = 'desc',
  onSortChange,
  ...selectProps
}: SortableSelectProps<T>) {
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);
  const [field, setField] = useState<T>(defaultField || fields[0]);

  const handleFieldChange = (value: string | null) => {
    if (value !== null) {
      setField(value as T);
      onSortChange?.(value as T, order);
    }
  };

  const handleOrderToggle = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    onSortChange?.(field, newOrder);
  };

  return (
    <Select
      {...selectProps}
      data={fields}
      value={field}
      placeholder="Select field"
      onChange={handleFieldChange}
      allowDeselect={false}
      leftSection={
        <ActionIcon variant="subtle" size="sm">
          {order === 'asc' ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />}
        </ActionIcon>
      }
      leftSectionWidth={32}
      leftSectionPointerEvents="all"
      leftSectionProps={{
        onClick: handleOrderToggle,
        style: { cursor: 'pointer' },
      }}
    />
  );
}
