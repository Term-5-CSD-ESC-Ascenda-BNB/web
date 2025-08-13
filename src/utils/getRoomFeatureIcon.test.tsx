import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getRoomFeatureIcon } from './getRoomFeatureIcon';
import {
  IconRulerMeasure,
  IconUsers,
  IconBed,
  IconWifi,
  IconEye,
  IconDeviceTv,
  IconBath,
  IconHelpCircle,
} from '@tabler/icons-react';

describe('getRoomFeatureIcon', () => {
  it('should return IconHelpCircle when label is undefined', () => {
    const result = getRoomFeatureIcon(undefined);
    const { container } = render(result);
    expect(container.firstChild).toBeDefined();
  });

  it('should return IconHelpCircle when label is empty string', () => {
    const result = getRoomFeatureIcon('');
    const { container } = render(result);
    expect(container.firstChild).toBeDefined();
  });

  it('should return IconRulerMeasure for area measurements', () => {
    expect(getRoomFeatureIcon('500 sq ft').type).toBe(IconRulerMeasure);
    expect(getRoomFeatureIcon('50 sqm').type).toBe(IconRulerMeasure);
    expect(getRoomFeatureIcon('Large 600 SQ FT room').type).toBe(IconRulerMeasure);
  });

  it('should return IconUsers for occupancy related labels', () => {
    expect(getRoomFeatureIcon('Sleeps 4').type).toBe(IconUsers);
    expect(getRoomFeatureIcon('Max occupancy 2').type).toBe(IconUsers);
    expect(getRoomFeatureIcon('Can sleep 6 people').type).toBe(IconUsers);
  });

  it('should return IconBed for bed related labels', () => {
    expect(getRoomFeatureIcon('King bed').type).toBe(IconBed);
    expect(getRoomFeatureIcon('Twin beds').type).toBe(IconBed);
    expect(getRoomFeatureIcon('Double bed').type).toBe(IconBed);
    expect(getRoomFeatureIcon('2 beds available').type).toBe(IconBed);
  });

  it('should return IconWifi for internet related labels', () => {
    expect(getRoomFeatureIcon('Free WiFi').type).toBe(IconWifi);
    expect(getRoomFeatureIcon('High-speed internet').type).toBe(IconWifi);
    expect(getRoomFeatureIcon('WiFi included').type).toBe(IconWifi);
  });

  it('should return IconEye for view related labels', () => {
    expect(getRoomFeatureIcon('City view').type).toBe(IconEye);
    expect(getRoomFeatureIcon('Courtyard view').type).toBe(IconEye);
    expect(getRoomFeatureIcon('Beautiful view').type).toBe(IconEye);
  });

  it('should return IconDeviceTv for TV related labels', () => {
    expect(getRoomFeatureIcon('LCD TV').type).toBe(IconDeviceTv);
    expect(getRoomFeatureIcon('55 inch TV').type).toBe(IconDeviceTv);
    expect(getRoomFeatureIcon('Flat screen TV').type).toBe(IconDeviceTv);
  });

  it('should return IconBath for bathroom related labels', () => {
    expect(getRoomFeatureIcon('Private bath').type).toBe(IconBath);
    expect(getRoomFeatureIcon('Bathtub included').type).toBe(IconBath);
    expect(getRoomFeatureIcon('Shower only').type).toBe(IconBath);
  });

  it('should return IconHelpCircle for unrecognized labels', () => {
    expect(getRoomFeatureIcon('Some random feature').type).toBe(IconHelpCircle);
    expect(getRoomFeatureIcon('Unknown amenity').type).toBe(IconHelpCircle);
  });

  it('should be case insensitive', () => {
    expect(getRoomFeatureIcon('KING BED').type).toBe(IconBed);
    expect(getRoomFeatureIcon('WiFi').type).toBe(IconWifi);
    expect(getRoomFeatureIcon('CITY VIEW').type).toBe(IconEye);
  });

  it('should return correct icon size', () => {
    const result = getRoomFeatureIcon('King bed');
    expect(result.props.size).toBe(14);
  });
});
