import { Stack } from '@mantine/core';
import { CarouselCardDetails, ImageCarousel } from '@/components/CarouselCard';
import { Popup } from 'react-leaflet';
import popupStyles from './Popup.module.css';
import { getFirstFiveImages } from '@/utils/getFirstFiveImages';
import type { Hotel } from '@/types/Hotel';

interface HotelPopupProps {
  hotel: Hotel;
  onClick?: (hotelId: string) => void;
}

export function HotelPopup({ hotel, onClick }: HotelPopupProps) {
  onClick = onClick ?? (() => {});

  return (
    <Popup className={popupStyles.popup} minWidth={300} maxWidth={300}>
      <Stack gap={0} w={300}>
        <div
          style={{
            borderRadius: 'var(--mantine-radius-lg) var(--mantine-radius-lg) 0 0',
            overflow: 'hidden',
          }}
        >
          <ImageCarousel
            images={getFirstFiveImages(hotel.image_details)}
            aspectRatio={4 / 3}
            onImageClick={() => {
              onClick(hotel.id);
            }}
          />
        </div>
        <div style={{ cursor: 'pointer', margin: '0.6rem 1rem' }}>
          <CarouselCardDetails
            name={hotel.name}
            address={hotel.address ?? ''}
            rating={hotel.rating}
            price={hotel.price}
            score={hotel.score}
            onClick={() => {
              onClick(hotel.id);
            }}
          />
        </div>
      </Stack>
    </Popup>
  );
}
