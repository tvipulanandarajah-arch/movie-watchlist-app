import React, { useState } from "react";
import Input from "../atoms/input";
import Button from "../atoms/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (): void => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div
      className="flex gap-3 w-full max-w-2xl"
      onKeyDown={handleKeyDown}
    >
      <div className="flex-1">
        <Input
          value={query}
          onChange={setQuery}
          placeholder="Search for movies..."
          type="search"
          disabled={isLoading}
          fullWidth
        />
      </div>
      <Button
        label={isLoading ? "Searching..." : "Search"}
        onClick={handleSearch}
        disabled={isLoading || !query.trim()}
        variant="primary"
      />
    </div>
  );
};

export default SearchBar;