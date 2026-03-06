import { ReviewSkeleton } from "@/components/reviews/ReviewSkeleton";

export default function ReviewsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="animate-pulse">
        <div className="h-8 w-32 rounded bg-bg-elevated" />
        <div className="mt-2 h-4 w-56 rounded bg-bg-elevated" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
