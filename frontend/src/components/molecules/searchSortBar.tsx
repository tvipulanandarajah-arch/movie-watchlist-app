import React from "react";
import {
  SEARCH_SORT_OPTIONS,
  type SearchSortOption,
} from "../../constants/appConfig";

interface SearchSortBarProps {
  currentSort: SearchSortOption;
  onSortChange: (sort: SearchSortOption) => void;
  totalCount: number;
}

const SearchSortBar: React.FC<SearchSortBarProps> = ({
  currentSort,
  onSortChange,
  totalCount,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      {/* Result Count */}
      <p className="text-gray-400 text-sm">
        {totalCount} {totalCount === 1 ? "result" : "results"} found
      </p>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <label className="text-gray-400 text-sm">Sort by:</label>

        {/* Sort Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onSortChange(SEARCH_SORT_OPTIONS.DEFAULT)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentSort === SEARCH_SORT_OPTIONS.DEFAULT
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
          >
            Default
          </button>

          <button
            onClick={() => onSortChange(SEARCH_SORT_OPTIONS.YEAR_NEW)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentSort === SEARCH_SORT_OPTIONS.YEAR_NEW
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
          >
            Newest Release
          </button>

          <button
            onClick={() => onSortChange(SEARCH_SORT_OPTIONS.YEAR_OLD)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentSort === SEARCH_SORT_OPTIONS.YEAR_OLD
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
          >
            Oldest Release
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;