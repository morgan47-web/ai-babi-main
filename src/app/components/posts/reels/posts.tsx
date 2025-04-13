"use client"
import Post from "./post"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { AIBabeClient } from "@/app/lib/client/client"
import { PostsSkeleton } from "@/app/components/skeletons/posts"
import { isInitialized, isSignedUp, isValidUser } from "@/app/lib/user-guard"
import { UserState, useUser } from "@/app/context/user"
import SignupPost from "./signup-post"
import { GetPostsResponse, WallPost } from "@/app/lib/generated"
import SubscribePost from "./subscribe-post"
import { Trans } from "@lingui/react/macro"

function Posts({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) {
  const { user } = useUser()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [paginationToken, setPaginationToken] = useState<string>("")
  //TODO: This could be servr action if nextJS fixes cache invalidation
  const [posts, setPosts] = useState<React.ReactNode[]>([])
  const [loading, setLoading] = useState(false)

  const updatePosts = (
    currentPosts: React.ReactNode[],
    newPosts: WallPost[],
    user: UserState,
  ) => {
    const updatedPosts = [
      ...currentPosts,
      ...newPosts.map((post, index) => (
        <Post
          key={post.id + currentPosts.length + index}
          post={post}
          ref={index == 3 ? sentinelRef : undefined}
        />
      )),
    ]
    if (!isSignedUp(user)) {
      updatedPosts.push(<SignupPost key={"signup" + updatedPosts.length} />)
    }
    if (isSignedUp(user) && !isValidUser(user)) {
      updatedPosts.push(
        <SubscribePost key={"subscribe" + updatedPosts.length} />,
      )
    }
    return updatedPosts
  }

  useEffect(() => {
    if (posts.length > 0 || !isInitialized(user)) return

    AIBabeClient.post
      .listVideosPostVideosGet()
      .then((res: GetPostsResponse) => {
        setPosts(updatePosts([], res.posts, user))
        setPaginationToken(res.paginationToken)
      })
  }, [user, posts])

  const fetchNewData = useCallback(() => {
    if (!isInitialized(user) || loading) return

    setLoading(true)

    AIBabeClient.post
      .listVideosPostVideosGet({ paginationToken })
      .then((res) => {
        setPosts((prev) => updatePosts(prev, res.posts, user))
        setPaginationToken(res.paginationToken)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [paginationToken, user, loading])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!loading && entries[0].isIntersecting && isSignedUp(user)) {
          fetchNewData()
        }
      },
      { root: scrollRef.current, threshold: 0.5 },
    )

    const currentSentinel = sentinelRef.current

    if (currentSentinel && posts.length > 0) {
      observer.observe(currentSentinel)
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
    }
  }, [loading, fetchNewData, scrollRef, user, posts])

  if (posts.length == 0) return <PostsSkeleton />

  return (
    <div
      ref={scrollRef}
      className={`
        snap-y snap-mandatory overflow-y-auto overflow-x-hidden scrollbar-hide
      `}
    >
      {posts}
      {loading && (
        <div className="p-8 text-center text-gray-500">
          <Trans>Loading...</Trans>
        </div>
      )}
    </div>
  )
}

export default Posts
