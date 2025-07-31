import React from 'react';
import { IconDots } from '@tabler/icons-react';
import { Drawer } from '@mantine/core';
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
        title={<Logo fz={'1.5rem'} />}
        overlayProps={{ blur: 4 }}
        styles={{
          body: {
            padding: '0',
          },
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
          <Link to="/" className={styles.menuLink}>
            Home
          </Link>
          <Link to="/search" className={styles.menuLink}>
            Search
          </Link>
          <Link to="/register" className={styles.menuLink}>
            Register
          </Link>
          <Link to="/login" className={styles.menuLink}>
            Login
          </Link>
        </nav>
      </Drawer>
    </>
  );
}
