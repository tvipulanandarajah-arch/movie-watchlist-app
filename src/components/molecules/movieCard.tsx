import React from "react";
import type { Movie } from "../../types/movie";
import StarRating from "./starRating";
import Button from "../atoms/button";

interface MovieCardProps {
  movie: Movie;
  onRate?: (movieId: string, rating: number) => void;
  onToggleWatched?: (movieId: string) => void;
  onRemove?: (movieId: string) => void;
  onAdd?: (movie: Movie) => void;
  isInWatchlist?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onRate,
  onToggleWatched,
  onRemove,
  onAdd,
  isInWatchlist = false,
}) => {
  const handleRate = (rating: number): void => {
    if (onRate) {
      onRate(movie.id, rating);
    }
  };

  const handleToggleWatched = (): void => {
    if (onToggleWatched) {
      onToggleWatched(movie.id);
    }
  };

  const handleRemove = (): void => {
    if (onRemove) {
      onRemove(movie.id);
    }
  };

  const handleAdd = (): void => {
    if (onAdd) {
      onAdd(movie);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  e.currentTarget.style.display = "none";
  const parent = e.currentTarget.parentElement;
  if (parent && !parent.querySelector(".no-poster-fallback")) {
    const fallback = document.createElement("div");
    fallback.className = "no-poster-fallback w-full h-full bg-gray-200 flex flex-col items-center justify-center";
    fallback.innerHTML = `
      <span class="text-gray-500 font-medium text-sm">No Poster Found</span>
    `;
    parent.appendChild(fallback);
  }
};

const handlePosterClick = (): void => {
  const imdbUrl = `https://www.imdb.com/title/${movie.id}`;
  window.open(imdbUrl, "_blank", "noopener,noreferrer");
};

return (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div
  className="relative h-64 overflow-hidden cursor-pointer"
  onClick={handlePosterClick}
  title="View on IMDB"
>
  <img
    src={movie.poster}
    alt={movie.title}
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    onError={handleImageError}
  />
  <div className="absolute bottom-2 left-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200">
    IMDB
  </div>
  {isInWatchlist && movie.watched && (
    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
      Watched
    </div>
  )}
</div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
          {movie.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{movie.year}</p>
        <span
            className={`inline-block text-xs px-2 py-0.5 rounded-full capitalize mb-3 text-center ${
              movie.type === "series"
                ? "bg-purple-100 text-purple-800"
                : movie.type === "movie"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {movie.type}
          </span>

        {isInWatchlist && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Your Rating:</p>
            <StarRating
              rating={movie.rating}
              onRate={handleRate}
              size="sm"
              interactive={true}
            />
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2">
          {isInWatchlist ? (
            <>
              <Button
                label={movie.watched ? "Mark Unwatched" : "Mark Watched"}
                onClick={handleToggleWatched}
                variant={movie.watched ? "secondary" : "success"}
                size="sm"
                fullWidth
              />
              <Button
                label="Remove"
                onClick={handleRemove}
                variant="danger"
                size="sm"
                fullWidth
              />
            </>
          ) : (
            <Button
              label="Add to Watchlist"
              onClick={handleAdd}
              variant="primary"
              size="sm"
              fullWidth
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;