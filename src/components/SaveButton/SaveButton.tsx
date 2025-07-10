import { type MantineStyleProps } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { IconButton } from '../IconButton/IconButton';

interface SaveButtonProps {
  width?: MantineStyleProps['w'];
}

export function SaveButton({ width }: SaveButtonProps) {
  const handleSave = () => {
    // TODO: Implement save functionality here
    console.log('Save button clicked');
  };

  return (
    <>
      <IconButton label="Save" icon={<IconHeart size={24} />} onClick={handleSave} w={width} />
    </>
  );
}
