import { describe, it, expect } from 'vitest';
import { stringifyGuestsRooms } from './stringifyGuestsRooms';

describe('stringifyGuestsRooms', () => {
  // Error if any parameter ≤ 0
  it('throws if guests ≤ 0', () => {
    expect(() => stringifyGuestsRooms(0, 2)).toThrow('Guests and rooms must be greater than 0');
    expect(() => stringifyGuestsRooms(-1, 1)).toThrow('Guests and rooms must be greater than 0');
  });

  it('throws if rooms ≤ 0', () => {
    expect(() => stringifyGuestsRooms(2, 0)).toThrow('Guests and rooms must be greater than 0');
  });

  // Error if guests < rooms
  it('throws if guests < rooms', () => {
    expect(() => stringifyGuestsRooms(2, 3)).toThrow('Guests cannot be fewer than rooms');
  });

  // Equal division
  it('evenly distributes when guests is multiple of rooms', () => {
    // 4 guests, 2 rooms → [2,2]
    expect(stringifyGuestsRooms(4, 2)).toBe('2|2');
  });

  // Uneven division
  it('distributes remainders correctly when not divisible', () => {
    // 5 guests, 2 rooms → [3,2]
    expect(stringifyGuestsRooms(5, 2)).toBe('3|2');
    // 7 guests, 3 rooms → [3,2,2]
    expect(stringifyGuestsRooms(7, 3)).toBe('3|2|2');
  });

  // Single room edge case
  it('returns single number for one room', () => {
    expect(stringifyGuestsRooms(6, 1)).toBe('6');
  });

  // Single guest & room
  it('works when guests and rooms both equal 1', () => {
    expect(stringifyGuestsRooms(1, 1)).toBe('1');
  });
});
