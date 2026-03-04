import axios from "axios";
export const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

// ← ADD THIS: Backend API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const API_MESSAGES = {
  loading: "Fetching movies...",
  noResults: "No movies found.",
  error: "Something went wrong while fetching movies.",
};

// Create a reusable axios instance pointing to our backend
export const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ← ADD: API Endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  // Movies
  MOVIES: `${API_BASE_URL}/movies`,
  MOVIE_BY_ID: (id: string) => `${API_BASE_URL}/movies/${id}`,
};