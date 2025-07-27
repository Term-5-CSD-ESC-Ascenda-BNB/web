export interface RoomOption {
  title: string;
  refundable: boolean;
  refundableUntil?: string;
  reschedulable: boolean;
  breakfast?: string;
  prepay: boolean;
  price: number;
  totalPrice: number;
  promo?: string;
  availability?: string;
}

export interface Room {
  name: string;
  description: string;
  longDescription: string;
  options: RoomOption[];
  images: string[];
  checkinPolicy?: string;
  displayPolicy?: string;
  amenities: string[];
}
