import { IconButton, type IconButtonProps } from '@/components/IconButton/IconButton';
import { IconSearch } from '@tabler/icons-react';
import styles from './SearchButton.module.css';

interface SearchButtonProps extends Omit<IconButtonProps, 'icon'> {
  iconSize?: number;
}

export function SearchButton({ iconSize = 20, ...props }: SearchButtonProps) {
  return (
    <IconButton
      icon={<IconSearch size={iconSize} color="var(--mantine-color-primary-1)" />}
      className={styles.searchButton}
      w={42}
      data-testid="search-button"
      {...props}
    />
  );
}
