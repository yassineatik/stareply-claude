"use client";

import { useState } from "react";
import { ReviewQueue } from "@/components/reviews/ReviewQueue";
import { ReplySheet } from "@/components/dashboard/ReplySheet";
import type { Review } from "@/types";

interface ReviewInboxProps {
  initialReviews: Review[];
}

export function ReviewInbox({ initialReviews }: ReviewInboxProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  function handleGenerateReply(reviewId: string) {
    setSelectedReviewId(reviewId);
  }

  const selectedReview = reviews.find((r) => r.id === selectedReviewId) ?? null;

  return (
    <>
      <ReviewQueue
        reviews={reviews}
        onGenerateReply={handleGenerateReply}
      />

      {selectedReview && (
        <ReplySheet
          review={selectedReview}
          onClose={() => setSelectedReviewId(null)}
          onPublished={(reviewId) => {
            setReviews((prev) =>
              prev.map((r) =>
                r.id === reviewId ? { ...r, is_replied: true } : r
              )
            );
            setSelectedReviewId(null);
          }}
        />
      )}
    </>
  );
}
