import {
  IconMapPin,
  IconBed,
  IconWifi,
  IconCoffee,
  IconToolsKitchen2,
  IconArmchair,
  IconHeartHandshake,
  IconMoodSmile,
  IconHelpCircle,
  IconUser,
  IconUsersGroup,
  IconBriefcase,
  IconHeart,
} from '@tabler/icons-react';
import React from 'react';

export function getReviewIcon(label: string | undefined): React.ReactElement {
  if (!label) return <IconHelpCircle size={16} />;

  const l = label.toLowerCase();

  // Category scores
  if (l.includes('location')) return <IconMapPin size={16} />;
  if (l.includes('room')) return <IconBed size={16} />;
  if (l.includes('wifi') || l.includes('internet')) return <IconWifi size={16} />;
  if (l.includes('breakfast')) return <IconCoffee size={16} />;
  if (l.includes('food') || l.includes('dining')) return <IconToolsKitchen2 size={16} />;
  if (l.includes('comfort')) return <IconArmchair size={16} />;
  if (l.includes('service')) return <IconHeartHandshake size={16} />;
  if (l.includes('vibe')) return <IconMoodSmile size={16} />;

  // Traveler types
  if (l.includes('solo')) return <IconUser size={16} />;
  if (l.includes('couple')) return <IconHeart size={16} />;
  if (l.includes('family')) return <IconUsersGroup size={16} />;
  if (l.includes('business')) return <IconBriefcase size={16} />;

  return <IconHelpCircle size={16} />;
}
