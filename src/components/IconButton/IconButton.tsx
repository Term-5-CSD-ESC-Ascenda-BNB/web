import { AspectRatio, UnstyledButton } from '@mantine/core';
import type { UnstyledButtonProps, ElementProps } from '@mantine/core';
import styles from './IconButton.module.css';
import React from 'react';
import type { Icon } from '@tabler/icons-react';

export interface IconButtonProps
  extends UnstyledButtonProps,
    ElementProps<'button', keyof UnstyledButtonProps> {
  icon: React.ReactElement<Icon>;
}

export function IconButton({ className, icon, ...props }: IconButtonProps) {
  const combinedClassName = className ? `${styles.iconButton} ${className}` : styles.iconButton;

  return (
    <AspectRatio ratio={1}>
      <UnstyledButton className={combinedClassName} {...props}>
        {icon}
      </UnstyledButton>
    </AspectRatio>
  );
}
