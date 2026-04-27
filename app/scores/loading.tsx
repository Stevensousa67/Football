import { Skeleton } from "@/components/ui/skeleton"

export default function ScoresLoading() {
  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full shrink-0" />
        ))}
      </div>

      {/* Tabs */}
      <Skeleton className="h-10 w-52 rounded-full" />

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/60 bg-card/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="size-12 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-8" />
              <div className="flex flex-col items-center gap-2 flex-1">
                <Skeleton className="size-12 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
