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
  type TablerIcon,
} from '@tabler/icons-react';

/**
 * Returns the appropriate Tabler icon component for a destination type
 * @param type - The destination type (e.g., 'city', 'airport', 'museum')
 * @returns React component for the icon
 */
export const getIconByType = (type: string): TablerIcon => {
  const iconMap: Record<string, TablerIcon> = {
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
    winery: IconGlassFullFilled,
    business: IconBriefcase,
    medical: IconBuildingHospital,
    district: IconBuildingEstate,
    golf: IconGolf,
    skiing: IconSkiJumping,
    civic: IconBuildingCommunity,
    // what are all these wtf
    anchor: IconAnchor,
    sign: IconDirectionsFilled,
    tree: IconTree,
    icecream: IconIceCream,
    sunglass: IconSunglasses,
  };
  return iconMap[type.toLowerCase()] || IconMapPin;
};
