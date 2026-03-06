import { Card } from "@/components/ui/Card";

export function ReviewSkeleton() {
  return (
    <Card>
      <div className="flex flex-col gap-4 animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 rounded bg-bg-elevated" />
            <div className="h-4 w-20 rounded bg-bg-elevated" />
          </div>
          <div className="h-4 w-16 rounded bg-bg-elevated" />
        </div>
        {/* Text skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-bg-elevated" />
          <div className="h-3 w-[90%] rounded bg-bg-elevated" />
          <div className="h-3 w-[70%] rounded bg-bg-elevated" />
        </div>
        {/* Button skeleton */}
        <div className="flex gap-2 pt-1">
          <div className="h-8 w-28 rounded-[var(--radius-md)] bg-bg-elevated" />
        </div>
      </div>
    </Card>
  );
}

export function ReviewSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }, (_, i) => (
        <ReviewSkeleton key={i} />
      ))}
    </div>
  );
}
