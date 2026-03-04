import React from "react";
import type { Movie } from "../types/movie";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { useSearchSort } from "../hooks/useSearchSort";
import SearchBar from "../components/molecules/searchBar";
import SearchSortBar from "../components/molecules/searchSortBar";
import MovieList from "../components/organisms/movieList";

interface SearchPageProps {
  onAddToWatchlist: (movie: Movie) => void;
  watchlistIds: string[];
  watchedIds: string[];  // ← ADD THIS: to track watched movies for better UI feedback
}

const SearchPage: React.FC<SearchPageProps> = ({
  onAddToWatchlist,
  watchlistIds,
  watchedIds,
}) => {
  const {
    searchResults,
    loading,
    error,
    searchMovies,
  } = useMovieSearch();

  const {
    sortOrder,
    setSortOrder,
    sortedResults,
  } = useSearchSort(searchResults);

  return (
    <section>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Search Movies</h2>
        <p className="text-gray-400">
          Find movies and add them to your watchlist
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={searchMovies} isLoading={loading} />

      {/* Sort Bar - only show after search results exist */}
      {searchResults.length > 0 && !loading && (   // ← ADD
        <SearchSortBar
          currentSort={sortOrder}
          onSortChange={setSortOrder}
          totalCount={sortedResults.length}
        />
      )}

      {/* Movie List */}
      <MovieList
        movies={sortedResults}        // ← CHANGED: was searchResults
        isLoading={loading}
        error={error}
        onAdd={onAddToWatchlist}
        watchlistIds={watchlistIds}
        watchedIds={watchedIds}
        emptyMessage="Search for a movie to get started!"
        isWatchlist={false}
      />
    </section>
  );
};

export default SearchPage;