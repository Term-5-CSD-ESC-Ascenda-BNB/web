import { render, screen, fireEvent } from '@/tests/utils';
import { describe, it, expect, vi } from 'vitest';
import { HotelGrid } from './HotelGrid';
import type { HotelResult } from '@/schemas/hotelResults';

vi.mock('@/components/CarouselCard', () => ({
  CarouselCard: ({
    _id,
    name,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: {
    _id: string;
    name: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
  }) => (
    <div
      data-testid="card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {name}
    </div>
  ),
  CarouselCardSkeleton: () => <div data-testid="skeleton" />,
}));

describe('HotelGrid', () => {
  it('renders six skeletons when loading', () => {
    render(<HotelGrid hotels={[]} isLoading={true} onHotelClick={() => {}} />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('renders a card for each hotel and handles mouse and click events', () => {
    const hotels: HotelResult[] = [
      {
        id: 'hotel1',
        name: 'Hotel One',
        address: 'Addr1',
        rating: 4,
        searchRank: 1,
        latitude: 1.3521,
        longitude: 103.8198,
        image_details: {
          suffix: '.jpg',
          count: 5,
          prefix: 'hotel1_',
        },
        price: 100,
        score: 8.5,
      },
      {
        id: 'hotel2',
        name: 'Hotel Two',
        address: 'Addr2',
        rating: 5,
        searchRank: 2,
        latitude: 1.3522,
        longitude: 103.8199,
        image_details: {
          suffix: '.jpg',
          count: 3,
          prefix: 'hotel2_',
        },
        price: 200,
        score: 9.0,
      },
    ];
    const handleEnter = vi.fn();
    const handleLeave = vi.fn();
    const handleClick = vi.fn();

    render(
      <HotelGrid
        hotels={hotels}
        isLoading={false}
        onHotelMouseEnter={handleEnter}
        onHotelMouseLeave={handleLeave}
        onHotelClick={handleClick}
      />
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Hotel One');
    expect(cards[1]).toHaveTextContent('Hotel Two');

    // Hover and leave
    fireEvent.mouseEnter(cards[0]);
    expect(handleEnter).toHaveBeenCalledWith('hotel1');
    fireEvent.mouseLeave(cards[1]);
    expect(handleLeave).toHaveBeenCalledWith('hotel2');

    // Click
    fireEvent.click(cards[1]);
    expect(handleClick).toHaveBeenCalledWith('hotel2');
  });
});
