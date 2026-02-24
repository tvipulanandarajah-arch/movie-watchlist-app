import { useState } from "react";
import type { Movie } from "../types/movie";
import { searchMovies as searchMoviesApi } from "../services/movieService";

interface UseMovieSearchReturn {
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  searchMovies: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export function useMovieSearch(): UseMovieSearchReturn {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const searchMovies = async (query: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      await new Promise(resolve => setTimeout(resolve, 300));

      const results = await searchMoviesApi(query);
      setSearchResults(results);

      if (results.length === 0) {
        setError("No movies found. Try a different search term.");
      }
    } catch (err) {
      setError("Something went wrong while fetching movies. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = (): void => {
    setSearchResults([]);
    setError(null);
    setHasSearched(false);
  };

  return {
    searchResults,
    loading,
    error,
    hasSearched,
    searchMovies,
    clearSearch,
  };
}