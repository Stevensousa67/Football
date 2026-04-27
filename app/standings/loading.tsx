import { Skeleton } from "@/components/ui/skeleton"

export default function StandingsLoading() {
  return (
    <div className="py-8 space-y-6">
      {/* League header skeleton */}
      <div className="flex items-center gap-4 pb-2">
        <Skeleton className="size-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-border/60 bg-card/50 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="border-b border-border/50 bg-muted/30 px-4 py-3 flex gap-4">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-8 ml-auto" />
          <Skeleton className="h-4 w-8 hidden sm:block" />
          <Skeleton className="h-4 w-8 hidden sm:block" />
        </div>
        {/* Rows */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b border-border/30 last:border-0"
          >
            <Skeleton className="size-8 rounded-lg shrink-0" />
            <Skeleton className="size-7 rounded-full shrink-0" />
            <Skeleton className="h-4 flex-1 max-w-[180px]" />
            <Skeleton className="h-4 w-8 ml-auto" />
            <Skeleton className="h-4 w-8 hidden sm:block" />
            <Skeleton className="h-4 w-8 hidden sm:block" />
            <Skeleton className="h-4 w-8 hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  )
}
