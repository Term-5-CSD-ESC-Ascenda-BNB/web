import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getSurroundingIcon } from './getSurroundingIcon';

describe('getSurroundingIcon', () => {
  // Helper function to get the icon name from the rendered component
  const getIconName = (type: string): string => {
    const { container } = render(getSurroundingIcon(type));
    const svg = container.querySelector('svg');
    return svg?.getAttribute('class') || '';
  };

  describe('transportation icons', () => {
    it('returns train icon for train-related types', () => {
      expect(getIconName('train')).toContain('tabler-icon-train');
      expect(getIconName('metro')).toContain('tabler-icon-train');
      expect(getIconName('station')).toContain('tabler-icon-train');
      expect(getIconName('Train Station')).toContain('tabler-icon-train');
      expect(getIconName('METRO STATION')).toContain('tabler-icon-train');
    });

    it('returns plane icon for airport-related types', () => {
      expect(getIconName('airport')).toContain('tabler-icon-plane');
      expect(getIconName('plane')).toContain('tabler-icon-plane');
      expect(getIconName('Airport Terminal')).toContain('tabler-icon-plane');
      expect(getIconName('PLANE HANGAR')).toContain('tabler-icon-plane');
    });

    it('returns bus icon for bus-related types', () => {
      expect(getIconName('bus')).toContain('tabler-icon-bus');
      expect(getIconName('Bus Stop')).toContain('tabler-icon-bus');
      expect(getIconName('BUS TERMINAL')).toContain('tabler-icon-bus');
    });

    it('returns bike icon for bicycle-related types', () => {
      expect(getIconName('bike')).toContain('tabler-icon-bike');
      expect(getIconName('bicycle')).toContain('tabler-icon-bike');
      expect(getIconName('Bike Rental')).toContain('tabler-icon-bike');
      expect(getIconName('BICYCLE PARKING')).toContain('tabler-icon-bike');
    });

    it('returns car icon for vehicle-related types', () => {
      expect(getIconName('car')).toContain('tabler-icon-car');
      expect(getIconName('vehicle')).toContain('tabler-icon-car');
      expect(getIconName('parking')).toContain('tabler-icon-car');
      expect(getIconName('Car Rental')).toContain('tabler-icon-car');
      expect(getIconName('VEHICLE PARKING')).toContain('tabler-icon-car');
    });
  });

  describe('shopping and retail icons', () => {
    it('returns shopping bag icon for shopping-related types', () => {
      expect(getIconName('shopping')).toContain('tabler-icon-shopping-bag');
      expect(getIconName('store')).toContain('tabler-icon-shopping-bag');
      expect(getIconName('mall')).toContain('tabler-icon-shopping-bag');
      expect(getIconName('Shopping Center')).toContain('tabler-icon-shopping-bag');
      expect(getIconName('RETAIL STORE')).toContain('tabler-icon-shopping-bag');
    });
  });

  describe('food and dining icons', () => {
    it('returns kitchen icon for restaurant-related types', () => {
      expect(getIconName('restaurant')).toContain('tabler-icon-tools-kitchen');
      expect(getIconName('dining')).toContain('tabler-icon-tools-kitchen');
      expect(getIconName('food')).toContain('tabler-icon-tools-kitchen');
      expect(getIconName('Fine Dining Restaurant')).toContain('tabler-icon-tools-kitchen');
      expect(getIconName('FOOD COURT')).toContain('tabler-icon-tools-kitchen');
    });

    it('returns coffee icon for cafe-related types', () => {
      expect(getIconName('cafe')).toContain('tabler-icon-coffee');
      expect(getIconName('coffee')).toContain('tabler-icon-coffee');
      expect(getIconName('Coffee Shop')).toContain('tabler-icon-coffee');
      expect(getIconName('COFFEE HOUSE')).toContain('tabler-icon-coffee');
    });
  });

  describe('entertainment and nightlife icons', () => {
    it('returns beer icon for bar-related types', () => {
      expect(getIconName('bar')).toContain('tabler-icon-beer');
      expect(getIconName('pub')).toContain('tabler-icon-beer');
      expect(getIconName('nightclub')).toContain('tabler-icon-beer');
      expect(getIconName('Sports Bar')).toContain('tabler-icon-beer');
      expect(getIconName('NIGHT PUB')).toContain('tabler-icon-beer');
    });

    it('returns music icon for music-related types', () => {
      expect(getIconName('music')).toContain('tabler-icon-music');
      expect(getIconName('band')).toContain('tabler-icon-music');
      expect(getIconName('Music Venue')).toContain('tabler-icon-music');
      expect(getIconName('LIVE BAND')).toContain('tabler-icon-music');
    });
  });

  describe('accommodation icons', () => {
    it('returns bed icon for hotel-related types', () => {
      expect(getIconName('hotel')).toContain('tabler-icon-bed');
      expect(getIconName('lodging')).toContain('tabler-icon-bed');
      expect(getIconName('inn')).toContain('tabler-icon-bed');
      expect(getIconName('Luxury Hotel')).toContain('tabler-icon-bed');
      expect(getIconName('BUDGET INN')).toContain('tabler-icon-bed');
    });

    it('returns home icon for residential types', () => {
      expect(getIconName('home')).toContain('tabler-icon-home');
      expect(getIconName('residence')).toContain('tabler-icon-home');
      expect(getIconName('Home Rental')).toContain('tabler-icon-home');
      expect(getIconName('PRIVATE RESIDENCE')).toContain('tabler-icon-home');
    });
  });

  describe('tourist attractions and cultural sites', () => {
    it('returns star icon for attraction-related types', () => {
      expect(getIconName('attraction')).toContain('tabler-icon-star');
      expect(getIconName('sight')).toContain('tabler-icon-star');
      expect(getIconName('tour')).toContain('tabler-icon-star');
      expect(getIconName('Tourist Attraction')).toContain('tabler-icon-star');
      expect(getIconName('SIGHTSEEING TOUR')).toContain('tabler-icon-star');
    });

    it('returns building store icon for gallery and museum types', () => {
      expect(getIconName('gallery')).toContain('tabler-icon-building-store');
      expect(getIconName('museum')).toContain('tabler-icon-building-store');
      expect(getIconName('Art Gallery')).toContain('tabler-icon-building-store');
      expect(getIconName('HISTORY MUSEUM')).toContain('tabler-icon-building-store');
    });

    it('returns camera icon for photography-related types', () => {
      expect(getIconName('photo')).toContain('tabler-icon-camera');
      expect(getIconName('camera')).toContain('tabler-icon-camera');
      expect(getIconName('Photo Studio')).toContain('tabler-icon-camera');
      expect(getIconName('CAMERA SHOP')).toContain('tabler-icon-camera');
    });
  });

  describe('educational and professional icons', () => {
    it('returns school icon for educational types', () => {
      expect(getIconName('school')).toContain('tabler-icon-school');
      expect(getIconName('university')).toContain('tabler-icon-school');
      expect(getIconName('Public School')).toContain('tabler-icon-school');
      expect(getIconName('STATE UNIVERSITY')).toContain('tabler-icon-school');
    });

    it('returns briefcase icon for business types', () => {
      expect(getIconName('office')).toContain('tabler-icon-briefcase');
      expect(getIconName('business')).toContain('tabler-icon-briefcase');
      expect(getIconName('Office Building')).toContain('tabler-icon-briefcase');
      expect(getIconName('BUSINESS CENTER')).toContain('tabler-icon-briefcase');
    });

    it('returns book icon for library types', () => {
      expect(getIconName('book')).toContain('tabler-icon-book');
      expect(getIconName('library')).toContain('tabler-icon-book');
      expect(getIconName('Public Library')).toContain('tabler-icon-book');
      expect(getIconName('BOOK STORE')).toContain('tabler-icon-book');
    });
  });

  describe('default fallback', () => {
    it('returns map pin icon for unrecognized types', () => {
      expect(getIconName('unknown')).toContain('tabler-icon-map-pin');
      expect(getIconName('random text')).toContain('tabler-icon-map-pin');
      expect(getIconName('xyz123')).toContain('tabler-icon-map-pin');
      expect(getIconName('')).toContain('tabler-icon-map-pin');
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      expect(() => getSurroundingIcon('')).not.toThrow();
      expect(getIconName('')).toContain('tabler-icon-map-pin');
    });

    it('handles special characters', () => {
      expect(() => getSurroundingIcon('!@#$%^&*()')).not.toThrow();
      expect(getIconName('!@#$%^&*()')).toContain('tabler-icon-map-pin');
    });

    it('handles numbers', () => {
      expect(() => getSurroundingIcon('12345')).not.toThrow();
      expect(getIconName('12345')).toContain('tabler-icon-map-pin');
    });

    it('handles mixed case variations', () => {
      expect(getIconName('TRAIN')).toContain('tabler-icon-train');
      expect(getIconName('Train')).toContain('tabler-icon-train');
      expect(getIconName('tRaIn')).toContain('tabler-icon-train');
    });

    it('handles partial matches within larger strings', () => {
      expect(getIconName('Grand Central Train Station')).toContain('tabler-icon-train');
      expect(getIconName('Downtown Shopping Mall')).toContain('tabler-icon-shopping-bag');
      expect(getIconName('Five Star Restaurant')).toContain('tabler-icon-tools-kitchen');
    });
  });

  describe('priority order', () => {
    it('handles strings with multiple matching keywords (first match wins)', () => {
      // The function uses if-else chain, so first match should win
      expect(getIconName('train station restaurant')).toContain('tabler-icon-train');
      expect(getIconName('airport shopping mall')).toContain('tabler-icon-plane');
      expect(getIconName('hotel restaurant bar')).toContain('tabler-icon-bed');
    });
  });

  describe('icon properties', () => {
    it('renders icons with correct size prop', () => {
      const { container } = render(getSurroundingIcon('train'));
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '18');
      expect(svg).toHaveAttribute('height', '18');
    });

    it('returns React elements', () => {
      const icon = getSurroundingIcon('train');
      expect(icon).toBeTruthy();
      expect(typeof icon).toBe('object');
      expect(icon.props).toBeDefined();
    });
  });
});
