import React from 'react';
import {
  IconBuildingSkyscraper,
  IconPlane,
  IconBuilding,
  IconBuildingBank,
  IconSchool,
  IconToolsKitchen2,
  IconShoppingBag,
  IconBuildingMonument,
  IconMask,
  IconBuildingStadium,
  IconCards,
  IconGolf,
  IconGlassFullFilled,
  IconBriefcase,
  IconBuildingHospital,
  IconBuildingCommunity,
  IconSkiJumping,
  IconAnchor,
  IconDirectionsFilled,
  IconTree,
  IconIceCream,
  IconSunglasses,
  IconBuildingEstate,
  IconMapPin,
  type IconProps,
} from '@tabler/icons-react';

/**
 * Returns the appropriate Tabler icon component for a destination type
 * @param type - The destination type (e.g., 'city', 'airport', 'museum')
 * @returns React component for the icon
 */
export const getIconByType = (type: string): React.FC<IconProps> => {
  const iconMap: Record<string, React.FC<IconProps>> = {
    city: IconBuildingSkyscraper,
    airport: IconPlane,
    hotel: IconBuilding,
    museum: IconBuildingBank,
    museums: IconBuildingBank,
    school: IconSchool,
    restaurant: IconToolsKitchen2,
    shopping: IconShoppingBag,
    historic: IconBuildingMonument,
    monument: IconBuildingMonument,
    theater: IconMask,
    stadium: IconBuildingStadium,
    casino: IconCards,
    golf: IconGolf,
    winery: IconGlassFullFilled,
    business: IconBriefcase,
    medical: IconBuildingHospital,
    civic: IconBuildingCommunity,
    skiing: IconSkiJumping,
    anchor: IconAnchor,
    sign: IconDirectionsFilled,
    tree: IconTree,
    icecream: IconIceCream,
    sunglass: IconSunglasses,
    district: IconBuildingEstate,
  };
  return iconMap[type.toLowerCase()] || IconMapPin;
};
