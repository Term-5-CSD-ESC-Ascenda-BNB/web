import React from 'react';
import { IconDots } from '@tabler/icons-react';
import { Drawer } from '@mantine/core';
import { IconButton } from '@/components/IconButton/IconButton';
import { useDisclosure } from '@mantine/hooks';
import styles from './MenuButton.module.css';
import { Logo } from '@/components/Logo/Logo';
import { Text } from '@mantine/core';

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
        {/* //TODO: add Drawer content */}

        <Text>aosjdoiasjd</Text>
      </Drawer>
    </>
  );
}
