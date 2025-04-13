import { Skeleton } from "@/components/ui/skeleton"

export default function CarouselSkeleton({
  height = 250,
}: {
  height?: number
}) {
  return (
    <div className="flex w-full items-center justify-center">
      <Skeleton
        style={{
          transform: "translateX(-5%) scale(0.8)",
        }}
        className={`
          h-[${height}px]

          w-[65%] rounded-2xl
        `}
      />
      <Skeleton
        className={`
          h-[${height}px]

          z-10 w-[65%] rounded-2xl
        `}
      />
      <Skeleton
        style={{
          transform: "translateX(5%) scale(0.8)",
        }}
        className={`
          h-[${height}px]

          w-[65%] rounded-2xl
        `}
      />
    </div>
  )
}
