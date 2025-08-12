import { useRouter } from '@tanstack/react-router';
import { Text, type ElementProps, type TextProps } from '@mantine/core';

interface LogoProps extends Omit<TextProps, 'ff'>, ElementProps<'a', keyof TextProps> {}

export function Logo({ className, fz = '2rem', fw = 500, style = {}, ...props }: LogoProps) {
  const router = useRouter();
  const handleClick = () => {
    void router.navigate({ to: '/' });
  };

  return (
    <Text
      component="a"
      style={{
        cursor: 'pointer',
        ...style,
      }}
      ff={'"Cormorant Garamond", serif'}
      fz={fz}
      fw={fw}
      onClick={handleClick}
      className={className}
      {...props}
      role="link"
    >
      Wayfare
    </Text>
  );
}
