import { Context, MiddlewareHandler, Next } from 'hono';
import { Session } from '../validations/user.validation';
import { HTTPException } from 'hono/http-exception';

export const withSuperuserMiddleware = (routeType: 'page' | 'api') => {
  return (c: Context, next: Next) => {
    const session = c.get('session') as Session | null;

    if (routeType === 'page') {
      if (!session) {
        return c.redirect('/');
      }

      if (session.type !== 'superuser') {
        return c.redirect('/');
      }

      return next();
    } else {
      if (!session) {
        throw new HTTPException(401, { message: 'Unauthorized' });
      }

      if (session.type !== 'superuser') {
        throw new HTTPException(401, { message: 'Unauthorized' });
      }

      return next();
    }
  };
};
