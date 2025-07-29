import { useState } from 'react';
import { Modal, Box, Group, Text, Stack, Tabs, ScrollArea } from '@mantine/core';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { getHotelIcon, getPOIIcon, categorizeType } from '@/utils/getSurroundingMapIcon';
import type { HotelResponse } from '@/schemas/hotelResult';

export interface Surrounding {
  type: string;
  name: string;
  distance: string;
  latitude: number;
  longitude: number;
}

interface Props {
  opened: boolean;
  onClose: () => void;
  hotel: HotelResponse;
  surroundings: Surrounding[];
}

type Category = 'Transport' | 'Dining' | 'Shopping' | 'Landmarks' | 'Others';

function groupIntoCategories(surroundings: Surrounding[]) {
  const grouped: Record<Category, Surrounding[]> = {
    Transport: [],
    Landmarks: [],
    Dining: [],
    Shopping: [],
    Others: [],
  };

  for (const item of surroundings) {
    const category = categorizeType(item.type);
    grouped[category].push(item);
  }

  return grouped;
}

export function SurroundingsMapModal({ opened, onClose, hotel, surroundings }: Props) {
  const grouped = groupIntoCategories(surroundings);
  const availableCategories = Object.keys(grouped).filter(
    (key) => grouped[key as Category].length > 0
  );
  const [activeTab, setActiveTab] = useState<string | null>(availableCategories[0] || 'Transport');
  const filteredSurroundings = grouped[activeTab as Category] || [];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="calc(100vw - 80px)"
      centered
      title="Hotel & Nearby Places"
      styles={{
        body: {
          padding: 0,
          height: 'calc(85vh - 80px)',
        },
      }}
    >
      <Group wrap="nowrap" align="stretch" style={{ height: 'calc(85vh - 80px)' }}>
        {/* Left Panel */}
        <Box style={{ width: 515, padding: 16, overflow: 'hidden' }}>
          <Tabs value={activeTab} onChange={setActiveTab} variant="outline" keepMounted={false}>
            <Tabs.List style={{ flexWrap: 'wrap', gap: 8 }}>
              {availableCategories.map((category) => (
                <Tabs.Tab value={category} key={category}>
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {availableCategories.map((category) => (
              <Tabs.Panel value={category} key={category}>
                <ScrollArea h="calc(85vh - 180px)">
                  <Stack gap="sm" mt="sm">
                    {grouped[category as Category].map((item, i) => (
                      <Group key={i} align="flex-start" gap={8}>
                        {getPOIIcon(category as Category)}
                        <Box>
                          <Text fw={500} fz="sm">
                            {item.name}
                          </Text>
                          <Text c="dimmed" fz="xs">
                            {item.type} – {item.distance}
                          </Text>
                        </Box>
                      </Group>
                    ))}
                  </Stack>
                </ScrollArea>
              </Tabs.Panel>
            ))}
          </Tabs>
        </Box>

        {/* Right Map Panel */}
        <Box style={{ flex: 1 }}>
          <MapContainer
            center={[hotel.latitude, hotel.longitude]}
            zoom={18}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
            attributionControl={false}
            zoomControl={false}
          >
            <ZoomControl position="topright" />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Hotel Marker */}
            <Marker position={[hotel.latitude, hotel.longitude]} icon={getHotelIcon()} />

            {/* POI Markers */}
            {filteredSurroundings.map((poi, idx) => {
              const category = categorizeType(poi.type);
              return (
                <Marker
                  key={`poi-${idx}`}
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
            })}
          </MapContainer>
        </Box>
      </Group>
    </Modal>
  );
}
