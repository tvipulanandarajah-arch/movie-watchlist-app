export const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

export const API_MESSAGES = {
  loading: "Fetching movies...",
  noResults: "No movies found.",
  error: "Something went wrong while fetching movies.",
};