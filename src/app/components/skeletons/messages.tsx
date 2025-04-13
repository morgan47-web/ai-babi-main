import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MessagesSkeleton() {
  return (
    <main className="flex-1 space-y-2 p-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card
          key={i}
          className={`
            my-1 flex cursor-pointer items-center gap-x-3 border-0 bg-background
            p-2
          `}
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="mt-1 h-3 w-48" />
          </div>
        </Card>
      ))}
    </main>
  )
}
