import { describe, it, expect } from 'vitest';
import { loginSchema } from './schema';

describe('loginSchema', () => {
  const validData = {
    email: 'user@example.com',
    password: 'longenough',
  };

  it('parses valid credentials', () => {
    const parsed = loginSchema.parse(validData);
    expect(parsed).toEqual(validData);
  });

  it('rejects invalid email formats', () => {
    const result = loginSchema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['email']);
      expect(result.error.errors[0].message).toBe('Invalid email');
    }
  });

  it('rejects too-short passwords', () => {
    const shortPwd = { ...validData, password: 'short' };
    const result = loginSchema.safeParse(shortPwd);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['password']);
      expect(result.error.errors[0].message).toBe('Password must be at least 8 characters long');
    }
  });
});
