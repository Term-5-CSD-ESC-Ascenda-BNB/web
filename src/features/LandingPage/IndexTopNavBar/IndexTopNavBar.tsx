import { Logo } from '@/components/Logo/Logo';
import { MenuButton } from '@/components/buttons/';
import styles from './IndexTopNavBar.module.css';
import { Button, Group } from '@mantine/core';
import { useProfile } from '@/hooks/useProfile';

export function IndexTopNavBar() {
  const { profile, isLoading } = useProfile();

  return (
    <Group
      className={styles['indexTopNavBar']}
      justify="space-between"
      align="center"
      w={'100%'}
      px={'xl'}
      py={'lg'}
    >
      <Logo fz={'1.75rem'} />

      <Group>
        {!isLoading && !profile && (
          <Button
            component="a"
            href="/login"
            variant="filled"
            radius={'xl'}
            color={'rgba(255,255,255,0.15)'}
            size={'md'}
            style={{ backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
          >
            Login
          </Button>
        )}
        <MenuButton />
      </Group>
    </Group>
  );
}
