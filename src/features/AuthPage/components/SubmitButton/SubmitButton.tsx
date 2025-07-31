import { Button, type ButtonProps, type ElementProps } from '@mantine/core';

interface SubmitButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  disabled: boolean;
}
export function SubmitButton({
  disabled,
  ff = 'heading',
  fw = 500,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <>
      <Button
        type="submit"
        size={'lg'}
        radius={'xl'}
        disabled={disabled}
        ff={ff}
        fw={fw}
        {...props}
      >
        {children}
      </Button>
    </>
  );
}
