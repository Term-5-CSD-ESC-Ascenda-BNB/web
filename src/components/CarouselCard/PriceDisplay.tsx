import { Text, Group } from '@mantine/core';

interface PriceDisplayProps {
  price: number;
  currencySymbol?: string;
  suffix?: string;
}

export function PriceDisplay({
  price,
  currencySymbol = '$',
  suffix = '/night',
}: PriceDisplayProps) {
  const formattedPrice = price.toFixed(2);

  return (
    <Group gap={4}>
      <Text fz="xl" fw={500}>
        {currencySymbol}
        {formattedPrice}
      </Text>
      <Text fz="sm" c="dimmed">
        {suffix}
      </Text>
    </Group>
  );
}
