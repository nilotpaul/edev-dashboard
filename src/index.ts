import { env } from './validations/env';
import createServer from './server';
import { serve } from '@hono/node-server';

async function server() {
  const server = createServer();
  const PORT = Number(env.PORT);

  try {
    serve({
      fetch: server.fetch,
      port: PORT,
    });

    console.log(`Server is running http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error starting server', err);
    process.exit(1);
  }
}

server();
