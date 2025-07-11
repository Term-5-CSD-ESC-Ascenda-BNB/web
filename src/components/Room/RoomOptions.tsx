import { RoomOptionCard } from './RoomOptionCard';

interface RoomOption {
  breakfast?: string;
  refundable: boolean;
  reschedulable: boolean;
  prepay: boolean;
  price: number;
  totalPrice: number;
}

interface RoomOptionsProps {
  options: RoomOption[];
}

export function RoomOptions({ options }: RoomOptionsProps) {
  return (
    <>
      {options.map((opt, i) => (
        <RoomOptionCard key={i} option={opt} />
      ))}
    </>
  );
}
