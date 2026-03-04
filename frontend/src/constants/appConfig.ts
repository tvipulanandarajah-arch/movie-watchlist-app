export const FILTER_OPTIONS = {
  ALL: "all",
  WATCHED: "watched",
  UNWATCHED: "unwatched",
} as const;

export type FilterType =
  (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS];

// ...existing code...

// Diary Rating Filter Options
export const DIARY_RATING_OPTIONS = {
  ALL: "all",
  RATED: "rated",
  UNRATED: "unrated",
  FIVE_STARS: "5",
  FOUR_STARS: "4",
  THREE_STARS: "3",
  TWO_STARS: "2",
  ONE_STAR: "1",
} as const;

export type DiaryRatingFilter = typeof DIARY_RATING_OPTIONS[keyof typeof DIARY_RATING_OPTIONS];

// Diary Sort Options
export const DIARY_SORT_OPTIONS = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  HIGHEST_RATED: "highest",    // ← ADD THIS
  LOWEST_RATED: "lowest",      // ← ADD THIS
  YEAR_NEW: "year_new",
  YEAR_OLD: "year_old",
} as const;

export type DiarySortOption = typeof DIARY_SORT_OPTIONS[keyof typeof DIARY_SORT_OPTIONS];

// ← ADD THESE: Search Sort Options
export const SEARCH_SORT_OPTIONS = {
  DEFAULT: "default",
  YEAR_NEW: "year_new",
  YEAR_OLD: "year_old",
} as const;

export type SearchSortOption = typeof SEARCH_SORT_OPTIONS[keyof typeof SEARCH_SORT_OPTIONS];

export const DEFAULT_RATING = 0;

export const STORAGE_KEY = "movie-tracker-app";