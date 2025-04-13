"use client"

import Post from "@/app/components/posts/post"
import { WallPost } from "@/app/lib/generated"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { Trans } from "@lingui/react/macro"

export default function PostList({ posts }: { posts: WallPost[] }) {
  const postsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const pathname = usePathname()

  useEffect(() => {
    const postId = window.location.hash.slice(1)
    if (postId && postsRef.current[postId]) {
      postsRef.current[postId]?.scrollIntoView({ block: "start" })
    }
  }, [pathname])

  return (
    <div className="overflow-auto">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            ref={(el) => {
              postsRef.current[post.id] = el
            }}
          />
        ))
      ) : (
        <div className="p-8 text-center text-gray-500">
          <Trans>No posts available yet.</Trans>
        </div>
      )}
    </div>
  )
}
