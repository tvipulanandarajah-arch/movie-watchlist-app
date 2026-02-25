// Custom hook to manage the user's movie watchlist, including adding/removing movies, rating, and tracking watched status, all persisted in localStorage
import type { Movie } from "../types/movie";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEY } from "../constants/appConfig";

interface UseWatchlistReturn {
  movies: Movie[];
  watchlistIds: string[];
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: string) => void;
  rateMovie: (movieId: string, rating: number) => void;
  toggleWatched: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  getWatchedCount: () => number;
  getUnwatchedCount: () => number;
}

export function useWatchlist(): UseWatchlistReturn {
  const [movies, setMovies] = useLocalStorage<Movie[]>(STORAGE_KEY, []);

  const watchlistIds = movies.map((movie) => movie.id);

  const addMovie = (movie: Movie): void => {
    const exists = movies.some((m) => m.id === movie.id);
    if (!exists) {
      const newMovie: Movie = {
        ...movie,
        rating: 0,
        watched: false,
      };
      setMovies((prev) => [...prev, newMovie]);
    }
  };

  const removeMovie = (movieId: string): void => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const rateMovie = (movieId: string, rating: number): void => {
  setMovies((prev) =>
    prev.map((movie) =>
      movie.id === movieId
        ? { ...movie, rating, watched: rating > 0 ? true : movie.watched }
        : movie
    )
  );
};

  const toggleWatched = (movieId: string): void => {
  setMovies((prev) =>
    prev.map((movie) =>
      movie.id === movieId
        ? {
            ...movie,
            watched: !movie.watched,
            rating: !movie.watched ? movie.rating : 0,
          }
        : movie
    )
  );
};

  const isInWatchlist = (movieId: string): boolean => {
    return watchlistIds.includes(movieId);
  };

  const getWatchedCount = (): number => {
    return movies.filter((movie) => movie.watched).length;
  };

  const getUnwatchedCount = (): number => {
    return movies.filter((movie) => !movie.watched).length;
  };

  return {
    movies,
    watchlistIds,
    addMovie,
    removeMovie,
    rateMovie,
    toggleWatched,
    isInWatchlist,
    getWatchedCount,
    getUnwatchedCount,
  };
}