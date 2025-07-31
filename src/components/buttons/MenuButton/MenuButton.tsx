import React from 'react';
import { IconDots } from '@tabler/icons-react';
import { Drawer, Stack } from '@mantine/core';
import { IconButton } from '@/components/IconButton/IconButton';
import { useDisclosure } from '@mantine/hooks';
import styles from './MenuButton.module.css';
import { Logo } from '@/components/Logo/Logo';
import { Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';

export function MenuButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <IconButton
        className={styles.menuButton}
        icon={<IconDots size={20} />}
        w={42}
        onClick={open}
        {...props}
      />

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={<Logo fz={'2rem'} />}
        overlayProps={{ blur: 4 }}
        styles={{
          header: {
            padding: '1rem 1rem 1rem 2rem',
          },
          body: {
            padding: '0',
          },
        }}
      >
        <Stack component={'nav'} gap={0} className={styles.menuStack}>
          <Link to="/" className={styles.menuLink}>
            Home
          </Link>
          <Link to="/search" className={styles.menuLink}>
            Search
          </Link>
          <Link to="/login" className={styles.menuLink}>
            Login
          </Link>
        </Stack>
      </Drawer>
    </>
  );
}
