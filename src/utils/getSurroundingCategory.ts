import type { Category } from '@/components/HotelMap/mapHelpers';

export function getCategory(type: string): Category {
  const t = type.toLowerCase();

  if (
    ['bus', 'subway', 'station', 'train', 'taxi', 'public_transport', 'platform'].some((s) =>
      t.includes(s)
    )
  )
    return 'Transport';

  if (
    ['restaurant', 'cafe', 'fast_food', 'food_court', 'bakery', 'ice_cream'].some((s) =>
      t.includes(s)
    )
  )
    return 'Dining';

  if (
    ['supermarket', 'mall', 'store', 'convenience', 'toys', 'electronics', 'retail', 'shop'].some(
      (s) => t.includes(s)
    )
  )
    return 'Shopping';

  if (
    [
      'hotel',
      'guest_house',
      'museum',
      'school',
      'park',
      'monument',
      'temple',
      'church',
      'police',
    ].some((s) => t.includes(s))
  )
    return 'Landmarks';

  return 'Others';
}

export function getCategoryColor(category: Category): string {
  switch (category) {
    case 'Transport':
      return '#1c7ed6'; // Blue
    case 'Dining':
      return '#e8590c'; // Orange
    case 'Shopping':
      return '#2f9e44'; // Green
    case 'Landmarks':
      return '#fab005'; // Yellow
    default:
      return '#868e96'; // Gray
  }
}
