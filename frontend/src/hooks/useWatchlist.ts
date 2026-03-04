import { useState, useEffect, useCallback } from "react";
import type { Movie } from "../types/movie";
import {
  fetchMovies,
  addMovieToWatchlist,
  updateMovie,
  deleteMovie,
} from "../services/watchlistServices";
import { getToken } from "../services/authService";

interface UseWatchlistReturn {
  movies: Movie[];
  watchlistIds: string[];
  watchedMovies: Movie[];
  unwatchedMovies: Movie[];
  isLoading: boolean;
  error: string | null;
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: string) => void;
  rateMovie: (movieId: string, rating: number) => void;
  toggleWatched: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  getWatchedCount: () => number;
  getUnwatchedCount: () => number;
}

export function useWatchlist(): UseWatchlistReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Derived state
  const watchlistIds = movies.map((movie) => movie.id);
  const watchedMovies = movies.filter((movie) => movie.watched);
  const unwatchedMovies = movies.filter((movie) => !movie.watched);

  // ← FETCH movies from backend on mount
  const loadMovies = useCallback(async () => {
    const token = getToken();
    if (!token) return; // not logged in

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMovies();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load movies");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // ← ADD movie via API
  const addMovie = async (movie: Movie): Promise<void> => {
    const exists = movies.some((m) => m.id === movie.id);
    if (exists) return;

    try {
      const newMovie = await addMovieToWatchlist(movie);
      setMovies((prev) => [...prev, newMovie]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add movie");
    }
  };

  // ← REMOVE movie via API
  const removeMovie = async (movieId: string): Promise<void> => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie?._id) return;

    try {
      await deleteMovie(movie._id);
      setMovies((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove movie");
    }
  };

  // ← RATE movie via API
  const rateMovie = async (movieId: string, rating: number): Promise<void> => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie?._id) return;

    const newWatchedStatus = rating > 0 ? true : movie.watched;
    const newWatchedDate =
      rating > 0 && !movie.watched
        ? new Date().toISOString().split("T")[0]
        : movie.watchedDate;

    try {
      const updated = await updateMovie(movie._id, {
        rating,
        watched: newWatchedStatus,
        watchedDate: newWatchedDate,
      });

      setMovies((prev) =>
        prev.map((m) => (m.id === movieId ? { ...m, ...updated } : m))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rate movie");
    }
  };

  // ← TOGGLE watched via API
  const toggleWatched = async (movieId: string): Promise<void> => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie?._id) return;

    const newWatchedStatus = !movie.watched;
    const newWatchedDate = newWatchedStatus
      ? new Date().toISOString().split("T")[0]
      : undefined;
    const newRating = newWatchedStatus ? movie.rating : 0;

    try {
      const updated = await updateMovie(movie._id, {
        watched: newWatchedStatus,
        watchedDate: newWatchedDate,
        rating: newRating,
      });

      setMovies((prev) =>
        prev.map((m) => (m.id === movieId ? { ...m, ...updated } : m))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update watched status"
      );
    }
  };

  const isInWatchlist = (movieId: string): boolean =>
    watchlistIds.includes(movieId);

  const getWatchedCount = (): number => watchedMovies.length;
  const getUnwatchedCount = (): number => unwatchedMovies.length;

  return {
    movies,
    watchlistIds,
    watchedMovies,
    unwatchedMovies,
    isLoading,
    error,
    addMovie,
    removeMovie,
    rateMovie,
    toggleWatched,
    isInWatchlist,
    getWatchedCount,
    getUnwatchedCount,
  };
}