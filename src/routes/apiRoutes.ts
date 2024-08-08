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
import { fetchLinkHandler } from '../handler/editor.handler';
import { createPostHandler } from '../handler/post.handler';

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

// Users Routes
apiRoutes.post(
  '/user/create',
  withSessionMiddleware('api'),
  withSuperuserMiddleware('api'),
  h(createUserHandler)
);
apiRoutes.delete(
  '/user/delete',
  withSessionMiddleware('api'),
  withSuperuserMiddleware('api'),
  h(deleteUserHandler)
);
apiRoutes.post('/user/login', withoutSessionMiddleware('api'), h(loginHandler));
apiRoutes.post('/user/logout', withSessionMiddleware('api'), h(logoutHandler));

// Posts Routes
apiRoutes.post('/posts/create', withSessionMiddleware('api'), h(createPostHandler));

// Editor Routes
apiRoutes.get('/fetchUrl', withSessionMiddleware('api'), h(fetchLinkHandler));
