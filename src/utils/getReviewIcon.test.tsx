import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  IconMapPin,
  IconBed,
  IconWifi,
  IconCoffee,
  IconToolsKitchen2,
  IconArmchair,
  IconHeartHandshake,
  IconMoodSmile,
  IconHelpCircle,
  IconUser,
  IconUsersGroup,
  IconBriefcase,
  IconHeart,
} from '@tabler/icons-react';
import { getReviewIcon } from './getReviewIcon';

describe('getReviewIcon', () => {
  describe('when label is undefined or empty', () => {
    it('returns IconHelpCircle for undefined label', () => {
      const result = getReviewIcon(undefined);
      expect(result.type).toBe(IconHelpCircle);
      expect(result.props).toHaveProperty('size', 16);
    });

    it('returns appropriate icon for empty string', () => {
      const result = getReviewIcon('');
      expect(result.type).toBe(IconHelpCircle);
    });
  });

  describe('category scores', () => {
    it('returns IconMapPin for location-related labels', () => {
      expect(getReviewIcon('location').type).toBe(IconMapPin);
      expect(getReviewIcon('Location').type).toBe(IconMapPin);
      expect(getReviewIcon('LOCATION').type).toBe(IconMapPin);
      expect(getReviewIcon('Hotel location').type).toBe(IconMapPin);
    });

    it('returns IconBed for room-related labels', () => {
      expect(getReviewIcon('room').type).toBe(IconBed);
      expect(getReviewIcon('Room').type).toBe(IconBed);
      expect(getReviewIcon('ROOM').type).toBe(IconBed);
      expect(getReviewIcon('Room quality').type).toBe(IconBed);
    });

    it('returns IconWifi for wifi/internet-related labels', () => {
      expect(getReviewIcon('wifi').type).toBe(IconWifi);
      expect(getReviewIcon('WiFi').type).toBe(IconWifi);
      expect(getReviewIcon('internet').type).toBe(IconWifi);
      expect(getReviewIcon('Internet connection').type).toBe(IconWifi);
      expect(getReviewIcon('Free wifi').type).toBe(IconWifi);
    });

    it('returns IconCoffee for breakfast-related labels', () => {
      expect(getReviewIcon('breakfast').type).toBe(IconCoffee);
      expect(getReviewIcon('Breakfast').type).toBe(IconCoffee);
      expect(getReviewIcon('BREAKFAST').type).toBe(IconCoffee);
      expect(getReviewIcon('Continental breakfast').type).toBe(IconCoffee);
    });

    it('returns IconToolsKitchen2 for food/dining-related labels', () => {
      expect(getReviewIcon('food').type).toBe(IconToolsKitchen2);
      expect(getReviewIcon('dining').type).toBe(IconToolsKitchen2);
      expect(getReviewIcon('Food quality').type).toBe(IconToolsKitchen2);
      expect(getReviewIcon('Restaurant dining').type).toBe(IconToolsKitchen2);
    });

    it('returns IconArmchair for comfort-related labels', () => {
      expect(getReviewIcon('comfort').type).toBe(IconArmchair);
      expect(getReviewIcon('Comfort').type).toBe(IconArmchair);
      expect(getReviewIcon('guest comfort').type).toBe(IconArmchair);
    });

    it('returns IconHeartHandshake for service-related labels', () => {
      expect(getReviewIcon('service').type).toBe(IconHeartHandshake);
      expect(getReviewIcon('Service').type).toBe(IconHeartHandshake);
      expect(getReviewIcon('Customer service').type).toBe(IconHeartHandshake);
    });

    it('returns IconMoodSmile for vibe-related labels', () => {
      expect(getReviewIcon('vibe').type).toBe(IconMoodSmile);
      expect(getReviewIcon('Vibe').type).toBe(IconMoodSmile);
      expect(getReviewIcon('Hotel vibe').type).toBe(IconMoodSmile);
    });
  });

  describe('traveler types', () => {
    it('returns IconUser for solo traveler labels', () => {
      expect(getReviewIcon('solo').type).toBe(IconUser);
      expect(getReviewIcon('Solo').type).toBe(IconUser);
      expect(getReviewIcon('Solo traveler').type).toBe(IconUser);
    });

    it('returns IconHeart for couple-related labels', () => {
      expect(getReviewIcon('couple').type).toBe(IconHeart);
      expect(getReviewIcon('Couple').type).toBe(IconHeart);
      expect(getReviewIcon('Couples retreat').type).toBe(IconHeart);
    });

    it('returns IconUsersGroup for family-related labels', () => {
      expect(getReviewIcon('family').type).toBe(IconUsersGroup);
      expect(getReviewIcon('Family').type).toBe(IconUsersGroup);
      expect(getReviewIcon('Family vacation').type).toBe(IconUsersGroup);
    });

    it('returns IconBriefcase for business-related labels', () => {
      expect(getReviewIcon('business').type).toBe(IconBriefcase);
      expect(getReviewIcon('Business').type).toBe(IconBriefcase);
      expect(getReviewIcon('Business travel').type).toBe(IconBriefcase);
    });
  });

  describe('unknown labels', () => {
    it('returns IconHelpCircle for unrecognized labels', () => {
      expect(getReviewIcon('unknown category').type).toBe(IconHelpCircle);
      expect(getReviewIcon('random text').type).toBe(IconHelpCircle);
      expect(getReviewIcon('xyz').type).toBe(IconHelpCircle);
    });
  });

  describe('case sensitivity', () => {
    it('handles mixed case labels correctly', () => {
      expect(getReviewIcon('WiFi').type).toBe(IconWifi);
      expect(getReviewIcon('BrEaKfAsT').type).toBe(IconCoffee);
      expect(getReviewIcon('FAMILY').type).toBe(IconUsersGroup);
      expect(getReviewIcon('sErViCe').type).toBe(IconHeartHandshake);
    });
  });

  describe('priority handling', () => {
    it('returns the first matching icon when multiple matches exist', () => {
      // "room service" should match "room" first (IconBed) before "service" (IconHeartHandshake)
      expect(getReviewIcon('room service').type).toBe(IconBed);

      // "wifi service" should match "wifi" first (IconWifi) before "service" (IconHeartHandshake)
      expect(getReviewIcon('wifi service').type).toBe(IconWifi);

      // "family room" should match "room" first (IconBed) before "family" (IconUsersGroup)
      expect(getReviewIcon('family room').type).toBe(IconBed);

      // "room comfort" should match "room" first (IconBed) before "comfort" (IconArmchair)
      expect(getReviewIcon('room comfort').type).toBe(IconBed);
    });
  });

  describe('icon properties', () => {
    it('returns icons with correct size property', () => {
      const result = getReviewIcon('location');
      expect(result.props).toHaveProperty('size', 16);
    });

    it('returns valid React elements', () => {
      const result = getReviewIcon('wifi');
      const { container } = render(result);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
