import React from 'react';
import {
  IconDots,
  IconHomeFilled,
  IconSearch,
  IconUserFilled,
  IconLogin,
  IconLogout,
} from '@tabler/icons-react';
import { Drawer, Stack } from '@mantine/core';
import { IconButton } from '@/components/IconButton/IconButton';
import { useDisclosure } from '@mantine/hooks';
import { Logo } from '@/components/Logo/Logo';
import { MenuNavLink } from '@/components/menu/MenuLink/MenuLink';
import styles from './MenuButton.module.css';
import { useProfile } from '@/hooks/useProfile';
import { logoutUser } from '@/features/AuthPage/login/api';
import { showNotification } from '@mantine/notifications';

export function MenuButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { profile } = useProfile();
  const [opened, { open, close }] = useDisclosure(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      showNotification({ message: 'Logged out successfully', color: 'green' });
      window.location.reload();
    } catch {
      showNotification({ message: 'Logout failed', color: 'red' });
    }
  };

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
          <MenuNavLink
            to="/profile"
            icon={IconUserFilled}
            label="Profile"
            className={styles.menuLink}
          />
          {!profile && (
            <MenuNavLink
              to="/login"
              icon={IconLogin}
              label="Login"
              className={styles.menuLink}
              reloadDocument
            />
          )}

          {profile && (
            <MenuNavLink
              icon={IconLogout}
              label="Logout"
              className={styles.menuLink}
              onClick={(e) => {
                e.preventDefault();
                void handleLogout();
              }}
            />
          )}
        </Stack>
      </Drawer>
    </>
  );
}
