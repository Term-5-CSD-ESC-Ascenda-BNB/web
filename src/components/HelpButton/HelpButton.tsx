import { IconHeadphones } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import styles from './HelpButton.module.css';
import React from 'react';

export function HelpButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <UnstyledButton className={styles.helpButton} {...props}>
      <IconHeadphones size={20} />
    </UnstyledButton>
  );
}
