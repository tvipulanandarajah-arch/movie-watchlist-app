import React from "react";
import type { Movie } from "../types/movie";
import { useDiaryFilter } from "../hooks/useDiaryFilter";
import DiaryFilterBar from "../components/organisms/diaryFilterBar";
import DiaryList from "../components/organisms/diaryList";

interface DiaryPageProps {
  watchedMovies: Movie[];
  onRate: (movieId: string, rating: number) => void;
  onDelete: (movieId: string) => void;
}

const DiaryPage: React.FC<DiaryPageProps> = ({ watchedMovies, onRate, onDelete }) => {
  const {
    ratingFilter,
    setRatingFilter,
    sortOrder,
    setSortOrder,
    groupedEntries,
    flatEntries,
    isRatingSort,
    totalCount,
  } = useDiaryFilter(watchedMovies);

  // Dynamic subtitle
  const getSubtitleText = (): string => {
    if (watchedMovies.length === 0) {
      return "Start watching movies to build your diary!";
    }
    const movieWord = watchedMovies.length === 1 ? "movie" : "movies";
    return `You've watched ${watchedMovies.length} ${movieWord}`;
  };

  return (
    <section>
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">My Movie Diary</h2>
        <p className="text-gray-400">{getSubtitleText()}</p>
      </div>

      {/* Filter Bar - only show if there are entries */}
      {watchedMovies.length > 0 && (
        <DiaryFilterBar
          currentRatingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          currentSortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          totalCount={totalCount}
        />
      )}

      {/* Diary List */}
      <DiaryList
        groupedEntries={groupedEntries}
        flatEntries={flatEntries}
        isRatingSort={isRatingSort}
        onRate={onRate}
        onDelete={onDelete}
      />
    </section>
  );
};

export default DiaryPage;