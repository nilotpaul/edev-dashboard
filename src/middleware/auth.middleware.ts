import { Context, Next } from 'hono';
import { env } from '../validations/env';
import { HTTPException } from 'hono/http-exception';
import { getSessionCookie, verifyAccessToken } from '../utils/auth';
import { IUser } from '../../types';
import { Session, sessionPayloadSchema } from '../validations/user.validation';
import User from '../models/User';

// authorizeMiddleware will get the auth token from request header.
// eg. Bearer token, and will compare the token with the one
// in env, if token is invalid the handler will return an
// Unauthorized message.
export const authorizeMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  const TOKEN_SECRET = env.TOKEN_SECRET;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== TOKEN_SECRET) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }

  await next();
};

// withSessionMiddleware will block and redirect the request to /login
// if it doesn't have a valid session.
export const withSessionMiddleware = async (c: Context, next: Next) => {
  const token = getSessionCookie(c);
  const decodedUser = verifyAccessToken(token ?? '');

  const { success, data: parsedUser } = sessionPayloadSchema
    .passthrough()
    .safeParse(decodedUser.decoded);

  if (!success || !parsedUser) {
    c.set('session', null);
    return c.redirect('/login');
  }

  const dbUser = await User.findOne({ accessToken: token });

  if (!dbUser?.id) {
    c.set('session', null);
    return c.redirect('/login');
  }

  c.set('session', parsedUser);
  console.log('current session:', parsedUser.id);

  return next();
};

// withSessionMiddleware will block any requests, if it has a valid session.
export const withoutSessionMiddleware = async (c: Context, next: Next) => {
  const session = c.get('session') as Session | null;

  if (session) {
    throw new HTTPException(401, { message: 'Session is still valid' });
  }

  return next();
};
