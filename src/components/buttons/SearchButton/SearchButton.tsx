import { IconButton, type IconButtonProps } from '@/components/IconButton/IconButton';
import { useMantineTheme } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import styles from './SearchButton.module.css';

type SearchButtonProps = Omit<IconButtonProps, 'icon'>;

export function SearchButton(props: SearchButtonProps) {
  const theme = useMantineTheme();
  return (
    <IconButton
      icon={<IconSearch size={20} color="var(--mantine-color-primary-1)" />}
      className={styles.searchButton}
      w={42}
      {...props}
    />
  );
}
