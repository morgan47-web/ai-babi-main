import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  )
}

export function PostsSkeleton() {
  return (
    <div className="pt-4">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}

export function EditPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <Skeleton className="aspect-square h-full w-full" />

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  )
}

export function ViewPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent
        className={`
          flex h-full max-h-[500px] flex-col items-start gap-0 p-0

          lg:max-h-[700px] lg:max-w-5xl

          md:max-w-3xl md:flex-row

          xl:max-h-[800px] xl:max-w-6xl
        `}
      >
        <Skeleton
          className={`
            relative h-96 w-full max-w-3xl overflow-hidden rounded-r-none

            lg:h-[700px]

            md:h-[500px]

            xl:h-[800px]
          `}
        />

        <div className="flex h-full flex-1 flex-col py-4 pl-3.5 pr-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>

          <Skeleton className="my-4 flex-1" />

          <div className="flex w-full items-center space-x-4">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full flex-1" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PostsGridSkeleton() {
  return (
    <div
      className={`
        grid w-full grid-cols-2 gap-0.5

        lg:grid-cols-4

        md:grid-cols-3 md:gap-4 md:rounded-lg

        xl:grid-cols-5
      `}
    >
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} className={`col-span-1 aspect-[1/1.5]`} />
      ))}
    </div>
  )
}
