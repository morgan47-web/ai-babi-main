import { Skeleton } from "@/components/ui/skeleton"

export function SubscriptionSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="flex w-full flex-col space-y-2">
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}
