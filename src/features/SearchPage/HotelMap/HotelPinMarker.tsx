import { Marker } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { IconBed } from '@tabler/icons-react';
import ReactDOMServer from 'react-dom/server';

export function HotelPinMarker({ position }: { position: [number, number] }) {
  const icon = divIcon({
    className: '',
    html: ReactDOMServer.renderToString(
      <div
        style={{
          backgroundColor: '#6741d9',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconBed size={18} color="white" />
      </div>
    ),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return <Marker position={position} icon={icon} />;
}
