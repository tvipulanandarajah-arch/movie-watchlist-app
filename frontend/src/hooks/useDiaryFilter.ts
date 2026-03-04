import { useState, useMemo } from "react";
import type { Movie } from "../types/movie";
import {
  DIARY_RATING_OPTIONS,
  DIARY_SORT_OPTIONS,
  type DiaryRatingFilter,
  type DiarySortOption,
} from "../constants/appConfig";

export interface DiaryGroup {
  monthYear: string;
  monthKey: string;
  entries: Movie[];
}

interface UseDiaryFilterReturn {
  ratingFilter: DiaryRatingFilter;
  setRatingFilter: (filter: DiaryRatingFilter) => void;
  sortOrder: DiarySortOption;
  setSortOrder: (sort: DiarySortOption) => void;
  groupedEntries: DiaryGroup[];
  flatEntries: Movie[];
  isRatingSort: boolean;
  totalCount: number;
}

export function useDiaryFilter(watchedMovies: Movie[]): UseDiaryFilterReturn {
  const [ratingFilter, setRatingFilter] = useState<DiaryRatingFilter>(
    DIARY_RATING_OPTIONS.ALL
  );
  const [sortOrder, setSortOrder] = useState<DiarySortOption>(
    DIARY_SORT_OPTIONS.NEWEST_FIRST
  );

  const isRatingSort =
    sortOrder === DIARY_SORT_OPTIONS.HIGHEST_RATED ||
    sortOrder === DIARY_SORT_OPTIONS.LOWEST_RATED ||
    sortOrder === DIARY_SORT_OPTIONS.YEAR_NEW ||
    sortOrder === DIARY_SORT_OPTIONS.YEAR_OLD;

  // Filter movies by rating
  const filteredMovies = useMemo(() => {
    return watchedMovies.filter((movie) => {
      switch (ratingFilter) {
        case DIARY_RATING_OPTIONS.RATED:
          return movie.rating > 0;
        case DIARY_RATING_OPTIONS.UNRATED:
          return movie.rating === 0;
        case DIARY_RATING_OPTIONS.FIVE_STARS:
          return movie.rating === 5;
        case DIARY_RATING_OPTIONS.FOUR_STARS:
          return movie.rating === 4;
        case DIARY_RATING_OPTIONS.THREE_STARS:
          return movie.rating === 3;
        case DIARY_RATING_OPTIONS.TWO_STARS:
          return movie.rating === 2;
        case DIARY_RATING_OPTIONS.ONE_STAR:
          return movie.rating === 1;
        case DIARY_RATING_OPTIONS.ALL:
        default:
          return true;
      }
    });
  }, [watchedMovies, ratingFilter]);

  // Sort movies
  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      const dateA = a.watchedDate || "";
      const dateB = b.watchedDate || "";

      switch (sortOrder) {
        case DIARY_SORT_OPTIONS.NEWEST_FIRST:
          if (dateB !== dateA) return dateB.localeCompare(dateA);
          return a.title.localeCompare(b.title);

        case DIARY_SORT_OPTIONS.OLDEST_FIRST:
          if (dateA !== dateB) return dateA.localeCompare(dateB);
          return a.title.localeCompare(b.title);

        case DIARY_SORT_OPTIONS.HIGHEST_RATED:
          if (b.rating !== a.rating) return b.rating - a.rating;
          return dateB.localeCompare(dateA);

        case DIARY_SORT_OPTIONS.LOWEST_RATED:
          if (a.rating !== b.rating) return a.rating - b.rating;
          return dateB.localeCompare(dateA);

        case DIARY_SORT_OPTIONS.YEAR_NEW: {
          const yearNewA = parseInt(a.year) || 0;
          const yearNewB = parseInt(b.year) || 0;
          if (yearNewB !== yearNewA) return yearNewB - yearNewA;
          return a.title.localeCompare(b.title);
        }

        case DIARY_SORT_OPTIONS.YEAR_OLD: {
          const yearOldA = parseInt(a.year) || 0;
          const yearOldB = parseInt(b.year) || 0;
          if (yearOldA !== yearOldB) return yearOldA - yearOldB;
          return a.title.localeCompare(b.title);
        }

        default:
          return dateB.localeCompare(dateA);
      }
    });
  }, [filteredMovies, sortOrder]);

  // ← SINGLE flatEntries declaration (removed duplicate)
  const flatEntries = useMemo(() => {
    if (!isRatingSort) {
      return sortedMovies;
    }
    return sortedMovies.map((movie, index) => ({
      ...movie,
      rank: index + 1,
    }));
  }, [sortedMovies, isRatingSort]);

  // Group movies by month/year (only for date-based sorts)
  const groupedEntries = useMemo(() => {
    if (isRatingSort) {
      return [];
    }

    const groups: Map<string, Movie[]> = new Map();

    sortedMovies.forEach((movie) => {
      if (!movie.watchedDate) return;

      const date = new Date(movie.watchedDate + "T00:00:00");
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!groups.has(monthKey)) {
        groups.set(monthKey, []);
      }
      groups.get(monthKey)!.push(movie);
    });

    const groupArray: DiaryGroup[] = Array.from(groups.entries()).map(
      ([monthKey, entries]) => {
        const date = new Date(monthKey + "-01T00:00:00");
        const monthYear = date
          .toLocaleDateString("en-US", { month: "short", year: "numeric" })
          .toUpperCase();

        return { monthKey, monthYear, entries };
      }
    );

    groupArray.sort((a, b) => {
      if (sortOrder === DIARY_SORT_OPTIONS.OLDEST_FIRST) {
        return a.monthKey.localeCompare(b.monthKey);
      }
      return b.monthKey.localeCompare(a.monthKey);
    });

    return groupArray;
  }, [sortedMovies, sortOrder, isRatingSort]);

  return {
    ratingFilter,
    setRatingFilter,
    sortOrder,
    setSortOrder,
    groupedEntries,
    flatEntries,
    isRatingSort,
    totalCount: filteredMovies.length,
  };
}