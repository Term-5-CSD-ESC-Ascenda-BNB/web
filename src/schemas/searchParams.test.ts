import { describe, it, expect } from 'vitest';
import { SearchParamsSchema, SORT_BY_FIELDS } from './searchParams';
import fc from 'fast-check';

describe('SearchParamsSchema', () => {
  describe('SearchParamsSchema - Robustness', () => {
    it('never crashes on garbage input (FUZZ TEST)', () => {
      const garbageInputs = fc.record({
        uid: fc.anything(),
        term: fc.anything(),
        date: fc.anything(),
        guests: fc.anything(),
        rooms: fc.anything(),
        page: fc.anything(),
        sortBy: fc.anything(),
        sortOrder: fc.anything(),
        minPrice: fc.anything(),
        maxPrice: fc.anything(),
        minRating: fc.anything(),
        minScore: fc.anything(),
      });

      fc.assert(
        fc.property(garbageInputs, (raw) => {
          const parsed = SearchParamsSchema.parse(raw);

          // If it succeeds, the output should always be valid
          expect(parsed.guests).toBeGreaterThanOrEqual(1);
          expect(parsed.guests).toBeLessThanOrEqual(10);
          expect(parsed.rooms).toBeGreaterThanOrEqual(1);
          expect(parsed.rooms).toBeLessThanOrEqual(10);
          expect(parsed.page).toBeGreaterThanOrEqual(1);
          expect(SORT_BY_FIELDS.includes(parsed.sortBy)).toBe(true);
          expect(['asc', 'desc']).toContain(parsed.sortOrder);

          // Validate date constraints
          const [checkin, checkout] = parsed.date;
          if (checkin !== null && checkout !== null) {
            expect(checkin < checkout).toBe(true);
          }
        }),
        { numRuns: 500, verbose: 1 }
      );
    });
  });

  it('applies defaults when no input is provided', () => {
    const parsed = SearchParamsSchema.parse({});
    expect(parsed.uid).toBe('RsBU');
    expect(parsed.term).toBe('Singapore, Singapore');
    expect(parsed.guests).toBe(1);
    expect(parsed.rooms).toBe(1);
    expect(parsed.page).toBe(1);

    // Check that date is 3 and 4 days from today
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 3);
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 4);

    const expectedCheckIn = checkIn.toISOString().split('T')[0];
    const expectedCheckOut = checkOut.toISOString().split('T')[0];

    expect(parsed.date).toEqual([expectedCheckIn, expectedCheckOut]);
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

    // Should fall back to default dates (3 and 4 days from today)
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 3);
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + 4);

    const expectedCheckIn = checkIn.toISOString().split('T')[0];
    const expectedCheckOut = checkOut.toISOString().split('T')[0];

    expect(parsed.date).toEqual([expectedCheckIn, expectedCheckOut]);
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
