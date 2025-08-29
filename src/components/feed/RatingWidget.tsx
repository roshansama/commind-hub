import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RatingWidgetProps {
  currentRating: number;
  onRate: (rating: number) => void;
  disabled?: boolean;
}

export function RatingWidget({ currentRating, onRate, disabled = false }: RatingWidgetProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isRating, setIsRating] = useState(false);

  const handleClick = async (rating: number) => {
    if (disabled || isRating) return;
    
    setIsRating(true);
    try {
      await onRate(rating);
    } finally {
      setIsRating(false);
    }
  };

  const displayRating = hoverRating || currentRating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="ghost"
          size="sm"
          className={cn(
            "h-6 w-6 p-0 focus-ring",
            disabled && "cursor-not-allowed opacity-50"
          )}
          disabled={disabled || isRating}
          onMouseEnter={() => !disabled && setHoverRating(star)}
          onMouseLeave={() => !disabled && setHoverRating(0)}
          onClick={() => handleClick(star)}
        >
          <Star
            className={cn(
              "h-3 w-3 transition-colors",
              star <= displayRating
                ? "fill-accent text-accent"
                : "text-muted-foreground"
            )}
          />
        </Button>
      ))}
    </div>
  );
}