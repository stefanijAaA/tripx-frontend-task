import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  bookingCode: z.string().trim().optional().or(z.literal('')),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
