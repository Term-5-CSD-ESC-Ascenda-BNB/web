import {
  IconMapPin,
  IconTrain,
  IconPlane,
  IconShoppingBag,
  IconToolsKitchen,
  IconStar,
  IconCoffee,
  IconBed,
  IconBook,
  IconBriefcase,
  IconSchool,
  IconBuildingStore,
  IconMusic,
  IconBeer,
  IconCamera,
  IconBike,
  IconBus,
  IconCar,
  IconHome,
} from '@tabler/icons-react';

export function getSurroundingIcon(type: string): React.ReactElement {
  const t = type.toLowerCase();

  if (t.includes('train') || t.includes('metro') || t.includes('station'))
    return <IconTrain size={18} />;
  if (t.includes('hotel') || t.includes('lodging') || t.includes('inn'))
    return <IconBed size={18} />;
  if (t.includes('book') || t.includes('library')) return <IconBook size={18} />;
  if (t.includes('airport') || t.includes('plane')) return <IconPlane size={18} />;
  if (t.includes('shopping') || t.includes('store') || t.includes('mall'))
    return <IconShoppingBag size={18} />;
  if (t.includes('restaurant') || t.includes('dining') || t.includes('food'))
    return <IconToolsKitchen size={18} />;
  if (t.includes('attraction') || t.includes('sight') || t.includes('tour'))
    return <IconStar size={18} />;
  if (t.includes('cafe') || t.includes('coffee')) return <IconCoffee size={18} />;
  if (t.includes('office') || t.includes('business')) return <IconBriefcase size={18} />;
  if (t.includes('school') || t.includes('university')) return <IconSchool size={18} />;
  if (t.includes('gallery') || t.includes('museum')) return <IconBuildingStore size={18} />;
  if (t.includes('music') || t.includes('band')) return <IconMusic size={18} />;
  if (t.includes('bar') || t.includes('pub') || t.includes('nightclub'))
    return <IconBeer size={18} />;
  if (t.includes('photo') || t.includes('camera')) return <IconCamera size={18} />;
  if (t.includes('bike') || t.includes('bicycle')) return <IconBike size={18} />;
  if (t.includes('bus')) return <IconBus size={18} />;
  if (t.includes('car') || t.includes('vehicle') || t.includes('parking'))
    return <IconCar size={18} />;
  if (t.includes('home') || t.includes('residence')) return <IconHome size={18} />;

  return <IconMapPin size={18} />;
}
