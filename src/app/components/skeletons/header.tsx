import { Skeleton } from "@/components/ui/skeleton"

export function HeaderSkeleton() {
  return (
    <header className="relative left-0 right-0 top-0 z-50 bg-background">
      <div className="flex items-center justify-between py-2 pl-4 pr-1">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
    </header>
  )
}
