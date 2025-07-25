export interface RoomOption {
  breakfast?: string;
  refundable: boolean;
  reschedulable: boolean;
  prepay: boolean;
  price: number;
  totalPrice: number;
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
