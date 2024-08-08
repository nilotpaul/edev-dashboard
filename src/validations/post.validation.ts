import { z } from 'zod';

export const createPostValidation = z.object({
  title: z.string().min(10, { message: 'Must be atleast of 10 character(s)' }),
  content: z.array(z.any()).default([]),
});

export type CreatePost = z.infer<typeof createPostValidation>;
