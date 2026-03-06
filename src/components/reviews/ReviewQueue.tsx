"use client";

import { useState } from "react";
import type { Review, ReviewFilter } from "@/types";
import { ReviewCard } from "./ReviewCard";

interface ReviewQueueProps {
  reviews: Review[];
  onGenerateReply: (reviewId: string) => void;
}

const filters: { label: string; value: ReviewFilter }[] = [
  { label: "All", value: "all" },
  { label: "Unreplied", value: "unreplied" },
  { label: "5 star", value: "5" },
  { label: "4 star", value: "4" },
  { label: "3 star", value: "3" },
  { label: "1-2 star", value: "1" },
];

export function ReviewQueue({ reviews, onGenerateReply }: ReviewQueueProps) {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>("all");

  const filteredReviews = reviews.filter((review) => {
    switch (activeFilter) {
      case "unreplied":
        return !review.is_replied;
      case "1":
        return review.rating <= 2;
      case "2":
        return review.rating === 2;
      case "3":
        return review.rating === 3;
      case "4":
        return review.rating === 4;
      case "5":
        return review.rating === 5;
      default:
        return true;
    }
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-medium font-body transition-colors cursor-pointer",
              activeFilter === f.value
                ? "bg-accent text-white"
                : "bg-bg-elevated text-text-secondary hover:text-text-primary",
            ].join(" ")}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Review list */}
      <div className="flex flex-col gap-3">
        {filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <p className="text-lg text-text-secondary font-body">
              No reviews match this filter.
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onGenerateReply={onGenerateReply}
            />
          ))
        )}
      </div>
    </div>
  );
}
