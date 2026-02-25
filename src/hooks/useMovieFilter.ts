// Custom hook to manage movie filtering logic based on watch status
import { useState, useMemo } from "react";
import type { Movie } from "../types/movie";
import { type FilterType, FILTER_OPTIONS } from "../constants/appConfig";

interface WatchlistCount {
  all: number;
  watched: number;
  unwatched: number;
}

interface UseMovieFilterReturn {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  filteredMovies: Movie[];
  watchlistCount: WatchlistCount;
}

export function useMovieFilter(movies: Movie[]): UseMovieFilterReturn {
  const [filter, setFilter] = useState<FilterType>(FILTER_OPTIONS.ALL);

  const filteredMovies = useMemo(() => {
    switch (filter) {
      case FILTER_OPTIONS.WATCHED:
        return movies.filter((movie) => movie.watched);
      case FILTER_OPTIONS.UNWATCHED:
        return movies.filter((movie) => !movie.watched);
      case FILTER_OPTIONS.ALL:
      default:
        return movies;
    }
  }, [movies, filter]);

  const watchlistCount = useMemo((): WatchlistCount => {
    return {
      all: movies.length,
      watched: movies.filter((movie) => movie.watched).length,
      unwatched: movies.filter((movie) => !movie.watched).length,
    };
  }, [movies]);

  return {
    filter,
    setFilter,
    filteredMovies,
    watchlistCount,
  };
}