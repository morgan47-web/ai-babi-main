"use client"
import { WallPost } from "@/app/lib/generated"
import PostContent from "./post-content"
import { MutableRefObject } from "react"

function Post({
  post,
  ref,
}: {
  post: WallPost
  ref?: MutableRefObject<HTMLDivElement | null>
}) {
  return (
    <div
      style={{ height: "calc(100dvh - 60px)" }}
      className={`
        relative flex h-auto snap-center snap-always items-center justify-center

        md:!h-[100dvh]
      `}
      ref={ref}
    >
      <PostContent post={post} />
    </div>
  )
}

export default Post
