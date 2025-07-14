import { IconDots } from '@tabler/icons-react';
import { IconButton } from '@/components/IconButton/IconButton';
import styles from './MenuButton.module.css';
import React from 'react';

export function MenuButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <IconButton className={styles.menuButton} icon={<IconDots size={20} />} {...props} />;
}
