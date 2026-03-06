interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export function StarRating({ rating, size = "md", className = "" }: StarRatingProps) {
  return (
    <div className={`flex gap-0.5 ${sizeMap[size]} ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-star" : "text-border-strong"}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}
