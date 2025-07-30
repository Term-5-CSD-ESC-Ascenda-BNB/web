import {
  IconRulerMeasure,
  IconUsers,
  IconBed,
  IconWifi,
  IconEye,
  IconDeviceTv,
  IconBath,
  IconHelpCircle,
} from '@tabler/icons-react';
import React from 'react';

export function getRoomFeatureIcon(label: string | undefined): React.ReactElement {
  if (!label) return <IconHelpCircle size={14} />;

  const f = label.toLowerCase();

  if (f.includes('sq ft') || f.includes('sqm')) return <IconRulerMeasure size={14} />;
  if (f.includes('sleep') || f.includes('occupancy')) return <IconUsers size={14} />;
  if (f.includes('bed') || f.includes('king') || f.includes('twin') || f.includes('double'))
    return <IconBed size={14} />;
  if (f.includes('wifi') || f.includes('internet')) return <IconWifi size={14} />;
  if (f.includes('view') || f.includes('city') || f.includes('courtyard'))
    return <IconEye size={14} />;
  if (f.includes('tv') || f.includes('lcd') || f.includes('inch'))
    return <IconDeviceTv size={14} />;
  if (f.includes('bath') || f.includes('bathtub') || f.includes('shower'))
    return <IconBath size={14} />;

  return <IconHelpCircle size={14} />;
}
