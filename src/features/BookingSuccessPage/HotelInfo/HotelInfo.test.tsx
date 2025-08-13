import { render, screen } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import HotelInfo from './HotelInfo';

describe('HotelInfo Component', () => {
  it('renders hotel name, image, and address', () => {
    render(
      <HotelInfo hotelName="Grand Palace" hotelImage="/hotel.png" address="123 Palace Road" />
    );

    expect(screen.getByText('Grand Palace')).toBeInTheDocument();
    expect(screen.getByText('123 Palace Road')).toBeInTheDocument();
    const img: HTMLImageElement = screen.getByRole('img');
    expect(img.src).toContain('/hotel.png');
  });
});
