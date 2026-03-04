import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { Movie } from "./types/movie";
import { useWatchlist } from "./hooks/useWatchlist";
import { AuthProvider, useAuth } from "./context/authContext";
import WatchlistLayout from "./components/templates/watchListLayout";
import ProtectedRoute from "./components/molecules/protectedRoute";
import SearchPage from "./pages/searchPage";
import WatchlistPage from "./pages/watchListPage";
import DiaryPage from "./pages/diaryPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";

// ← Separate inner component so useWatchlist runs inside AuthProvider
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const {
    movies,
    watchlistIds,
    watchedMovies,
    unwatchedMovies,
    addMovie,
    removeMovie,
    rateMovie,
    toggleWatched,
  } = useWatchlist();

  const watchedIds = watchedMovies.map((movie) => movie.id);

  const handleAddToWatchlist = (movie: Movie) => addMovie(movie);
  const handleRateMovie = (movieId: string, rating: number) => rateMovie(movieId, rating);
  const handleToggleWatched = (movieId: string) => toggleWatched(movieId);
  const handleRemoveMovie = (movieId: string) => removeMovie(movieId);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <WatchlistLayout>
              <SearchPage
                onAddToWatchlist={handleAddToWatchlist}
                watchlistIds={watchlistIds}
                watchedIds={watchedIds}
              />
            </WatchlistLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <WatchlistLayout>
              <WatchlistPage
                movies={unwatchedMovies}
                allMovies={movies}
                onRate={handleRateMovie}
                onToggleWatched={handleToggleWatched}
                onRemove={handleRemoveMovie}
              />
            </WatchlistLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/diary"
        element={
          <ProtectedRoute>
            <WatchlistLayout>
              <DiaryPage
                watchedMovies={watchedMovies}
                onRate={handleRateMovie}
                onDelete={handleRemoveMovie}
              />
            </WatchlistLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;