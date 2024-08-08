import { z } from 'zod';
import { USER_ROLE } from '../config/user';

export const createUserSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Must be atleast of 2 character(s)' })
    .refine((s) => isNaN(Number(s)), { message: 'Only numbers are not allowed' }),
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: 'Must be atleast of 4 character(s)' })
    .max(30, { message: 'Must be atmost of 30 character(s)' }),
  role: z.enum(USER_ROLE),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: 'Must be atleast of 4 character(s)' })
    .max(30, { message: 'Must be atmost of 30 character(s)' }),
});

export const sessionPayloadSchema = z.object({
  _id: z.unknown(),
  username: z
    .string()
    .min(2, { message: 'Must be atleast of 2 character(s)' })
    .refine((s) => isNaN(Number(s)), { message: 'Only numbers are not allowed' }),
  email: z.string().email(),
  role: z.enum(USER_ROLE),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type Login = z.infer<typeof loginSchema>;
export type Session = z.infer<typeof sessionPayloadSchema>;
