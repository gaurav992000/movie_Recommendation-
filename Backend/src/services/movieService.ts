import genAI from '../config/gemini.js';
import pool from '../config/database.js';
import type { Movie } from '../types/index.js';

export async function generateMovieRecommendations(preference: string): Promise<Movie[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    
    const prompt = `You are a movie recommendation expert. Generate 3-5 movie recommendations based on user preferences. Return response as valid JSON array with objects containing: id (number), title (string), genre (string), description (string), rating (number 1-10).

Please recommend movies for someone who likes: ${preference}. Return as JSON array only, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    
    const cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const movies: Movie[] = JSON.parse(cleanText);
    return movies;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw new Error('Failed to generate movie recommendations');
  }
}

export async function saveRecommendation(userInput: string, movies: Movie[]): Promise<void> {
  try {
    const query = `
      INSERT INTO recommendations (user_input, recommended_movies)
      VALUES ($1, $2)
      RETURNING id
    `;
    await pool.query(query, [userInput, JSON.stringify(movies)]);
  } catch (error) {
    console.error('Error saving recommendation:', error);
    throw new Error('Failed to save recommendation to database');
  }
}

export async function getAllRecommendations(): Promise<any[]> {
  try {
    const query = `
      SELECT id, user_input, recommended_movies, timestamp
      FROM recommendations
      ORDER BY timestamp DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw new Error('Failed to fetch recommendations');
  }
}

export async function getRecommendationById(id: number): Promise<any> {
  try {
    const query = `
      SELECT id, user_input, recommended_movies, timestamp
      FROM recommendations
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    throw new Error('Failed to fetch recommendation');
  }
}