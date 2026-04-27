import { Skeleton } from "@/components/ui/skeleton"

export default function NewsLoading() {
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center gap-4 pb-2">
        <Skeleton className="size-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-52" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      {/* Hero skeleton */}
      <Skeleton className="w-full aspect-video rounded-2xl" />
      {/* Grid skeleton */}
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3.5 rounded-2xl border border-border/60 bg-card/60 p-3.5">
            <Skeleton className="size-20 sm:size-24 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-3 w-20 mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
