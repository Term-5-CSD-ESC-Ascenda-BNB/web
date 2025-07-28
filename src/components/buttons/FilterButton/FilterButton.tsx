import { IconFilter } from '@tabler/icons-react';
import { IconButton } from '../../IconButton/IconButton';
import React, { useState } from 'react';
import { Popover, Indicator } from '@mantine/core';
import { FilterPanel, type FilterState } from './FilterPanel';
import { useFilterState } from './useFilterState';
import styles from './FilterButton.module.css';

interface FilterButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export function FilterButton({ onFiltersChange, initialFilters, ...props }: FilterButtonProps) {
  const [opened, setOpened] = useState(false);

  const {
    draftFilters,
    setDraftFilters,
    countAppliedFilters,
    handleApplyFilters,
    handleResetFilters,
    resetDraftFilters,
    defaultFilters,
  } = useFilterState({ initialFilters, onFiltersChange });

  const handlePopoverClose = (opened: boolean) => {
    setOpened(opened);
    if (!opened) {
      resetDraftFilters();
    }
  };

  const handleButtonClick = () => {
    if (opened) {
      handlePopoverClose(false);
    } else {
      setOpened(true);
    }
  };

  const onApply = () => {
    handleApplyFilters();
    setOpened(false);
  };

  const appliedFiltersCount = countAppliedFilters();

  return (
    <Popover
      width={300}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={handlePopoverClose}
    >
      <Popover.Target>
        <Indicator
          label={appliedFiltersCount}
          disabled={appliedFiltersCount === 0}
          size={16}
          offset={5}
        >
          <IconButton
            icon={<IconFilter size={16} className={styles.filterIcon} />}
            onClick={handleButtonClick}
            className={styles.filterButton}
            w={36}
            {...props}
          />
        </Indicator>
      </Popover.Target>

      <Popover.Dropdown p="md">
        <FilterPanel
          filters={draftFilters}
          onFiltersChange={setDraftFilters}
          onApply={onApply}
          onReset={handleResetFilters}
          defaultFilters={defaultFilters}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
