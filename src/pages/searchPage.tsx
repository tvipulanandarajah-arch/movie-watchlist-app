import React from "react";
import type { Movie } from "../types/movie";
import { useMovieSearch } from "../hooks/useMovieSearch";
import SearchBar from "../components/molecules/searchBar";
import MovieList from "../components/organisms/movieList";

interface SearchPageProps {
  onAddToWatchlist: (movie: Movie) => void;
  watchlistIds: string[];
}

const SearchPage: React.FC<SearchPageProps> = ({
  onAddToWatchlist,
  watchlistIds,
}) => {
  const {
    searchResults,
    loading,
    error,
    hasSearched,
    searchMovies,
  } = useMovieSearch();

  return (
    <section>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Search Movies</h2>
        <p className="text-gray-400">Find movies and add them to your watchlist</p>
      </div>

      <div className="flex justify-center mb-8">
        <SearchBar onSearch={searchMovies} isLoading={loading} />
      </div>

      {hasSearched && (
        <div className="bg-gray-800/50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Search Results</h3>
          <MovieList
            movies={searchResults}
            isLoading={loading}
            error={error}
            emptyMessage="No movies found. Try a different search term."
            onAdd={onAddToWatchlist}
            watchlistIds={watchlistIds}
          />
        </div>
      )}
    </section>
  );
};

export default SearchPage;