import React from "react";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  reviewsCount?: number;
  showText?: boolean;
}

export default function RatingBadge({ rating, reviewsCount, showText = false }: RatingBadgeProps) {
  // Determine badge colors based on rating score
  const getBadgeColors = (score: number) => {
    if (score >= 4.7) return "bg-emerald-500 text-white";
    if (score >= 4.4) return "bg-emerald-600 text-white";
    if (score >= 4.0) return "bg-amber-500 text-white";
    return "bg-yellow-500 text-white";
  };

  const getRatingText = (score: number) => {
    if (score >= 4.7) return "Excellent";
    if (score >= 4.4) return "Very Good";
    if (score >= 4.0) return "Good";
    return "Average";
  };

  return (
    <div className="flex items-center gap-2">
      {/* Visual Badge */}
      <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-extrabold shadow-sm ${getBadgeColors(rating)}`}>
        <Star className="h-3 w-3 fill-current text-white shrink-0" />
        <span>{rating.toFixed(1)}</span>
      </div>

      {/* Optional Descriptive text */}
      {(showText || reviewsCount !== undefined) && (
        <div className="flex flex-col text-left">
          {showText && (
            <span className="text-xs font-bold text-brand-dark leading-tight">
              {getRatingText(rating)}
            </span>
          )}
          {reviewsCount !== undefined && (
            <span className="text-[10px] text-brand-gray font-semibold leading-tight">
              ({reviewsCount} Reviews)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
