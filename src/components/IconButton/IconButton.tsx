import { UnstyledButton } from '@mantine/core';
import styles from './IconButton.module.css';
import React from 'react';
import type { Icon } from '@tabler/icons-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement<Icon>;
}

export function IconButton({ className, icon, ...props }: IconButtonProps) {
  const combinedClassName = className ? `${styles.iconButton} ${className}` : styles.iconButton;

  return (
    <UnstyledButton className={combinedClassName} {...props}>
      {icon}
    </UnstyledButton>
  );
}
