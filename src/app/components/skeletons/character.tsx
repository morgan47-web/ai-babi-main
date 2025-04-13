import { Skeleton } from "@/components/ui/skeleton"
import { PostsGridSkeleton } from "./posts"

export function CharacterProfileSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2 px-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-24 w-24 rounded-full" />

          {/* Stats */}
          <div className="text-center">
            <Skeleton className="mb-1 h-6 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="text-center">
            <Skeleton className="mb-1 h-6 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="text-center">
            <Skeleton className="mb-1 h-6 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto p-3 pb-0">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-full" />
        ))}
      </div>

      <PostsGridSkeleton />
    </>
  )
}
