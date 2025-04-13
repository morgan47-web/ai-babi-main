"use client"

import Link from "next/link"
import CharacterAvatar from "@/app/components/character/character-avatar"
import Timestamp from "../timestamp"
import PostActions from "./post-actions"
import { WallPost } from "@/app/lib/generated"
import PostImage from "./post-image"

function Post({
  post,
  ref,
}: {
  post: WallPost
  ref?: (el: HTMLDivElement | null) => void
}) {
  return (
    <div className={`my-6 flex flex-col space-y-2.5`} ref={ref}>
      <div
        className={`
          flex items-center justify-between px-3

          sm:px-0
        `}
      >
        <div className="flex items-center space-x-3">
          <Link
            href={`/character/${post.chatbotId}`}
            className="flex items-center space-x-3"
          >
            <CharacterAvatar
              image={post.chatbotProfilePicture}
              name={post.chatbotName}
              variant="active"
            />
            <div className="text-sm">
              <p className="space-x-1">
                <span className="font-semibold">{post.chatbotName}</span>
                <span
                  className={`
                    text-xs font-medium text-neutral-500

                    dark:text-neutral-400
                  `}
                >
                  •
                </span>
                <Timestamp createdAt={post.createdAt} />
              </p>
            </div>
          </Link>
        </div>
      </div>

      <PostImage
        postID={post.id}
        unlocked={!post.price || post.price == 0 || post.unlocked}
        imageURL={post.pictures[0]}
        price={post.price ?? 0}
      />

      <PostActions
        className={`
          px-3

          sm:px-0
        `}
        liked={post.liked}
        likes={post.likes}
        postID={post.id}
        chatbotID={post.chatbotId}
      />

      <div className="space-y-1">
        {post.description && (
          <div
            className={`
              flex items-start space-x-2 px-3 text-sm font-medium leading-none

              sm:px-0
            `}
          >
            <Link
              href={`/character/${post.chatbotId}`}
              className="font-bold leading-[20px]"
            >
              {post.chatbotName.split(" ")[0]}
            </Link>
            <p className="leading-[20px]">{post.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
