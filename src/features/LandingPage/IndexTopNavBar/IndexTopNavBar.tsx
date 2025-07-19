import { Logo } from '@/components/Logo/Logo';
import { MenuButton } from '@/components/buttons/';
import styles from './IndexTopNavBar.module.css';
import { Group } from '@mantine/core';

export function IndexTopNavBar() {
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
      <MenuButton />
    </Group>
  );
}
