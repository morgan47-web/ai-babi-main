"use client"

import Posts from "@/app/components/posts/reels/posts"
import { PostsSkeleton } from "@/app/components/skeletons/posts"
import { Suspense, useRef } from "react"

export const dynamic = "force-dynamic"

function DashboardPage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <main className={`flex h-full w-full flex-grow`} ref={scrollRef}>
      <div className="flex h-full w-full flex-1 flex-col items-center">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts scrollRef={scrollRef} />
        </Suspense>
      </div>
    </main>
  )
}

export default DashboardPage
