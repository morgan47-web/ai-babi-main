import { WallPost } from "@/app/lib/generated"
import Image from "next/image"
import Link from "next/link"
import { Trans } from "@lingui/react/macro"

interface CharacterPostsGridProps {
  posts: WallPost[] | undefined
  chatbotID: string
}

function CharacterPostsGrid({ posts, chatbotID }: CharacterPostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div
        className={`
          mx-auto flex max-w-3xl flex-col items-center justify-center space-y-3
          pb-20
        `}
      >
        <p className="text-sm font-semibold text-neutral-400">
          <Trans>No posts yet.</Trans>
        </p>
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
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/character/${chatbotID}/posts#${post.id}`}
          className="relative block aspect-square overflow-hidden"
        >
          <Image
            src={post.pictures[0]}
            alt={`Post by ${post.chatbotName}`}
            fill
            className={`
              object-cover transition-opacity

              hover:opacity-90
            `}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </Link>
      ))}
    </div>
  )
}

export default CharacterPostsGrid
