import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({
  path: './.env',
});

export const env = z
  .object({
    NODE_ENV: z.enum(['DEV', 'PROD']),
    PORT: z.string(),
    MONGO_URL: z.string().url(),
    TOKEN_SECRET: z.string().min(2),
    JWT_SECRET: z.string().min(2),
  })
  .parse(process.env);
