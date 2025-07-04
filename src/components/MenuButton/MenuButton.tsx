import { IconDots } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import styles from './MenuButton.module.css';
import React from 'react';

export function MenuButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <UnstyledButton className={styles.menuButton} {...props}>
      <IconDots size={20} />
    </UnstyledButton>
  );
}
