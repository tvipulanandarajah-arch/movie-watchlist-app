import React from "react";
import Star from "../atoms/star";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  maxStars = 5,
  size = "md",
  interactive = true,
}) => {
  const handleStarClick = (starIndex: number): void => {
    if (interactive) {
      const newRating = starIndex === rating ? 0 : starIndex;
      onRate(newRating);
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            filled={starValue <= rating}
            onClick={() => handleStarClick(starValue)}
            size={size}
            interactive={interactive}
          />
        );
      })}
    </div>
  );
};

export default StarRating;