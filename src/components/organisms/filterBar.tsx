import React from "react";
import { FILTER_OPTIONS, type FilterType } from "../../constants/appConfig";

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  watchlistCount: {
    all: number;
    watched: number;
    unwatched: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  watchlistCount,
}) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: FILTER_OPTIONS.ALL, label: "All", count: watchlistCount.all },
    { key: FILTER_OPTIONS.WATCHED, label: "Watched", count: watchlistCount.watched },
    { key: FILTER_OPTIONS.UNWATCHED, label: "Unwatched", count: watchlistCount.unwatched },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.key;

        const buttonStyles = isActive
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300";

        const countStyles = isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-300 text-gray-600";

        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${buttonStyles}`}
          >
            {filter.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${countStyles}`}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;