import { describe, it, expect } from 'vitest';
import { registerSchema } from './registerSchema';

const validData = {
  email: 'user@example.com',
  password: 'StrongP@ss1',
  confirmPassword: 'StrongP@ss1',
  firstName: 'Alice',
  lastName: 'Smith',
};

describe('registerSchema', () => {
  it('parses valid registration data', () => {
    const parsed = registerSchema.parse(validData);
    expect(parsed).toEqual(validData);
  });

  it('rejects invalid email format', () => {
    const result = registerSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['email']);
      expect(result.error.errors[0].message).toBe('Invalid email');
    }
  });

  it('rejects weak password (fails regex)', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'weakpass',
      confirmPassword: 'weakpass',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['password']);
      expect(result.error.errors[0].message).toBe('Weak password');
    }
  });

  it('rejects when password and confirmPassword do not match', () => {
    const result = registerSchema.safeParse({ ...validData, confirmPassword: 'OtherP@ss1' });
    expect(result.success).toBe(false);
    if (!result.success) {
      // refine() sets its error on confirmPassword
      expect(result.error.errors[0].path).toEqual(['confirmPassword']);
      expect(result.error.errors[0].message).toBe('Passwords do not match');
    }
  });

  it('requires non-empty firstName and lastName', () => {
    const missingFirst = registerSchema.safeParse({ ...validData, firstName: '' });
    expect(missingFirst.success).toBe(false);
    if (!missingFirst.success) {
      expect(missingFirst.error.errors[0].path).toEqual(['firstName']);
      expect(missingFirst.error.errors[0].message).toBe('First name is required');
    }

    const missingLast = registerSchema.safeParse({ ...validData, lastName: '' });
    expect(missingLast.success).toBe(false);
    if (!missingLast.success) {
      expect(missingLast.error.errors[0].path).toEqual(['lastName']);
      expect(missingLast.error.errors[0].message).toBe('Last name is required');
    }
  });
});
