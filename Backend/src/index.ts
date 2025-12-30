import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { registerMovieRoutes } from './routes/movieRoutes.js';
import { registerHealthRoutes } from './routes/healthRoutes.js';

export async function createServer() {
  const fastify = Fastify({ logger: true });


  await fastify.register(fastifyCors, {
    origin: '*',
    credentials: true,
  });

 
  await registerMovieRoutes(fastify);
  await registerHealthRoutes(fastify);

  return fastify;
}

export async function startServer() {
  const fastify = await createServer();

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
startServer();