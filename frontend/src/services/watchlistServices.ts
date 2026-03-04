import { API_ENDPOINTS } from "../constants/api";
import { getAuthHeaders } from "./authService";
import type { Movie } from "../types/movie";

// ← Add this local interface to replace `any`
interface BackendMovie {
  _id: string;
  imdbID: string;
  title: string;
  poster: string;
  rating: number;
  watched: boolean;
  year: string;
  type: string;
  watchedDate?: string;
}

// GET all movies for logged-in user
export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch(API_ENDPOINTS.MOVIES, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch movies");
  }

  // Map backend _id to id for compatibility
  return data.data.map((movie: BackendMovie) => ({
    ...movie,
    id: movie.imdbID,
    _id: movie._id,
    watchedDate: movie.watchedDate || undefined,
  }));
}

// POST - add movie to watchlist
export async function addMovieToWatchlist(movie: Movie): Promise<Movie> {
  const response = await fetch(API_ENDPOINTS.MOVIES, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: movie.title,
      poster: movie.poster,
      imdbID: movie.id,
      year: movie.year,
      type: movie.type,
      rating: 0,
      watched: false,
      watchedDate: null,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add movie");
  }

  return { ...data.data, id: data.data.imdbID, _id: data.data._id };
}

// PUT - update movie (rating, watched, watchedDate)
export async function updateMovie(
  mongoId: string,
  updates: Partial<Movie>
): Promise<Movie> {
  const response = await fetch(API_ENDPOINTS.MOVIE_BY_ID(mongoId), {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update movie");
  }

  return { ...data.data, id: data.data.imdbID, _id: data.data._id };
}

// DELETE - remove movie from watchlist
export async function deleteMovie(mongoId: string): Promise<void> {
  const response = await fetch(API_ENDPOINTS.MOVIE_BY_ID(mongoId), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete movie");
  }
}