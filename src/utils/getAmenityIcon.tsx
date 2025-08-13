import {
  IconWind,
  IconBriefcase,
  IconIroning3,
  IconPlugConnected,
  IconShirt,
  IconScissors,
  IconBath,
  IconUsersGroup,
  IconSwimming,
  IconParking,
  IconBell,
  IconScale,
  IconDeviceTv,
  IconPhone,
  IconWriting,
  IconCoffee,
  IconBed,
  IconBabyCarriage,
  IconShoe,
  IconHelpCircle,
  IconBread,
  IconToolsKitchen2,
  IconHanger2,
} from '@tabler/icons-react';
import React from 'react';

export function getAmenityIcon(label: string): React.ReactElement {
  // Normalize: lowercase, trim, collapse whitespace, fix common format issues
  const f = label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/t\s*v/, 'tv') // normalize "T V" to "tv"
    .replace(/voice ?mail/, 'voicemail'); // normalize variations of "voice mail"

  if (f.includes('hair')) return <IconScissors size={16} />;
  if (f.includes('air')) return <IconWind size={16} />;
  if (f.includes('business')) return <IconBriefcase size={16} />;
  if (f.includes('iron')) return <IconIroning3 size={16} />;
  if (f.includes('data') || f.includes('port')) return <IconPlugConnected size={16} />;
  if (f.includes('dry')) return <IconShirt size={16} />;
  if (f.includes('meeting')) return <IconUsersGroup size={16} />;
  if (f.includes('pool')) return <IconSwimming size={16} />;
  if (f.includes('garage') || f.includes('parking')) return <IconParking size={16} />;
  if (f.includes('room service')) return <IconBell size={16} />;
  if (f.includes('safe')) return <IconScale size={16} />;
  if (f.includes('tv')) return <IconDeviceTv size={16} />;
  if (f.includes('phone') || f.includes('voicemail')) return <IconPhone size={16} />;
  if (f.includes('desk') || f.includes('work') || f.includes('workspace'))
    return <IconWriting size={16} />;
  if (f.includes('coffee') || f.includes('tea') || f.includes('minibar') || f.includes('kettle'))
    return <IconCoffee size={16} />;
  if (f.includes('breakfast')) return <IconBread size={16} />;
  if (f.includes('kitchen')) return <IconToolsKitchen2 size={16} />;
  if (f.includes('crib') || f.includes('infant')) return <IconBabyCarriage size={16} />;
  if (f.includes('bed') || f.includes('bedding') || f.includes('linen'))
    return <IconBed size={16} />;
  if (f.includes('towel')) return <IconHanger2 size={16} />;
  if (f.includes('bath') || f.includes('soak')) return <IconBath size={16} />;
  if (f.includes('shower')) return <IconShoe size={16} />;

  return <IconHelpCircle size={16} />;
}
