export interface MovieRecommendationRequest {
  preference: string;
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  rating: number;
}

export interface MovieRecommendationResponse {
  success: boolean;
  movies: Movie[];
  message?: string;
}

export interface RecommendationRecord {
  id: number;
  user_input: string;
  recommended_movies: string;
  timestamp: string;
}
