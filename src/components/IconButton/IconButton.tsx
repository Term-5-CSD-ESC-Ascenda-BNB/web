import { Button, Text, type ButtonProps } from '@mantine/core';

interface IconButtonProps extends ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function IconButton({ label, icon, w = '110px', onClick, ...props }: IconButtonProps) {
  return (
    <Button w={w} leftSection={icon} onClick={onClick} {...props}>
      <Text fz={'md'}>{label}</Text>
    </Button>
  );
}
