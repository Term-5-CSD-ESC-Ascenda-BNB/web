import { describe, it, expect } from 'vitest';
import {
  IconBuildingSkyscraper,
  IconPlane,
  IconBuilding,
  IconBuildingBank,
  IconMapPin,
  IconBuildingMonument,
} from '@tabler/icons-react';
import { getIconByType } from './getIconByType';

describe('getIconByType', () => {
  it('returns IconBuildingSkyscraper for city (case-insensitive)', () => {
    expect(getIconByType('city')).toBe(IconBuildingSkyscraper);
    expect(getIconByType('CITY')).toBe(IconBuildingSkyscraper);
  });

  it('returns IconPlane for airport', () => {
    expect(getIconByType('airport')).toBe(IconPlane);
  });

  it('returns IconBuilding for hotel', () => {
    expect(getIconByType('hotel')).toBe(IconBuilding);
  });

  it('returns IconBuildingBank for both museum and museums', () => {
    expect(getIconByType('museum')).toBe(IconBuildingBank);
    expect(getIconByType('museums')).toBe(IconBuildingBank);
  });

  it('returns IconBuildingBank for historic (synonym mapping)', () => {
    expect(getIconByType('historic')).toBe(IconBuildingMonument);
    expect(getIconByType('monument')).toBe(IconBuildingMonument);
  });

  it('returns IconMapPin for unknown types', () => {
    expect(getIconByType('unknown-type')).toBe(IconMapPin);
    expect(getIconByType('')).toBe(IconMapPin);
  });
});
