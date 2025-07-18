import { Logo } from '@/components/Logo/Logo';
import { MenuButton } from '@/components/buttons/';
import styles from './IndexTopNavBar.module.css';

export function IndexTopNavBar() {
  return (
    <div className={styles['indexTopNavBar']}>
      <div className={styles['logo']}>
        <Logo />
      </div>
      <div className={styles['menu']}>
        <MenuButton />
      </div>
    </div>
  );
}
