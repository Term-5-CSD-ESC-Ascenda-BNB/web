import { Slider, Text } from '@mantine/core';

interface ReviewScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function ReviewScoreSlider({
  value,
  onChange,
  label = 'Minimum Review Score',
  min = 0,
  max = 10,
  step = 0.1,
}: ReviewScoreSliderProps) {
  const marks = [
    { value: 0 },
    { value: 2 },
    { value: 4 },
    { value: 6 },
    { value: 8 },
    { value: 10 },
  ];

  return (
    <div>
      <Text size={'sm'} mb={8}>
        {label}
      </Text>
      <Slider
        data-testid="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        marks={marks}
      />
    </div>
  );
}
