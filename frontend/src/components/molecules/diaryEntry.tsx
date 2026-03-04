import React from "react";
import type { Movie } from "../../types/movie";

interface DiaryEntryProps {
  movie: Movie & { rank?: number };
  onDelete?: (movieId: string) => void;   // ← CHANGED: was onEdit
  isRatingSort: boolean;
}

const DiaryEntry: React.FC<DiaryEntryProps> = ({
  movie,
  onDelete,                               // ← CHANGED: was onEdit
  isRatingSort,
}) => {
  const watchedDate = movie.watchedDate
    ? new Date(movie.watchedDate + "T00:00:00")
    : null;
  const dayNumber = watchedDate ? watchedDate.getDate() : "--";

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= rating ? "text-yellow-400" : "text-gray-600"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      {/* Rank or Date Badge */}
      <div className="w-16 shrink-0 text-center">
        {isRatingSort && movie.rank !== undefined ? (
          <span className="text-2xl font-bold text-white">{movie.rank}</span>
        ) : (
          <span className="text-2xl font-bold text-white">{dayNumber}</span>
        )}
      </div>

      {/* Poster Thumbnail */}
      <div className="w-12 h-16 shrink-0 mr-4">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/48x64?text=?";
          }}
        />
      </div>

      {/* Movie Title */}
      <div className="flex-1 min-w-0 mr-4">
        <h3 className="text-white font-semibold text-lg truncate">
          {movie.title}
        </h3>
      </div>

      {/* Release Year */}
      <div className="w-16 text-center shrink-0 mr-4">
        <span className="text-gray-400 text-sm">{movie.year}</span>
      </div>

      {/* Star Rating */}
      <div className="w-32 shrink-0 mr-4">
        <div className="flex items-center gap-0.5">{renderStars(movie.rating)}</div>
      </div>

      {/* ← CHANGED: Replaced edit + more options with single delete button */}
      <div className="shrink-0">
        <button
          onClick={() => onDelete?.(movie.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
          title="Remove from diary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;