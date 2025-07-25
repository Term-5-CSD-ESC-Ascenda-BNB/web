import { useState } from 'react';
import { Modal, Box, Group, Text, Stack, Tabs, ScrollArea } from '@mantine/core';
import { HotelMap } from '@/components/HotelMap/HotelMap';
import { getSurroundingIcon } from '@/utils/getSurroundingIcon';
import type { Hotel } from '@/types/Hotel';

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
  hotel: Hotel;
  surroundings: Surrounding[];
}

// Categorization helper
function categorizeType(type: string): string {
  const t = type.toLowerCase();

  if (
    ['bus_stop', 'subway', 'train', 'platform', 'station', 'taxi', 'public_transport'].some((s) =>
      t.includes(s)
    )
  )
    return 'Transport';

  if (
    ['restaurant', 'cafe', 'fast_food', 'food_court', 'bakery', 'ice_cream'].some((s) =>
      t.includes(s)
    )
  )
    return 'Dining';

  if (
    ['supermarket', 'mall', 'store', 'convenience', 'toys', 'electronics', 'retail', 'shop'].some(
      (s) => t.includes(s)
    )
  )
    return 'Shopping';

  if (
    [
      'hotel',
      'guest_house',
      'museum',
      'school',
      'park',
      'monument',
      'temple',
      'church',
      'police',
    ].some((s) => t.includes(s))
  )
    return 'Landmarks';

  return 'Others';
}

// Group surroundings into tabs
function groupIntoCategories(surroundings: Surrounding[]) {
  const grouped: Record<string, Surrounding[]> = {
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
  const availableCategories = Object.keys(grouped).filter((key) => grouped[key].length > 0);
  const [activeTab, setActiveTab] = useState<string | null>(availableCategories[0] || 'Transport');
  const filteredSurroundings = grouped[activeTab ?? 'Transport'] || [];

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
          height: 'calc(100vh - 80px)',
        },
      }}
    >
      <Group wrap="nowrap" align="stretch" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Left panel with tabs and listings */}
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
                <ScrollArea h="calc(100vh - 180px)">
                  <Stack gap="sm" mt="sm">
                    {grouped[category].map((item, i) => (
                      <Group key={i} align="flex-start" gap={8}>
                        {getSurroundingIcon(item.type)}
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

        {/* Right panel with filtered map */}
        <Box style={{ flex: 1 }}>
          <HotelMap
            hotels={[hotel]}
            surroundings={filteredSurroundings}
            center={[hotel.latitude, hotel.longitude]}
            zoom={18}
          />
        </Box>
      </Group>
    </Modal>
  );
}
