export function stringifyGuestsRooms(guests: number, rooms: number): string {
  if (guests <= 0 || rooms <= 0) {
    throw new Error('Guests and rooms must be greater than 0');
  }

  if (guests < rooms) {
    throw new Error('Guests cannot be fewer than rooms');
  }

  // Create a new empty array with length = rooms
  const guestsArray = Array(rooms);

  // Distribute guests across rooms
  for (let i = 0; i < guests; i++) {
    const roomIndex = i % rooms;
    if (!guestsArray[roomIndex]) {
      guestsArray[roomIndex] = 1; // init with 1 guest
    } else {
      guestsArray[roomIndex] += 1; // increment
    }
  }

  const result = guestsArray.join('|');

  return result;
}
