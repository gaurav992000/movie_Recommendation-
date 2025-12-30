import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function registerHealthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });
}