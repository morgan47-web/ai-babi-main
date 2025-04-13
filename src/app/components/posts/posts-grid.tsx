import { WallPost } from "@/app/lib/generated"
import PostPreview from "./post-preview"

interface PostsGridProps {
  posts: WallPost[] | undefined
}

function PostsGrid({ posts }: PostsGridProps) {
  if (posts?.length === 0) {
    return (
      <div
        className={`
          mx-auto flex max-w-3xl flex-col items-center justify-center space-y-3
          pb-20

          lg:max-w-4xl
        `}
      >
        <p className="text-sm font-semibold text-neutral-400">No more posts.</p>
      </div>
    )
  }

  return (
    <div
      className={`
        grid grid-cols-3 gap-0.5

        md:grid-cols-4
      `}
    >
      {posts?.map((post) => (
        <PostPreview
          key={post.id}
          postID={post.id}
          unlocked={!post.price || post.price == 0 || post.unlocked}
          price={post.price ?? 0}
          imageURL={post.pictures[0]}
          chatbotID={post.chatbotId}
        />
      ))}
    </div>
  )
}

export default PostsGrid
