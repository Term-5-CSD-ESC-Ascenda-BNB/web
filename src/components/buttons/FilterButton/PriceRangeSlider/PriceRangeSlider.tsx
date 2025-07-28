import { RangeSlider, Text } from '@mantine/core';

interface PriceRangeSliderProps {
  value: [number, number];
  maxPrice: number;
  onChange: (value: [number, number]) => void;
  label?: string;
}

export function PriceRangeSlider({
  value,
  maxPrice,
  onChange,
  label = 'Price Range',
}: PriceRangeSliderProps) {
  const marks = [
    { value: 0 },
    { value: Math.floor(maxPrice * 0.25) },
    { value: Math.floor(maxPrice * 0.5) },
    { value: Math.floor(maxPrice * 0.75) },
    { value: maxPrice },
  ];

  return (
    <div>
      <Text size={'sm'} mb={8}>
        {label}
      </Text>
      <RangeSlider
        min={0}
        max={maxPrice}
        step={10}
        value={value}
        onChange={onChange}
        marks={marks}
      />
    </div>
  );
}
