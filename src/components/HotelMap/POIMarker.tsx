import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { getPOIIcon } from './mapHelpers';
import { getCategory } from '../../utils/getSurroundingCategory';

interface Surrounding {
  type: string;
  name: string;
  distance: string;
  latitude: number;
  longitude: number;
}

interface POIMarkerProps {
  poi: Surrounding;
  index: number;
}

export function POIMarker({ poi, index }: POIMarkerProps) {
  const category = getCategory(poi.type);

  return (
    <Marker
      key={`poi-${index}`}
      position={[poi.latitude, poi.longitude]}
      icon={divIcon({
        className: 'custom-icon',
        html: renderToStaticMarkup(getPOIIcon(category)),
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })}
    >
      <Popup>
        <strong>{poi.type}</strong>: {poi.name}
        <br />
        {poi.distance}
      </Popup>
    </Marker>
  );
}
