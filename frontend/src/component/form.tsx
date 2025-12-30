import { useState } from 'react';

interface Movie {
  id: string | number;
  title: string;
  genre: string;
  description: string;
  rating?: number;
}



export default function Formmovie() {
  const [preference, setPreference] = useState('');
 const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!preference.trim()) return;

    setLoading(true);
    setError('');
    
    try {
       const apiUrl = import.meta.env.VITE_API_URL || '/api/movies/recommend';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preference }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setMovies(data.movies || []);
    } catch (err) {
        //@ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="mb-8">
          <label className="block text-lg font-semibold mb-2">
            Describe your movie preference
          </label>
          <textarea
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            placeholder="e.g., action movies with a strong female lead"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Get Recommendations'}
          </button>
        </form>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{movie.genre}</p>
              <p className="text-gray-700">{movie.description}</p>
              {movie.rating && <p className="text-yellow-500 mt-2"> {movie.rating}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
