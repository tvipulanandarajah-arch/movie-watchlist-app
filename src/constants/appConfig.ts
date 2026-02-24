export const FILTER_OPTIONS = {
  ALL: "all",
  WATCHED: "watched",
  UNWATCHED: "unwatched",
} as const;

export type FilterType =
  (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS];

export const DEFAULT_RATING = 0;

export const STORAGE_KEY = "movie-tracker-app";