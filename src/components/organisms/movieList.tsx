import React from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "../molecules/movieCard";

interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  onRate?: (movieId: string, rating: number) => void;
  onToggleWatched?: (movieId: string) => void;
  onRemove?: (movieId: string) => void;
  onAdd?: (movie: Movie) => void;
  isWatchlist?: boolean;
  watchlistIds?: string[];
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading = false,
  error = null,
  emptyMessage = "No movies found.",
  onRate,
  onToggleWatched,
  onRemove,
  onAdd,
  isWatchlist = false,
  watchlistIds = [],
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-gray-600 font-medium">Fetching movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <p className="text-red-600 font-medium text-lg">{error}</p>
      </div>
    );
  }


  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-gray-400 text-5xl mb-4">🎬</div>
        <p className="text-gray-500 font-medium text-lg">{emptyMessage}</p>
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => {
        const isInWatchlist = isWatchlist || watchlistIds.includes(movie.id);
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            isInWatchlist={isInWatchlist}
            onRate={onRate}
            onToggleWatched={onToggleWatched}
            onRemove={onRemove}
            onAdd={isInWatchlist ? undefined : onAdd}
          />
        );
      })}
    </div>
  );
};

export default MovieList;