import { Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  const theme = useMantineTheme();
  return (
    <>
      <Paper p={48} radius={'lg'} shadow={'0 2px 6px rgba(0, 0, 0, 0.1)'}>
        <Stack mb={'xl'} gap={0} align="center" justify="center">
          <Title order={1} ff={theme.other.displayFont} fw={500} fz={'2.5rem'} ta={'center'}>
            {title}
          </Title>
          <Text ff={'heading'} ta={'center'}>
            {subtitle}
          </Text>
        </Stack>

        {children}
      </Paper>
    </>
  );
}
