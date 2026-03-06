"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
  onGenerateReply: (reviewId: string) => void;
}

function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export function ReviewCard({ review, onGenerateReply }: ReviewCardProps) {
  return (
    <Card hover>
      <div className="flex flex-col gap-4">
        {/* Header: stars, reviewer, date, badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm font-medium text-text-primary font-body">
              {review.reviewer_name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted font-body">
              {timeAgo(review.review_created_at)}
            </span>
            {review.is_replied && (
              <Badge variant="success">Replied</Badge>
            )}
          </div>
        </div>

        {/* Review text */}
        {review.comment && (
          <p className="font-mono text-sm leading-relaxed text-text-secondary">
            &ldquo;{review.comment}&rdquo;
          </p>
        )}

        {/* Actions */}
        {!review.is_replied && (
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={() => onGenerateReply(review.id)}
            >
              Generate Reply
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
