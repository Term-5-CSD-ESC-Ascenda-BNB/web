import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { SearchParamsSchema } from './searchParams';

describe('SearchParamsSchema', () => {
  // Freeze time so defaultDate() is predictable
  beforeAll(() => {
    vi.useFakeTimers();
    // 2025-08-06 12:00:00 UTC → defaultDate → ['2025-08-09','2025-08-10']
    vi.setSystemTime(Date.UTC(2025, 7, 6, 12, 0, 0));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('applies defaults when no input is provided', () => {
    const parsed = SearchParamsSchema.parse({});
    expect(parsed.uid).toBe('RsBU');
    expect(parsed.term).toBe('Singapore, Singapore');
    expect(parsed.guests).toBe(1);
    expect(parsed.rooms).toBe(1);
    expect(parsed.page).toBe(1);
    // 3 and 4 days ahead of 2025-08-06
    expect(parsed.date).toEqual(['2025-08-09', '2025-08-10']);
  });

  it('uses provided valid values', () => {
    const input = {
      uid: 'user123',
      term: 'Paris, France',
      date: ['2025-12-01', '2025-12-05'],
      guests: '4',
      rooms: '2',
      page: '3',
    };
    const parsed = SearchParamsSchema.parse(input);
    expect(parsed.uid).toBe('user123');
    expect(parsed.term).toBe('Paris, France');
    expect(parsed.date).toEqual(['2025-12-01', '2025-12-05']);
    expect(parsed.guests).toBe(4);
    expect(parsed.rooms).toBe(2);
    expect(parsed.page).toBe(3);
  });

  it('falls back to defaults on invalid date shape', () => {
    const parsed = SearchParamsSchema.parse({ date: 'not-a-tuple' });
    expect(parsed.date).toEqual(['2025-08-09', '2025-08-10']);
  });

  it('coerces numeric strings and yields NaN for unparsable values', () => {
    // Parsable numeric strings
    const parsedGood = SearchParamsSchema.parse({
      guests: '5',
      rooms: '2',
      page: '7',
    });
    expect(parsedGood.guests).toBe(5);
    expect(parsedGood.rooms).toBe(2);
    expect(parsedGood.page).toBe(7);

    // catch errorneous strings
    const parsedBad = SearchParamsSchema.parse({
      guests: 'abc',
      rooms: 'xyz',
      page: '',
    });
    expect(parsedBad.guests).equal(1);
    expect(parsedBad.rooms).equal(1);
    expect(parsedBad.page).equal(1);
  });
});
