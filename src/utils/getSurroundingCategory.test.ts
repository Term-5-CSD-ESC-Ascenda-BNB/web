import { describe, it, expect } from 'vitest';
import { getCategory, getCategoryColor } from './getSurroundingCategory';

describe('getCategory', () => {
  describe('Transport category', () => {
    it('should return Transport for bus-related types', () => {
      expect(getCategory('bus')).toBe('Transport');
      expect(getCategory('bus_stop')).toBe('Transport');
      expect(getCategory('Bus Station')).toBe('Transport');
    });

    it('should return Transport for subway-related types', () => {
      expect(getCategory('subway')).toBe('Transport');
      expect(getCategory('subway_entrance')).toBe('Transport');
    });

    it('should return Transport for train-related types', () => {
      expect(getCategory('train')).toBe('Transport');
      expect(getCategory('train_station')).toBe('Transport');
    });

    it('should return Transport for other transport types', () => {
      expect(getCategory('taxi')).toBe('Transport');
      expect(getCategory('public_transport')).toBe('Transport');
      expect(getCategory('platform')).toBe('Transport');
      expect(getCategory('station')).toBe('Transport');
    });
  });

  describe('Dining category', () => {
    it('should return Dining for restaurant-related types', () => {
      expect(getCategory('restaurant')).toBe('Dining');
      expect(getCategory('fine_restaurant')).toBe('Dining');
    });

    it('should return Dining for cafe-related types', () => {
      expect(getCategory('cafe')).toBe('Dining');
      expect(getCategory('internet_cafe')).toBe('Dining');
    });

    it('should return Dining for food-related types', () => {
      expect(getCategory('fast_food')).toBe('Dining');
      expect(getCategory('food_court')).toBe('Dining');
      expect(getCategory('bakery')).toBe('Dining');
      expect(getCategory('ice_cream')).toBe('Dining');
    });
  });

  describe('Shopping category', () => {
    it('should return Shopping for market-related types', () => {
      expect(getCategory('supermarket')).toBe('Shopping');
      expect(getCategory('mall')).toBe('Shopping');
    });

    it('should return Shopping for store-related types', () => {
      expect(getCategory('store')).toBe('Shopping');
      expect(getCategory('convenience')).toBe('Shopping');
      expect(getCategory('retail')).toBe('Shopping');
      expect(getCategory('shop')).toBe('Shopping');
    });

    it('should return Shopping for specific product stores', () => {
      expect(getCategory('toys')).toBe('Shopping');
      expect(getCategory('electronics')).toBe('Shopping');
    });
  });

  describe('Landmarks category', () => {
    it('should return Landmarks for accommodation types', () => {
      expect(getCategory('hotel')).toBe('Landmarks');
      expect(getCategory('guest_house')).toBe('Landmarks');
    });

    it('should return Landmarks for cultural places', () => {
      expect(getCategory('museum')).toBe('Landmarks');
      expect(getCategory('monument')).toBe('Landmarks');
      expect(getCategory('temple')).toBe('Landmarks');
      expect(getCategory('church')).toBe('Landmarks');
    });

    it('should return Landmarks for public places', () => {
      expect(getCategory('school')).toBe('Landmarks');
      expect(getCategory('park')).toBe('Landmarks');
      expect(getCategory('police')).toBe('Landmarks');
    });
  });

  describe('Others category', () => {
    it('should return Others for unmatched types', () => {
      expect(getCategory('unknown')).toBe('Others');
      expect(getCategory('random_type')).toBe('Others');
      expect(getCategory('office')).toBe('Others');
      expect(getCategory('hospital')).toBe('Others');
    });

    it('should return Others for empty string', () => {
      expect(getCategory('')).toBe('Others');
    });
  });

  describe('Case insensitivity', () => {
    it('should handle uppercase input', () => {
      expect(getCategory('RESTAURANT')).toBe('Dining');
      expect(getCategory('BUS')).toBe('Transport');
      expect(getCategory('MALL')).toBe('Shopping');
      expect(getCategory('HOTEL')).toBe('Landmarks');
    });

    it('should handle mixed case input', () => {
      expect(getCategory('Restaurant')).toBe('Dining');
      expect(getCategory('Bus_Stop')).toBe('Transport');
      expect(getCategory('Shopping_Mall')).toBe('Shopping');
      expect(getCategory('Art_Museum')).toBe('Landmarks');
    });
  });

  describe('Partial matching', () => {
    it('should match keywords within longer strings', () => {
      expect(getCategory('local_bus_terminal')).toBe('Transport');
      expect(getCategory('seafood_restaurant_downtown')).toBe('Dining');
      expect(getCategory('electronics_store_chain')).toBe('Shopping');
      expect(getCategory('historic_church_site')).toBe('Landmarks');
    });
  });
});

describe('getCategoryColor', () => {
  it('should return correct color for Transport category', () => {
    expect(getCategoryColor('Transport')).toBe('#1c7ed6');
  });

  it('should return correct color for Dining category', () => {
    expect(getCategoryColor('Dining')).toBe('#e8590c');
  });

  it('should return correct color for Shopping category', () => {
    expect(getCategoryColor('Shopping')).toBe('#2f9e44');
  });

  it('should return correct color for Landmarks category', () => {
    expect(getCategoryColor('Landmarks')).toBe('#fab005');
  });

  it('should return correct color for Others category', () => {
    expect(getCategoryColor('Others')).toBe('#868e96');
  });

  it('should return default gray color for invalid category', () => {
    // @ts-expect-error Testing invalid category input
    expect(getCategoryColor('InvalidCategory')).toBe('#868e96');
  });

  it('should return default gray color for empty string', () => {
    // @ts-expect-error Testing invalid category input
    expect(getCategoryColor('')).toBe('#868e96');
  });

  it('should return default gray color for undefined input', () => {
    // @ts-expect-error Testing invalid category input
    expect(getCategoryColor(undefined)).toBe('#868e96');
  });
});
