import { z } from 'zod';

export const responseSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().nullable(), // returned but empty
  provider: z.string().nullable(),
  providerId: z.string().nullable(),
  stripeCustomerId: z.string().nullable(),
});

export type ResponseSchema = z.infer<typeof responseSchema>;
