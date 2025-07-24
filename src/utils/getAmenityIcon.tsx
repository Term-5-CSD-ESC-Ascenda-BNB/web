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
  IconTrowel,
  IconShoe,
  IconHelpCircle,
} from '@tabler/icons-react';

export function getAmenityIcon(label: string): React.ReactElement {
  const f = label.toLowerCase();

  if (f.includes('air')) return <IconWind size={16} />;
  if (f.includes('business')) return <IconBriefcase size={16} />;
  if (f.includes('iron')) return <IconIroning3 size={16} />;
  if (f.includes('data') || f.includes('port')) return <IconPlugConnected size={16} />;
  if (f.includes('dry')) return <IconShirt size={16} />;
  if (f.includes('hair')) return <IconScissors size={16} />;
  if (f.includes('meeting')) return <IconUsersGroup size={16} />;
  if (f.includes('pool')) return <IconSwimming size={16} />;
  if (f.includes('garage') || f.includes('parking')) return <IconParking size={16} />;
  if (f.includes('room service')) return <IconBell size={16} />;
  if (f.includes('safe')) return <IconScale size={16} />;
  if (f.includes('tv')) return <IconDeviceTv size={16} />;
  if (f.includes('phone')) return <IconPhone size={16} />;
  if (f.includes('desk') || f.includes('workspace')) return <IconWriting size={16} />;
  if (f.includes('coffee') || f.includes('tea') || f.includes('minibar') || f.includes('kettle'))
    return <IconCoffee size={16} />;
  if (f.includes('bed') || f.includes('bedding') || f.includes('linen'))
    return <IconBed size={16} />;
  if (f.includes('towel')) return <IconTrowel size={16} />;
  if (f.includes('crib') || f.includes('infant')) return <IconBabyCarriage size={16} />;
  if (f.includes('bath') || f.includes('soak')) return <IconBath size={16} />;
  if (f.includes('shower')) return <IconShoe size={16} />;

  return <IconHelpCircle size={16} />;
}
