import { Button, Text, type MantineStyleProps } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';

interface ShareButtonProps {
  width: MantineStyleProps['w'];
}

export function ShareButton({ width }: ShareButtonProps) {
  return (
    <>
      <Button w={width} leftSection={<IconShare size={24} />}>
        <Text fz={'md'}>Share</Text>
      </Button>
    </>
  );
}
