import { HeaderSkeleton } from "@/app/components/skeletons/header"
import { PostsGridSkeleton } from "@/app/components/skeletons/posts"

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <PostsGridSkeleton />
    </>
  )
}
