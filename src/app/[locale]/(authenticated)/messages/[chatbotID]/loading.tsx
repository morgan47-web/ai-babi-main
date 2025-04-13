import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex h-screen flex-col px-4 pb-20 pt-20">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`
              flex

              ${i % 2 === 0 ? "justify-end" : "justify-start"}
            `}
          >
            <div
              className={`
                flex max-w-[70%] gap-2

                ${i % 2 === 0 ? "flex-row-reverse" : ""}
              `}
            >
              {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
              <Card className="px-4 py-2">
                <Skeleton className="h-4 w-[200px]" />
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
