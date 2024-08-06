import { Context, Next } from 'hono';

export const assetsCacheMiddleware = async (c: Context, next: Next) => {
  c.res.headers.set('Cache-Control', 'public, max-age=31536000');
  return next();
};
