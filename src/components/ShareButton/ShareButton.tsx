import { type MantineStyleProps } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import { IconButton } from '../IconButton/IconButton';

interface ShareButtonProps {
  width?: MantineStyleProps['w'];
}

export function ShareButton({ width }: ShareButtonProps) {
  const handleShare = () => {
    // TODO: Implement share functionality here
    console.log('Share button clicked');
  };

  return (
    <>
      <IconButton label="Share" icon={<IconShare size={24} />} onClick={handleShare} w={width} />
    </>
  );
}
