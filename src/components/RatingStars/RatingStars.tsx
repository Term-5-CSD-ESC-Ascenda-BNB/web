import { Group } from '@mantine/core';
import { IconStarFilled, IconStarHalfFilled, IconStar } from '@tabler/icons-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  color?: string;
  showEmpty?: boolean;
}

export function RatingStars({
  rating,
  size = 16,
  color = 'var(--mantine-color-yellow-6)',
  showEmpty = true,
}: RatingStarsProps) {
  // Round to nearest half
  const roundedRating = Math.round(rating * 2) / 2;

  // Calculate the number of filled, half, and empty stars
  const filledStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = showEmpty ? 5 - filledStars - (hasHalfStar ? 1 : 0) : 0;

  const stars = [];

  // Add filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<IconStarFilled key={`filled-${i}`} size={size} color={color} />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<IconStarHalfFilled key="half" size={size} color={color} />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<IconStar key={`empty-${i}`} size={size} color={color} />);
  }

  return <Group gap={0}>{stars}</Group>;
}
