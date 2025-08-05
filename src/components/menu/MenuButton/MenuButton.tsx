import React from 'react';
import { IconDots, IconHomeFilled, IconLogin, IconSearch } from '@tabler/icons-react';
import { Drawer, Stack } from '@mantine/core';
import { IconButton } from '@/components/IconButton/IconButton';
import { useDisclosure } from '@mantine/hooks';
import { Logo } from '@/components/Logo/Logo';
import { MenuNavLink } from '@/components/menu/MenuLink/MenuLink';
import styles from './MenuButton.module.css';

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
          <MenuNavLink to="/" icon={IconHomeFilled} label="Home" className={styles.menuLink} />
          <MenuNavLink to="/search" icon={IconSearch} label="Search" className={styles.menuLink} />
          <MenuNavLink to="/login" icon={IconLogin} label="Login" className={styles.menuLink} />
        </Stack>
      </Drawer>
    </>
  );
}
