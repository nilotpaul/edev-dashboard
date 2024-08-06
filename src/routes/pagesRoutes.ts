import { Hono } from 'hono';
import { homepageHandler, postpageHandler, userpageHandler } from '../handler/page.handler';
import Login from '../www/pages/Login';
import { withoutSessionMiddleware, withSessionMiddleware } from '../middleware/auth.middleware';
import { withSuperuserMiddleware } from '../middleware/user.middleware';

export const pagesRoutes = new Hono();

// Routes having withSessionMiddleware will block any requests that doesn't
// have a valid session and vice-versa for withoutSessionMiddleware.

pagesRoutes.get('/', withSessionMiddleware, homepageHandler);
pagesRoutes.get('/posts', withSessionMiddleware, postpageHandler);
pagesRoutes.get('/users', withSessionMiddleware, withSuperuserMiddleware('page'), userpageHandler);
pagesRoutes.get('/login', withoutSessionMiddleware, (c) => c.html(Login()));
