import { IconDots } from '@tabler/icons-react';
import { IconButton } from '../../IconButton/IconButton';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './MenuButton.module.css';
import React from 'react';
import { Logo } from '@/components/Logo/Logo';

export function MenuButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <IconButton
        className={styles.menuButton}
        icon={<IconDots size={20} />}
        onClick={open}
        {...props}
      />

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={<Logo fontSize={'1.5rem'} />}
        overlayProps={{ blur: 4 }}
      >
        {/* Drawer content goes here */}
      </Drawer>
    </>
  );
}
