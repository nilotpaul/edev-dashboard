import { Context, Next } from 'hono';
import { env } from '../validations/env';
import { HTTPException } from 'hono/http-exception';
import { getSessionCookie, verifyAccessToken } from '../utils/auth';
import { HandlerType } from '../config/app.config';
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

export const sessionMiddleware = async (c: Context, next: Next) => {
  const token = getSessionCookie(c);
  const decodedUser = verifyAccessToken(token ?? '');

  const {
    success,
    data: parsedUser,
    error,
  } = sessionPayloadSchema.passthrough().safeParse(decodedUser.decoded);

  if (!success || !parsedUser || !decodedUser.valid) {
    console.error('Invalid cookie data', error?.flatten().fieldErrors);

    c.set('session', null);
    return next();
  }

  const dbUser = await User.findOne({ accessToken: token });

  if (!dbUser?._id) {
    c.set('session', null);
    return next();
  }

  c.set('session', parsedUser);
  console.log('current session:', parsedUser._id);

  return next();
};

// withSessionMiddleware will block and redirect the request to /login
// if it doesn't have a valid session.
export const withSessionMiddleware = (routeType: HandlerType) => {
  return (c: Context, next: Next) => {
    if (routeType === 'page') {
      const session = c.get('session') as Session | null;

      if (!session?._id) {
        return c.redirect('/login');
      }

      return next();
    } else {
      const session = c.get('session') as Session | null;

      if (!session?._id) {
        throw new HTTPException(401, { message: 'Unauthorized' });
      }

      return next();
    }
  };
};

// withSessionMiddleware will block any requests, if it has a valid session.
export const withoutSessionMiddleware = (routeType: HandlerType) => {
  return (c: Context, next: Next) => {
    if (routeType === 'page') {
      const session = c.get('session') as Session | null;

      if (session?._id) {
        return c.redirect('/');
      }

      return next();
    } else {
      const session = c.get('session') as Session | null;

      if (session?._id) {
        throw new HTTPException(401, { message: 'Session is still valid' });
      }

      return next();
    }
  };
};
