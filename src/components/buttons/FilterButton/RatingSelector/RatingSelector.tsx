import { Rating, Text } from '@mantine/core';

interface RatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export function RatingSelector({ value, onChange, label = 'Minimum Rating' }: RatingSelectorProps) {
  return (
    <div>
      <Text size={'sm'} mb={8}>
        {label}
      </Text>
      <Rating value={value} onChange={onChange} />
    </div>
  );
}
