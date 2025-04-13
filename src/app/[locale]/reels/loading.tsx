import { PostsSkeleton } from "@/app/components/skeletons/posts"

export default function Loading() {
  return (
    <div
      className={`
        mx-auto

        md:max-w-lg
      `}
    >
      <PostsSkeleton />
    </div>
  )
}
