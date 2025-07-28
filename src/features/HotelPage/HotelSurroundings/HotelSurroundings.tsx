import { useState, useRef, useEffect } from 'react';
import { Box, Button, Group, Stack, Text, Tooltip, Divider } from '@mantine/core';
import { SurroundingsList } from '@/components/SurroundingsList/SurroundingsList';
import { SurroundingsMapModal } from '@/components/SurroundingsMapModal/SurroundingsMapModal';
import { HotelMap } from '@/features/SearchPage/HotelMap/HotelMap';
import type { Hotel, Surrounding } from '@/types/Hotel';

interface HotelSurroundingsProps {
  hotel: Hotel;
  surroundings: Surrounding[];
  dimmed?: boolean;
}

export function HotelSurroundings({ hotel, surroundings, dimmed }: HotelSurroundingsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState<number>(220);

  useEffect(() => {
    if (!listRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const buttonHeight = listRef.current?.querySelector('button')?.offsetHeight || 0;
      const fullHeight = entry.contentRect.height;
      setMapHeight(Math.round(fullHeight - buttonHeight - 8)); // subtract small gap
    });

    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box style={{ flex: 1, minWidth: 300 }}>
      <Text fw={600} fz="lg" mb="xs">
        Surroundings
      </Text>

      <Divider mb="sm" />

      <Group align="flex-start" gap="lg" wrap="nowrap">
        <Stack gap="sm" ref={listRef} style={{ flex: 1, minWidth: 0 }}>
          <SurroundingsList surroundings={surroundings.slice(0, 5)} />
          <Button
            radius="xl"
            size="sm"
            style={{ backgroundColor: '#514D8A', alignSelf: 'start' }}
            onClick={() => setModalOpen(true)}
          >
            View all on map
          </Button>
        </Stack>

        {!modalOpen && (
          <Tooltip label="Click to expand full map" position="bottom" withArrow>
            <Box
              style={{
                cursor: dimmed ? 'default' : 'pointer',
                pointerEvents: dimmed ? 'none' : 'auto',
                opacity: dimmed ? 0.3 : 1,
                width: '100%',
                maxWidth: 320,
                minWidth: 200,
                height: `${mapHeight}px`,
                borderRadius: '12px',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'opacity 0.3s ease',
              }}
              onClick={() => !dimmed && setModalOpen(true)}
            >
              <HotelMap
                hotels={[hotel]}
                surroundings={surroundings.slice(0, 5)}
                center={[hotel.latitude, hotel.longitude]}
                zoom={17}
                interactive={false}
              />
            </Box>
          </Tooltip>
        )}
      </Group>

      <SurroundingsMapModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        hotel={hotel}
        surroundings={surroundings}
      />
    </Box>
  );
}
