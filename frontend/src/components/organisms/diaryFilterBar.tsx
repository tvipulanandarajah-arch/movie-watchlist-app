import React from "react";
import {
  DIARY_RATING_OPTIONS,
  DIARY_SORT_OPTIONS,
  type DiaryRatingFilter,
  type DiarySortOption,
} from "../../constants/appConfig";

interface DiaryFilterBarProps {
  currentRatingFilter: DiaryRatingFilter;
  onRatingFilterChange: (filter: DiaryRatingFilter) => void;
  currentSortOrder: DiarySortOption;
  onSortOrderChange: (sort: DiarySortOption) => void;
  totalCount: number;
}

const DiaryFilterBar: React.FC<DiaryFilterBarProps> = ({
  currentRatingFilter,
  onRatingFilterChange,
  currentSortOrder,
  onSortOrderChange,
  totalCount,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-800/50 rounded-xl">
      {/* Left side - Filters */}
      <div className="flex items-center gap-4">
        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Rating:</label>
          <select
            value={currentRatingFilter}
            onChange={(e) =>
              onRatingFilterChange(e.target.value as DiaryRatingFilter)
            }
            className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-green-500"
          >
            <option value={DIARY_RATING_OPTIONS.ALL}>All Ratings</option>
            <option value={DIARY_RATING_OPTIONS.RATED}>Rated</option>
            <option value={DIARY_RATING_OPTIONS.UNRATED}>Unrated</option>
            <option value={DIARY_RATING_OPTIONS.FIVE_STARS}>★★★★★ (5)</option>
            <option value={DIARY_RATING_OPTIONS.FOUR_STARS}>★★★★ (4)</option>
            <option value={DIARY_RATING_OPTIONS.THREE_STARS}>★★★ (3)</option>
            <option value={DIARY_RATING_OPTIONS.TWO_STARS}>★★ (2)</option>
            <option value={DIARY_RATING_OPTIONS.ONE_STAR}>★ (1)</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-sm">Sort:</label>
          <select
            value={currentSortOrder}
            onChange={(e) =>
              onSortOrderChange(e.target.value as DiarySortOption)
            }
            className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-green-500"
          >
            <option value={DIARY_SORT_OPTIONS.NEWEST_FIRST}>
              Newest First
            </option>
            <option value={DIARY_SORT_OPTIONS.OLDEST_FIRST}>
              Oldest First
            </option>
            <option value={DIARY_SORT_OPTIONS.HIGHEST_RATED}>
              Highest Rated
            </option>
            <option value={DIARY_SORT_OPTIONS.LOWEST_RATED}>
              Lowest Rated
            </option>

            <option value={DIARY_SORT_OPTIONS.YEAR_NEW}>
              Newest Release
            </option>   {/* ← ADD */}
            <option value={DIARY_SORT_OPTIONS.YEAR_OLD}>
              Oldest Release
            </option>   {/* ← ADD */}
          </select>
        </div>
      </div>

      {/* Right side - Count */}
      <div className="text-gray-400 text-sm">
        {totalCount} {totalCount === 1 ? "entry" : "entries"}
      </div>
    </div>
  );
};

export default DiaryFilterBar;