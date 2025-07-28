import { type MantineStyleProps } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import { LabelledIconButton } from '@/components/buttons/LabelledIconButton/LabelledIconButton';

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
      <LabelledIconButton
        label="Share"
        icon={<IconShare size={24} />}
        onClick={handleShare}
        w={width}
        variant="subtle"
      />
    </>
  );
}
