import { Button } from '@mantine/core';

interface SocialButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialButton({ children, onClick, disabled }: SocialButtonProps) {
  return (
    <Button
      variant="default"
      radius="xl"
      px={0}
      size="lg"
      style={{ width: 54, height: 54, background: '#fff', border: '1px solid #e4e4ec' }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
