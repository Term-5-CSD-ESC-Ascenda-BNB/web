import { describe, expect, it } from 'vitest';
import { getHiresCount } from './getHiresCount';

const hiresString = '0,1,2,3,4,5,6,7,8';
const emptyString = '';
const singleValueString = '1';
const erroroneousString = '0,1,2,,4,5,6,7,8'; // contains an empty value

describe('getHiresCount', () => {
  it('should return the correct count for a string with multiple comma-separated values', () => {
    const result = getHiresCount(hiresString);
    expect(result).toBe(9);
  });
  it('should return 0 for an empty string', () => {
    const result = getHiresCount(emptyString);
    expect(result).toBe(0);
  });
  it('should return 1 for a string with a single value', () => {
    const result = getHiresCount(singleValueString);
    expect(result).toBe(1);
  });
  it('should handle a string with an empty value correctly', () => {
    const result = getHiresCount(erroroneousString);
    expect(result).toBe(8); // counts only non-empty values
  });
});
