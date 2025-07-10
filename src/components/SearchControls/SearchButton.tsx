import { IconSearch } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import styles from './SearchButton.module.css';
import React from 'react';

export function SearchButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <UnstyledButton className={styles.searchButton} {...props}>
      <IconSearch className={styles.icon} />
    </UnstyledButton>
  );
}
