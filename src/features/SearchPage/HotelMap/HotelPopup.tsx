import { Stack } from '@mantine/core';
import { CarouselCardDetails, ImageCarousel } from '@/components/CarouselCard';
import { Popup } from 'react-leaflet';
import popupStyles from './Popup.module.css';
import type { HotelResult } from '@/schemas/hotelResults';
import { useFirstFiveImages } from '@/components/CarouselCard/hooks/useFirstFiveImages';

interface HotelPopupProps {
  hotel: HotelResult;
  onClick?: (hotelId: string) => void;
}

export function HotelPopup({ hotel, onClick }: HotelPopupProps) {
  onClick = onClick ?? (() => {});

  const { images } = useFirstFiveImages(hotel.image_details);
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
            images={images}
            aspectRatio={4 / 3}
            onImageClick={() => {
              onClick(hotel.id);
            }}
          />
        </div>
        <div style={{ cursor: 'pointer', margin: '0.6rem 1rem' }}>
          <CarouselCardDetails
            name={hotel.name}
            address={hotel.address}
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
