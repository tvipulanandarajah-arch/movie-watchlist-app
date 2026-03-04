import React from "react";
import type { Movie } from "../../types/movie";
import type { DiaryGroup } from "../../hooks/useDiaryFilter";
import DiaryEntry from "../molecules/diaryEntry";

interface DiaryListProps {
  groupedEntries: DiaryGroup[];
  flatEntries: Movie[];
  isRatingSort: boolean;
  onRate: (movieId: string, rating: number) => void;
  onDelete?: (movieId: string) => void;   // ← CHANGED: was onEdit
  emptyMessage?: string;
}

const DiaryList: React.FC<DiaryListProps> = ({
  groupedEntries,
  flatEntries,
  isRatingSort,
  onDelete,                               // ← CHANGED: was onEdit
  emptyMessage = "No diary entries yet. Watch some movies!",
}) => {
  const isEmpty = isRatingSort
    ? flatEntries.length === 0
    : groupedEntries.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📔</div>
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  // Flat list for rating/year sorts
  if (isRatingSort) {
    return (
      <div className="bg-gray-800/30 rounded-xl overflow-hidden">
        {flatEntries.map((movie) => (
          <DiaryEntry
            key={movie.id}
            movie={movie}
            onDelete={onDelete}           // ← CHANGED: was onEdit
            isRatingSort={isRatingSort}
          />
        ))}
      </div>
    );
  }

  // Grouped by month
  return (
    <div className="space-y-8">
      {groupedEntries.map((group) => (
        <div key={group.monthKey}>
          {/* Month/Year Header */}
          <div className="flex items-center mb-4">
            <div className="bg-linear-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-bold tracking-wider">
                {group.monthYear}
              </span>
            </div>
            <div className="flex-1 h-px bg-gray-700 ml-4"></div>
          </div>

          {/* Entries */}
          <div className="bg-gray-800/30 rounded-xl overflow-hidden">
            {group.entries.map((movie) => (
              <DiaryEntry
                key={movie.id}
                movie={movie}
                onDelete={onDelete}       // ← CHANGED: was onEdit
                isRatingSort={isRatingSort}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;