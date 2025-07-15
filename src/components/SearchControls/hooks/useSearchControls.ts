import { useState } from 'react';

export interface SearchControlsState {
  date: [string | null, string | null];
  guests: number;
  rooms: number;
}

export interface SearchControlsActions {
  setDate: (date: [string | null, string | null]) => void;
  setGuests: (guests: number) => void;
  setRooms: (rooms: number) => void;
  handleGuestsChange: (delta: number) => void;
  handleRoomsChange: (delta: number) => void;
}

export function useSearchControls(initialState?: Partial<SearchControlsState>) {
  const [date, setDate] = useState<[string | null, string | null]>(
    initialState?.date || [null, null]
  );
  const [guests, setGuests] = useState(initialState?.guests || 2);
  const [rooms, setRooms] = useState(initialState?.rooms || 1);

  const handleGuestsChange = (delta: number) => {
    setGuests((prev) => Math.max(1, prev + delta));
  };

  const handleRoomsChange = (delta: number) => {
    setRooms((prev) => Math.max(1, prev + delta));
  };

  return {
    // State
    date,
    guests,
    rooms,
    // Actions
    setDate,
    setGuests,
    setRooms,
    handleGuestsChange,
    handleRoomsChange,
  };
}
