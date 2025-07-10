import { Text, type MantineStyleProps } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

interface SaveButtonProps {
  width: MantineStyleProps['w'];
}

export function SaveButton({ width }: SaveButtonProps) {
  return (
    <>
      <Button w={width} leftSection={<IconHeart size={24} />}>
        <Text fz={'md'}>Save</Text>
      </Button>
    </>
  );
}
