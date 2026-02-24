import React from "react";
import type { Movie } from "../types/movie";
import { useMovieFilter } from "../hooks/useMovieFilter";
import FilterBar from "../components/organisms/filterBar";
import MovieList from "../components/organisms/movieList";

interface WatchlistPageProps {
  movies: Movie[];
  onRate: (movieId: string, rating: number) => void;
  onToggleWatched: (movieId: string) => void;
  onRemove: (movieId: string) => void;
}

const WatchlistPage: React.FC<WatchlistPageProps> = ({
  movies,
  onRate,
  onToggleWatched,
  onRemove,
}) => {
  const {
    filter,
    setFilter,
    filteredMovies,
    watchlistCount,
  } = useMovieFilter(movies);

  const getEmptyMessage = (): string => {
    if (filter === "all") {
      return "Cmon, add something to watch :(";
    }
    if (filter === "watched") {
      return "No watched movies yet.";
    }
    return "No unwatched movies. Time to add some!";
  };

  const getSubtitleText = (): string => {
    if (movies.length === 0) {
      return "Your watchlist is empty. Search for movies to add!";
    }
    const movieWord = movies.length === 1 ? "movie" : "movies";
    return `You have ${movies.length} ${movieWord} in your watchlist`;
  };

  return (
    <section>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">My Watchlist</h2>
        <p className="text-gray-400">{getSubtitleText()}</p>
      </div>

      {movies.length > 0 && (
        <div className="mb-6 space-y-4">
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            watchlistCount={watchlistCount}
          />
        </div>
      )}

      <div className="bg-gray-800/50 rounded-2xl p-6">
        <MovieList
          movies={filteredMovies}
          emptyMessage={getEmptyMessage()}
          onRate={onRate}
          onToggleWatched={onToggleWatched}
          onRemove={onRemove}
          isWatchlist={true}
        />
      </div>
    </section>
  );
};

export default WatchlistPage;