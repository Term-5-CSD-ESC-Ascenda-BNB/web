import { Group, Text, useMantineTheme } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { TablerIcon } from '@tabler/icons-react';

interface MenuLinkProps {
  to: string;
  icon: TablerIcon;
  label: string;
  className?: string;
}

export function MenuNavLink({ to, icon: Icon, label, className }: MenuLinkProps) {
  const theme = useMantineTheme();
  return (
    <Link to={to} className={className}>
      <Group>
        <Icon size={20} color={theme.colors.primary[9]} />
        <Text>{label}</Text>
      </Group>
    </Link>
  );
}
