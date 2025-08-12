import { describe, it, expect } from 'vitest';
import { responseSchema } from './responseSchema';

const validResponse = {
  id: 42,
  createdAt: '2025-08-06T12:00:00Z',
  updatedAt: '2025-08-06T13:00:00Z',
  email: 'user@example.com',
  emailVerified: true,
  firstName: 'Alice',
  lastName: 'Smith',
  password: null,
  provider: null,
  providerId: null,
  stripeCustomerId: null,
};

describe('responseSchema', () => {
  it('parses a valid response object', () => {
    const parsed = responseSchema.parse(validResponse);
    expect(parsed).toEqual(validResponse);
  });

  it('rejects non-number id', () => {
    const { success, error } = responseSchema.safeParse({
      ...validResponse,
      id: 'not-a-number',
    });
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['id']);
    }
  });

  it('rejects invalid email format', () => {
    const { success, error } = responseSchema.safeParse({
      ...validResponse,
      email: 'invalid-email',
    });
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['email']);
    }
  });

  it('rejects non-boolean emailVerified', () => {
    const { success, error } = responseSchema.safeParse({
      ...validResponse,
      emailVerified: 'yes',
    });
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['emailVerified']);
    }
  });

  it('allows string values for nullable fields', () => {
    const custom = {
      ...validResponse,
      password: 'secret',
      provider: 'google',
      providerId: 'pid123',
      stripeCustomerId: 'scid456',
    };
    const parsed = responseSchema.parse(custom);
    expect(parsed.password).toBe('secret');
    expect(parsed.provider).toBe('google');
    expect(parsed.providerId).toBe('pid123');
    expect(parsed.stripeCustomerId).toBe('scid456');
  });

  it('rejects wrong type for nullable fields', () => {
    const { success, error } = responseSchema.safeParse({
      ...validResponse,
      password: 123,
    });
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['password']);
    }
  });

  it('rejects missing required fields', () => {
    const partial: Omit<typeof validResponse, 'firstName'> &
      Partial<Pick<typeof validResponse, 'firstName'>> = { ...validResponse };
    delete partial.firstName;
    const { success, error } = responseSchema.safeParse(partial);
    expect(success).toBe(false);
    if (!success) {
      expect(error.errors[0].path).toEqual(['firstName']);
    }
  });
});
