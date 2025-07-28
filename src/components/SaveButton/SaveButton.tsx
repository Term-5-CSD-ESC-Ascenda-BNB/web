import { type MantineStyleProps } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { LabelledIconButton } from '@/components/buttons/LabelledIconButton/LabelledIconButton';

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
      <LabelledIconButton
        label="Save"
        icon={isSaved ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
        onClick={handleSave}
        w={width}
        variant="subtle"
      />
    </>
  );
}
