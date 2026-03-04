import { useState, useMemo } from "react";
import type { Movie } from "../types/movie";
import {
  SEARCH_SORT_OPTIONS,
  type SearchSortOption,
} from "../constants/appConfig";

interface UseSearchSortReturn {
  sortOrder: SearchSortOption;
  setSortOrder: (sort: SearchSortOption) => void;
  sortedResults: Movie[];
}

export function useSearchSort(movies: Movie[]): UseSearchSortReturn {
  const [sortOrder, setSortOrder] = useState<SearchSortOption>(
    SEARCH_SORT_OPTIONS.DEFAULT
  );

  const sortedResults = useMemo(() => {
    if (sortOrder === SEARCH_SORT_OPTIONS.DEFAULT) {
      return movies; // Keep original API order
    }

    return [...movies].sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;

      switch (sortOrder) {
        case SEARCH_SORT_OPTIONS.YEAR_NEW:
          // Newest release year first
          if (yearB !== yearA) return yearB - yearA;
          return a.title.localeCompare(b.title);

        case SEARCH_SORT_OPTIONS.YEAR_OLD:
          // Oldest release year first
          if (yearA !== yearB) return yearA - yearB;
          return a.title.localeCompare(b.title);

        default:
          return 0;
      }
    });
  }, [movies, sortOrder]);

  return {
    sortOrder,
    setSortOrder,
    sortedResults,
  };
}