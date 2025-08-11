import { useCallback } from 'react';
import { type MantineStyleProps } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import { LabelledIconButton } from '@/components/buttons/LabelledIconButton/LabelledIconButton';
import { notifications } from '@mantine/notifications';

interface ShareButtonProps {
  width?: MantineStyleProps['w'];
}

export function ShareButton({ width }: ShareButtonProps) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      notifications.show({
        title: 'Link copied',
        message: 'Page link copied to clipboard!',
        color: '#7B76B5',
        position: 'top-center',
      });
    } catch (err) {
      console.error('Failed to copy link', err);
      notifications.show({
        title: 'Copy failed',
        message: 'Unable to copy the link. Please try again.',
        color: 'red',
        position: 'top-center',
      });
    }
  }, []);

  return (
    <LabelledIconButton
      label="Share"
      icon={<IconShare size={24} />}
      onClick={() => {
        void handleShare();
      }}
      w={width}
      variant="subtle"
    />
  );
}
