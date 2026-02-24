import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { Movie } from "./types/movie";
import { useWatchlist } from "./hooks/useWatchlist";
import WatchlistLayout from "./components/templates/watchListLayout";
import SearchPage from "./pages/searchPage";
import WatchlistPage from "./pages/watchListPage";

const App: React.FC = () => {
  const {
    movies,
    watchlistIds,
    addMovie,
    removeMovie,
    rateMovie,
    toggleWatched,
  } = useWatchlist();

  const handleAddToWatchlist = (movie: Movie): void => {
    addMovie(movie);
  };

  const handleRateMovie = (movieId: string, rating: number): void => {
    rateMovie(movieId, rating);
  };

  const handleToggleWatched = (movieId: string): void => {
    toggleWatched(movieId);
  };

  const handleRemoveMovie = (movieId: string): void => {
    removeMovie(movieId);
  };

  return (
    <BrowserRouter>
      <WatchlistLayout>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                onAddToWatchlist={handleAddToWatchlist}
                watchlistIds={watchlistIds}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchlistPage
                movies={movies}
                onRate={handleRateMovie}
                onToggleWatched={handleToggleWatched}
                onRemove={handleRemoveMovie}
              />
            }
          />
        </Routes>
      </WatchlistLayout>
    </BrowserRouter>
  );
};

export default App;