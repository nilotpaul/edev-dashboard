import { Hono } from 'hono';
import {
  contentpageHandler,
  homepageHandler,
  postpageHandler,
  userpageHandler,
} from '../handler/page.handler';
import Login from '../www/pages/Login';
import { withoutSessionMiddleware, withSessionMiddleware } from '../middleware/auth.middleware';
import { withSuperuserMiddleware } from '../middleware/user.middleware';

export const pagesRoutes = new Hono();

// Routes having withSessionMiddleware will block any requests that doesn't
// have a valid session and vice-versa for withoutSessionMiddleware.

pagesRoutes.get('/', withSessionMiddleware('page'), homepageHandler);
pagesRoutes.get('/posts', withSessionMiddleware('page'), postpageHandler);
pagesRoutes.get(
  '/users',
  withSessionMiddleware('page'),
  withSuperuserMiddleware('page'),
  userpageHandler
);
pagesRoutes.get('/login', withoutSessionMiddleware('page'), (c) => c.html(Login()));
pagesRoutes.get('/content', withSessionMiddleware('page'), contentpageHandler);
