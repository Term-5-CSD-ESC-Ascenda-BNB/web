import { Group, Text, useMantineTheme } from '@mantine/core';
import { Link, type LinkComponentProps } from '@tanstack/react-router';
import type { TablerIcon } from '@tabler/icons-react';

interface MenuLinkProps extends LinkComponentProps<'a'> {
  icon: TablerIcon;
  label: string;
  className?: string;
}

export function MenuNavLink({ to, icon: Icon, label, className, ...props }: MenuLinkProps) {
  const theme = useMantineTheme();
  return (
    <Link to={to} className={className} {...props}>
      <Group>
        <Icon size={20} color={theme.colors.primary[9]} />
        <Text>{label}</Text>
      </Group>
    </Link>
  );
}
