import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
