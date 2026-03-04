import type { Movie } from "../types/movie";
import { OMDB_BASE_URL, OMDB_API_KEY } from "../constants/api";

interface OMDbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface OMDbSearchResponse {
  Search?: OMDbMovie[];
  Response: string;
  Error?: string;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OMDbSearchResponse = await response.json();

    if (data.Response === "False") {
      console.error("API Error:", data.Error);
      return [];
    }

    if (!data.Search) {
      return [];
    }

    const movies: Movie[] = data.Search.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image",
      rating: 0,
      watched: false,
      type: movie.Type,
    }));

    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}