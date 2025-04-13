"use client"
import { WallPost } from "@/app/lib/generated"
import Post from "./post"
import { useCallback, useEffect, useRef, useState } from "react"
import { AIBabeClient } from "@/app/lib/client/client"
import { PostsSkeleton } from "../skeletons/posts"
import { Trans } from "@lingui/react/macro"

const noPosts = (
  <div className="p-8 text-center text-gray-500">
    <Trans>No posts available yet.</Trans>
  </div>
)

function Posts({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) {
  const listRef = useRef<HTMLDivElement>(null)
  const [paginationToken, setPaginationToken] = useState<string>("")
  //TODO: This could be servr action if nextJS fixes cache invalidation
  const [posts, setPosts] = useState<Array<WallPost>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AIBabeClient.post.listPostGet().then((res) => {
      setPosts(res.posts)
      setPaginationToken(res.paginationToken)
    })
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !listRef.current) return
    if (
      !loading &&
      scrollRef.current.scrollTop + scrollRef.current.offsetHeight >=
        listRef.current.scrollHeight
    ) {
      setLoading(true)

      AIBabeClient.post
        .listPostGet({ paginationToken })
        .then((res) => {
          setPosts([...posts, ...res.posts])
          setPaginationToken(res.paginationToken)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [posts, loading, paginationToken, scrollRef])

  useEffect(() => {
    function onScroll() {
      handleScroll()
    }
    const currentScrollRef = scrollRef.current
    currentScrollRef?.addEventListener("scroll", onScroll, { passive: true })
    return () => currentScrollRef?.removeEventListener("scroll", onScroll)
  }, [handleScroll, scrollRef])

  if (posts.length == 0) return <PostsSkeleton />

  return (
    <div ref={listRef}>
      {posts.length > 0
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : noPosts}
      {loading && (
        <div className="p-8 text-center text-gray-500">
          <Trans>Loading...</Trans>
        </div>
      )}
    </div>
  )
}

export default Posts
