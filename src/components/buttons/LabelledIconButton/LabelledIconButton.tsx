import { Button, Text, type ButtonProps } from '@mantine/core';

interface LabelledIconButtonProps extends ButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function LabelledIconButton({
  label,
  icon,
  w = '110px',
  onClick,
  ...props
}: LabelledIconButtonProps) {
  return (
    <Button w={w} leftSection={icon} onClick={onClick} {...props}>
      <Text fz={'md'}>{label}</Text>
    </Button>
  );
}
