import {
  IconTrain,
  IconToolsKitchen,
  IconShoppingBag,
  IconStar,
  IconMapPin,
  IconBed,
} from '@tabler/icons-react';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';

export type Category = 'Transport' | 'Dining' | 'Shopping' | 'Landmarks' | 'Others';

export function categorizeType(type: string): Category {
  const t = type.toLowerCase();

  if (
    ['bus_stop', 'subway', 'train', 'platform', 'station', 'taxi', 'public_transport'].some((s) =>
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
      return '#1c7ed6';
    case 'Dining':
      return '#e8590c';
    case 'Shopping':
      return '#2f9e44';
    case 'Landmarks':
      return '#fab005';
    default:
      return '#868e96';
  }
}

export function getCategoryIcon(category: Category): React.ReactElement {
  switch (category) {
    case 'Transport':
      return <IconTrain size={18} color="white" />;
    case 'Dining':
      return <IconToolsKitchen size={18} color="white" />;
    case 'Shopping':
      return <IconShoppingBag size={18} color="white" />;
    case 'Landmarks':
      return <IconStar size={18} color="white" />;
    default:
      return <IconMapPin size={18} color="white" />;
  }
}

export function getPOIIcon(category: Category) {
  const icon = getCategoryIcon(category);
  const bgColor = getCategoryColor(category);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {icon}
    </div>
  );
}

export function getHotelIcon() {
  return divIcon({
    className: '',
    html: renderToStaticMarkup(
      <div
        style={{
          backgroundColor: '#6741d9',
          borderRadius: '50%',
          width: 70,
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconBed size={35} color="white" />
      </div>
    ),
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });
}
