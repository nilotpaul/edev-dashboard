import { Hono } from 'hono';
import {
  createUserHandler,
  deleteUserHandler,
  loginHandler,
  logoutHandler,
} from '../handler/user.handler';
import {
  authorizeMiddleware,
  withoutSessionMiddleware,
  withSessionMiddleware,
} from '../middleware/auth.middleware';
import { makeHandler as h } from '../utils';
import { withSuperuserMiddleware } from '../middleware/user.middleware';

// makeHandler or h is a wrapper function that will log errors.
// All the handlers should be wrapped with makeHandler or h utility function.

// authorizeMiddleware will be applied to all routes defined on this instance.
// This middleware will block any requests that do not have a valid authorization header token.
export const apiRoutes = new Hono();

apiRoutes.use(authorizeMiddleware);

// Routes having withSessionMiddleware will block any requests that doesn't
// have a valid session and vice-versa for withoutSessionMiddleware.

// Routes having withSuperuserMiddleware will block any requests if the
// user role isn't a superuser.

apiRoutes.post(
  '/user/create',
  withSessionMiddleware,
  withSuperuserMiddleware('api'),
  h(createUserHandler)
);
apiRoutes.delete(
  '/user/delete',
  withSessionMiddleware,
  withSuperuserMiddleware('api'),
  h(deleteUserHandler)
);
apiRoutes.post('/user/login', withoutSessionMiddleware, h(loginHandler));
apiRoutes.post('/user/logout', withSessionMiddleware, h(logoutHandler));
