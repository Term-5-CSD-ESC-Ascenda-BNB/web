import { IconHeadphones } from '@tabler/icons-react';
import styles from './HelpButton.module.css';
import { IconButton, type IconButtonProps } from '@/components/IconButton/IconButton';

type HelpButtonProps = Omit<IconButtonProps, 'icon'>;

export function HelpButton(props: HelpButtonProps) {
  return (
    <IconButton
      icon={<IconHeadphones size={20} />}
      className={styles.helpButton}
      w={42}
      {...props}
    />
  );
}
