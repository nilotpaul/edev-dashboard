import { Hono } from 'hono';
import { assetsCacheMiddleware } from '../middleware/cache.middleware';
import { serveStatic } from '@hono/node-server/serve-static';

export const registerStaticMiddlewares = (app: Hono<any, any, any>) => {
  // static assets
  app.use(
    '/public/*',
    serveStatic({
      root: './',
      onNotFound: (path) => {
        console.error('No assets found with', path);
      },
    })
  );
  app.use('/favicon.ico', assetsCacheMiddleware, serveStatic({ path: './public/favicon.ico' }));

  // scripts
  app.use(
    '/scripts/custom/*',
    assetsCacheMiddleware,
    serveStatic({
      root: './',
      onNotFound: (path) => {
        console.error('No scripts found with', path);
      },
    })
  );
};
