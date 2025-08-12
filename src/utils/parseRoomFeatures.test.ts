import { describe, it, expect } from 'vitest';
import { parseRoomFeatures } from './parseRoomFeatures';

describe('parseRoomFeatures', () => {
  describe('size extraction', () => {
    it('should extract room size from longDescription', () => {
      const description = 'This is a 400-sq-foot room with amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.size).toBe('400 sq ft');
    });

    it('should handle larger room sizes', () => {
      const description = 'Spacious 1200-sq-foot suite with panoramic views.';
      const result = parseRoomFeatures(description, []);
      expect(result.size).toBe('1200 sq ft');
    });

    it('should return "Unknown size" when no size is found', () => {
      const description = 'Beautiful room with great amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.size).toBe('Unknown size');
    });
  });

  describe('bed type extraction', () => {
    it('should extract bed type from strong tags', () => {
      const description = 'Room with <strong>1 King Bed</strong> and nice view.';
      const result = parseRoomFeatures(description, []);
      expect(result.bedType).toBe('1 King Bed');
    });

    it('should extract complex bed configurations', () => {
      const description = 'Suite with <strong>1 King Bed and Sofa Bed</strong> for extra comfort.';
      const result = parseRoomFeatures(description, []);
      expect(result.bedType).toBe('1 King Bed and Sofa Bed');
    });

    it('should handle twin bed configurations', () => {
      const description = 'Room featuring <strong>2 Twin Beds</strong> perfect for friends.';
      const result = parseRoomFeatures(description, []);
      expect(result.bedType).toBe('2 Twin Beds');
    });

    it('should return "Unknown bed type" when no strong tag is found', () => {
      const description = 'Beautiful room with great amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.bedType).toBe('Unknown bed type');
    });
  });

  describe('view extraction', () => {
    it('should extract view from room description', () => {
      const description = 'Beautiful room with ocean views</p>';
      const result = parseRoomFeatures(description, []);
      expect(result.view).toBe('ocean views');
    });

    it('should extract complex view descriptions', () => {
      const description = 'Luxury room with panoramic city and mountain views</p>';
      const result = parseRoomFeatures(description, []);
      expect(result.view).toBe('panoramic city and mountain views');
    });

    it('should return "Unknown view" when no view pattern is found', () => {
      const description = 'Beautiful room with great amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.view).toBe('Unknown view');
    });
  });

  describe('occupancy inference', () => {
    it('should infer occupancy for 2 twin beds', () => {
      const description = 'Room with <strong>2 twin beds</strong> and amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.occupancy).toBe('Sleeps 2');
    });

    it('should infer occupancy for 2 double beds', () => {
      const description = 'Room with <strong>2 double beds</strong> and amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.occupancy).toBe('Sleeps 2');
    });

    it('should infer occupancy for 1 king bed with sofa', () => {
      const description = 'Suite with <strong>1 king bed and sofa</strong> arrangement.';
      const result = parseRoomFeatures(description, []);
      expect(result.occupancy).toBe('Sleeps 3–4');
    });

    it('should infer occupancy for 1 king bed', () => {
      const description = 'Room with <strong>1 king bed</strong> for comfort.';
      const result = parseRoomFeatures(description, []);
      expect(result.occupancy).toBe('Sleeps 2');
    });

    it('should infer occupancy for 1 double bed', () => {
      const description = 'Cozy room with <strong>1 double bed</strong> setup.';
      const result = parseRoomFeatures(description, []);
      expect(result.occupancy).toBe('Sleeps 2');
    });

    it('should default to "Sleeps 2" for unknown bed types', () => {
      const description = 'Room with <strong>unknown bed configuration</strong>.';
      const result = parseRoomFeatures(description, []);
      expect(result.occupancy).toBe('Sleeps 2');
    });
  });

  describe('TV size extraction', () => {
    it('should extract TV size from description', () => {
      const description = 'Room features a 55-inch LCD TV for entertainment.';
      const result = parseRoomFeatures(description, []);
      expect(result.tv).toBe('55-inch TV');
    });

    it('should extract larger TV sizes', () => {
      const description = 'Suite with 75-inch LCD TV and premium channels.';
      const result = parseRoomFeatures(description, []);
      expect(result.tv).toBe('75-inch TV');
    });

    it('should handle smaller TV sizes', () => {
      const description = 'Compact room with 32-inch LCD TV.';
      const result = parseRoomFeatures(description, []);
      expect(result.tv).toBe('32-inch TV');
    });

    it('should return undefined when no TV is mentioned', () => {
      const description = 'Beautiful room with great amenities.';
      const result = parseRoomFeatures(description, []);
      expect(result.tv).toBeUndefined();
    });

    it('should not match single digit TV sizes', () => {
      const description = 'Room with 5-inch LCD TV (should not match).';
      const result = parseRoomFeatures(description, []);
      expect(result.tv).toBeUndefined();
    });
  });

  describe('bath amenity detection', () => {
    it('should detect bathtub in amenities', () => {
      const amenities = ['Free WiFi', 'Bathtub', 'Air conditioning'];
      const result = parseRoomFeatures('Test description', amenities);
      expect(result.bath).toBe('Private bath');
    });

    it('should detect shower in amenities', () => {
      const amenities = ['Free WiFi', 'Shower', 'Minibar'];
      const result = parseRoomFeatures('Test description', amenities);
      expect(result.bath).toBe('Private bath');
    });

    it('should detect bath amenities case-insensitively', () => {
      const amenities = ['Free WiFi', 'BATHTUB', 'Air conditioning'];
      const result = parseRoomFeatures('Test description', amenities);
      expect(result.bath).toBe('Private bath');
    });

    it('should detect shower case-insensitively', () => {
      const amenities = ['Free WiFi', 'SHOWER', 'Minibar'];
      const result = parseRoomFeatures('Test description', amenities);
      expect(result.bath).toBe('Private bath');
    });

    it('should detect partial matches in amenity names', () => {
      const amenities = ['Free WiFi', 'Walk-in shower', 'Minibar'];
      const result = parseRoomFeatures('Test description', amenities);
      expect(result.bath).toBe('Private bath');
    });

    it('should return undefined when no bath amenities are found', () => {
      const amenities = ['Free WiFi', 'Air conditioning', 'Minibar'];
      const result = parseRoomFeatures('Test description', amenities);
      expect(result.bath).toBeUndefined();
    });
  });

  describe('complete integration tests', () => {
    it('should parse a complete room description correctly', () => {
      const description = `
        This luxurious 500-sq-foot room with ocean and city views</p>
        features <strong>1 King Bed and Sofa Bed</strong> and includes
        a 65-inch LCD TV for entertainment.
      `;
      const amenities = ['Free WiFi', 'Private bathroom with bathtub', 'Air conditioning'];

      const result = parseRoomFeatures(description, amenities);

      expect(result.size).toBe('500 sq ft');
      expect(result.bedType).toBe('1 King Bed and Sofa Bed');
      expect(result.view).toBe('ocean and city views');
      expect(result.occupancy).toBe('Sleeps 3–4');
      expect(result.tv).toBe('65-inch TV');
      expect(result.bath).toBe('Private bath');
    });

    it('should handle minimal room information', () => {
      const description = 'Basic room available.';
      const amenities = ['Free WiFi'];

      const result = parseRoomFeatures(description, amenities);

      expect(result.size).toBe('Unknown size');
      expect(result.bedType).toBe('Unknown bed type');
      expect(result.view).toBe('Unknown view');
      expect(result.occupancy).toBe('Sleeps 2');
      expect(result.tv).toBeUndefined();
      expect(result.bath).toBeUndefined();
    });

    it('should handle room with twin beds and shower', () => {
      const description = `
        Comfortable 350-sq-foot room with garden views</p>
        featuring <strong>2 Twin Beds</strong> and a 42-inch LCD TV.
      `;
      const amenities = ['Free WiFi', 'Shower only', 'Mini refrigerator'];

      const result = parseRoomFeatures(description, amenities);

      expect(result.size).toBe('350 sq ft');
      expect(result.bedType).toBe('2 Twin Beds');
      expect(result.view).toBe('garden views');
      expect(result.occupancy).toBe('Sleeps 2');
      expect(result.tv).toBe('42-inch TV');
      expect(result.bath).toBe('Private bath');
    });
  });
});
