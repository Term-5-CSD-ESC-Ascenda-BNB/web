import { type MantineStyleProps } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { IconButton } from '../IconButton/IconButton';
import { useState } from 'react';

interface SaveButtonProps {
  width?: MantineStyleProps['w'];
}

export function SaveButton({ width }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implement save functionality here
    setIsSaved(!isSaved);
  };

  return (
    <>
      <IconButton
        label="Save"
        icon={isSaved ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
        onClick={handleSave}
        w={width}
        variant="subtle"
      />
    </>
  );
}
