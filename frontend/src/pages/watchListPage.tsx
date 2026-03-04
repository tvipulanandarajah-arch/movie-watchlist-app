import React, { useState } from "react";
import type { Movie } from "../types/movie";
import MovieList from "../components/organisms/movieList";

interface WatchlistPageProps {
  movies: Movie[];
  allMovies: Movie[];  // ← ADD THIS: full movie list including watched ones
  onRate: (movieId: string, rating: number) => void;
  onToggleWatched: (movieId: string) => void;
  onRemove: (movieId: string) => void;
}

const WatchlistPage: React.FC<WatchlistPageProps> = ({
  movies,
  allMovies,         // ← ADD THIS
  onRate,
  onToggleWatched,
  onRemove,
}) => {
  // Track movies that became watched in this session (by toggle OR by rating)
  const [justWatched, setJustWatched] = useState<Movie[]>([]);

  // Helper: add a movie to justWatched if not already there
  const addToJustWatched = (movie: Movie) => {
    setJustWatched((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        // Update the existing entry (e.g., rating changed)
        return prev.map((m) =>
          m.id === movie.id ? { ...movie, watched: true } : m
        );
      }
      return [...prev, { ...movie, watched: true }];
    });
  };

  // Handle Toggle Watched
  const handleToggleWatched = (movieId: string) => {
    const inJustWatched = justWatched.find((m) => m.id === movieId);

    if (inJustWatched) {
      // Unmark: remove from justWatched
      setJustWatched((prev) => prev.filter((m) => m.id !== movieId));
      onToggleWatched(movieId);
    } else {
      // Mark as watched: add to justWatched
      const movie = movies.find((m) => m.id === movieId);
      if (movie) {
        addToJustWatched(movie);
        onToggleWatched(movieId);
      }
    }
  };

  // Handle Rating - ← NEW HANDLER
  const handleRate = (movieId: string, rating: number) => {
    
  // ← KEY FIX: Capture movie BEFORE calling onRate
  // because onRate triggers re-render and removes it from movies prop
  const movie =
    movies.find((m) => m.id === movieId) ||        // check unwatched list
    justWatched.find((m) => m.id === movieId) ||   // check justWatched
    allMovies.find((m) => m.id === movieId);        // ← FALLBACK: full list


    // Call parent to update persistent state
    onRate(movieId, rating);

    if (rating > 0) {
      if (movie) {
        addToJustWatched({ ...movie, rating, watched: true });
      }
    } else {
      // Rating cleared: remove from justWatched so it goes back to unwatched
      setJustWatched((prev) => prev.filter((m) => m.id !== movieId));
    }
  };

  // Compose the display list:
  // 1. Unwatched movies (not in justWatched)
  // 2. Just watched this session (shown as watched at bottom)
  const displayMovies = [
    ...movies.filter((m) => !justWatched.some((j) => j.id === m.id)),
    ...justWatched,
  ];

  const getSubtitleText = (): string => {
    const unwatchedCount = movies.filter(
      (m) => !justWatched.some((j) => j.id === m.id)
    ).length;

    if (displayMovies.length === 0) {
      return "Your watchlist is empty. Search for movies to add!";
    }
    const movieWord = unwatchedCount === 1 ? "movie" : "movies";
    return `You have ${unwatchedCount} ${movieWord} to watch`;
  };

  return (
    <section>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">My Watchlist</h2>
        <p className="text-gray-400">{getSubtitleText()}</p>
      </div>
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <MovieList
          movies={displayMovies}
          emptyMessage="No movies to watch. Add some from the search page!"
          onRate={handleRate}               // ← CHANGED: use local handler
          onToggleWatched={handleToggleWatched}
          onRemove={onRemove}
          isWatchlist={true}
        />
      </div>
    </section>
  );
};

export default WatchlistPage;