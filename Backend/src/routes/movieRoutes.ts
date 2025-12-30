import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type { MovieRecommendationRequest, MovieRecommendationResponse } from '../types/index.js';
import { generateMovieRecommendations, saveRecommendation, getAllRecommendations } from '../services/movieService.js';

export async function registerMovieRoutes(fastify: FastifyInstance) {
 
  fastify.post<{ Body: MovieRecommendationRequest }>(
    '/api/movies/recommend',
    async (request: FastifyRequest<{ Body: MovieRecommendationRequest }>, reply: FastifyReply) => {
      try {
        const { preference } = request.body;

        if (!preference || preference.trim() === '') {
          return reply.status(400).send({
            success: false,
            movies: [],
            message: 'Preference is required',
          } as MovieRecommendationResponse);
        }

        
        const movies = await generateMovieRecommendations(preference);

        
        await saveRecommendation(preference, movies);

        return reply.status(200).send({
          success: true,
          movies,
        } as MovieRecommendationResponse);
      } catch (error: any) {
        console.error('Error:', error);
        return reply.status(500).send({
          success: false,
          movies: [],
          message: error.message || 'Failed to generate recommendations',
        } as MovieRecommendationResponse);
      }
    }
  );

 
  fastify.get('/api/recommendations', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const recommendations = await getAllRecommendations();
      return reply.status(200).send({
        success: true,
        data: recommendations,
      });
    } catch (error: any) {
      console.error('Error:', error);
      return reply.status(500).send({
        success: false,
        message: error.message || 'Failed to fetch recommendations',
      });
    }
  });
}