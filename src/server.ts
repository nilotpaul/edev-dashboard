import { Hono } from 'hono';
import { cors } from 'hono/cors';
import connectDB from './config/db.config';
import { logger } from 'hono/logger';
import { csrf } from 'hono/csrf';
import { apiRoutes } from './routes/apiRoutes';
import { pagesRoutes } from './routes/pagesRoutes';
import { errorHandler } from './handler/error.handler';
import { registerStaticMiddlewares } from './middleware/static.middleware';
import { sessionMiddleware } from './middleware/auth.middleware';

const createServer = () => {
  const app = new Hono();
  app.use(logger());

  // Cors is not an issue anymore, as there's no seperate client.
  // app.use(
  //   cors({
  //     origin: ['http://localhost:8000'],
  //     allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  //     credentials: true,
  //   })
  // );
  app.use(csrf());
  connectDB();

  // All the routes registerd under here will be public and accessible
  // to everyone, without needing of a authorization token.
  registerStaticMiddlewares(app);

  // Error handler to catch errors thrown by API Handlers.
  app.onError(errorHandler);

  // Middleware that'll add the current session data in context.
  app.use(sessionMiddleware);

  // All routes registered under here will be Pages routes.
  app.route('/', pagesRoutes);

  // All routes registered under here will be API routes,
  // which might return html or json.
  app.route('/api/v1', apiRoutes);

  return app;
};

export default createServer;
