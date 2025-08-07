import { describe, it, expect } from 'vitest';
import {
  categorizeType,
  getCategoryColor,
  getCategoryIcon,
  getPOIIcon,
  getHotelIcon,
  type Category,
} from './getSurroundingMapIcon';
import {
  IconTrain,
  IconToolsKitchen,
  IconShoppingBag,
  IconStar,
  IconMapPin,
} from '@tabler/icons-react';

describe('getSurroundingMapIcon', () => {
  describe('categorizeType', () => {
    it('should categorize transport types correctly', () => {
      expect(categorizeType('bus_stop')).toBe('Transport');
      expect(categorizeType('subway')).toBe('Transport');
      expect(categorizeType('train')).toBe('Transport');
      expect(categorizeType('platform')).toBe('Transport');
      expect(categorizeType('station')).toBe('Transport');
      expect(categorizeType('taxi')).toBe('Transport');
      expect(categorizeType('public_transport')).toBe('Transport');
      expect(categorizeType('BUS_STOP')).toBe('Transport'); // case insensitive
    });

    it('should categorize dining types correctly', () => {
      expect(categorizeType('restaurant')).toBe('Dining');
      expect(categorizeType('cafe')).toBe('Dining');
      expect(categorizeType('fast_food')).toBe('Dining');
      expect(categorizeType('food_court')).toBe('Dining');
      expect(categorizeType('bakery')).toBe('Dining');
      expect(categorizeType('ice_cream')).toBe('Dining');
      expect(categorizeType('RESTAURANT')).toBe('Dining'); // case insensitive
    });

    it('should categorize shopping types correctly', () => {
      expect(categorizeType('supermarket')).toBe('Shopping');
      expect(categorizeType('mall')).toBe('Shopping');
      expect(categorizeType('store')).toBe('Shopping');
      expect(categorizeType('convenience')).toBe('Shopping');
      expect(categorizeType('toys')).toBe('Shopping');
      expect(categorizeType('electronics')).toBe('Shopping');
      expect(categorizeType('retail')).toBe('Shopping');
      expect(categorizeType('shop')).toBe('Shopping');
      expect(categorizeType('MALL')).toBe('Shopping'); // case insensitive
    });

    it('should categorize landmarks types correctly', () => {
      expect(categorizeType('hotel')).toBe('Landmarks');
      expect(categorizeType('guest_house')).toBe('Landmarks');
      expect(categorizeType('museum')).toBe('Landmarks');
      expect(categorizeType('school')).toBe('Landmarks');
      expect(categorizeType('park')).toBe('Landmarks');
      expect(categorizeType('monument')).toBe('Landmarks');
      expect(categorizeType('temple')).toBe('Landmarks');
      expect(categorizeType('church')).toBe('Landmarks');
      expect(categorizeType('police')).toBe('Landmarks');
      expect(categorizeType('MUSEUM')).toBe('Landmarks'); // case insensitive
    });

    it('should categorize unknown types as Others', () => {
      expect(categorizeType('unknown')).toBe('Others');
      expect(categorizeType('random_type')).toBe('Others');
      expect(categorizeType('')).toBe('Others');
    });

    it('should handle partial matches in type names', () => {
      expect(categorizeType('bus_stop_nearby')).toBe('Transport');
      expect(categorizeType('italian_restaurant')).toBe('Dining');
      expect(categorizeType('electronics_store')).toBe('Shopping');
      expect(categorizeType('art_museum')).toBe('Landmarks');
    });
  });

  describe('getCategoryColor', () => {
    it('should return correct colors for each category', () => {
      expect(getCategoryColor('Transport')).toBe('#1c7ed6');
      expect(getCategoryColor('Dining')).toBe('#e8590c');
      expect(getCategoryColor('Shopping')).toBe('#2f9e44');
      expect(getCategoryColor('Landmarks')).toBe('#fab005');
      expect(getCategoryColor('Others')).toBe('#868e96');
    });

    it('should return default color for unknown category', () => {
      expect(getCategoryColor('UnknownCategory' as Category)).toBe('#868e96');
    });
  });

  describe('getCategoryIcon', () => {
    it('should return correct icon components for each category', () => {
      expect(getCategoryIcon('Transport').type).toBe(IconTrain);
      expect(getCategoryIcon('Dining').type).toBe(IconToolsKitchen);
      expect(getCategoryIcon('Shopping').type).toBe(IconShoppingBag);
      expect(getCategoryIcon('Landmarks').type).toBe(IconStar);
      expect(getCategoryIcon('Others').type).toBe(IconMapPin);
    });

    it('should return default icon for unknown category', () => {
      expect(getCategoryIcon('UnknownCategory' as Category).type).toBe(IconMapPin);
    });
  });

  describe('getPOIIcon', () => {
    it('should return a React element with div type', () => {
      const poiIcon = getPOIIcon('Transport');
      expect(poiIcon.type).toBe('div');
    });

    it('should create POI icons for all categories', () => {
      const categories: Category[] = ['Transport', 'Dining', 'Shopping', 'Landmarks', 'Others'];

      categories.forEach((category) => {
        const poiIcon = getPOIIcon(category);
        expect(poiIcon).toBeDefined();
        expect(poiIcon.type).toBe('div');
      });
    });
  });

  describe('getHotelIcon', () => {
    it('should return a leaflet divIcon with correct properties', () => {
      const hotelIcon = getHotelIcon();

      expect(hotelIcon.options.className).toBe('');
      expect(hotelIcon.options.iconSize).toEqual([50, 50]);
      expect(hotelIcon.options.iconAnchor).toEqual([25, 50]);
    });

    it('should have HTML content in the hotel icon', () => {
      const hotelIcon = getHotelIcon();
      const html = hotelIcon.options.html;

      expect(html).toBeTruthy();
      expect(typeof html).toBe('string');
      expect(html).toContain('background-color:#6741d9');
      expect(html).toContain('border-radius:50%');
    });
  });
});
