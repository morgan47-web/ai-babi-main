"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Speaker, SpeakerMuted } from "@/components/icons/generated"
import { WallPost } from "@/app/lib/generated/models/WallPost"
import LikeHeart from "./like-heart"
import { likePost } from "@/app/lib/server/actions/actions"
import CharacterAvatar from "../../character/character-avatar"
import TextMeButton from "../../actions/text-me-button"
import Generate from "../../actions/generate"

type Props = {
  post: WallPost
  muteEnabled?: boolean
}

function PostActions({ post, muteEnabled }: Props) {
  const [isLiked, setIsLiked] = React.useState(post.liked)
  const [muted, setMuted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const onLikeClick = async () => {
    setIsLiked(!isLiked)
    try {
      setIsLoading(true)
      const resp = await likePost(post.id)
      if (!resp.ok) {
        console.log("Failed to like post", resp.error)
        throw new Error("Failed to like post")
      }
    } catch (error) {
      console.error("Failed to like post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        className={cn(
          `
            absolute bottom-2 right-2 flex flex-col items-end justify-center
            gap-2
          `,
        )}
      >
        {muteEnabled ? (
          <Button
            className={`
              h-8 w-8 rounded-full backdrop-blur-1 bg-[#949494]

              hover:bg-[#949494]

              md:hover:bg-[#7d7d7d]
            `}
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <SpeakerMuted className="text-white" height={22} width={22} />
            ) : (
              <Speaker className="text-white" height={22} width={22} />
            )}
          </Button>
        ) : null}
        <Button
          className={`
            h-8 w-8 rounded-full backdrop-blur-1 bg-[#949494] p-0

            hover:bg-[#949494]

            md:hover:bg-[#7d7d7d]
          `}
          onClick={onLikeClick}
          disabled={isLoading}
        >
          <LikeHeart liked={isLiked} />
        </Button>
        <Generate chatbotID={post.chatbotId} />
        <TextMeButton chatbotID={post.chatbotId} />
      </div>
      <a
        className={`
          absolute bottom-2 left-2 flex items-center gap-x-2 text-shadow-lg
        `}
        href={`/character/${post.chatbotId}`}
      >
        <CharacterAvatar
          image={post.chatbotProfilePicture}
          name={post.chatbotName}
        />
        <p>{post.chatbotName}</p>
      </a>
    </>
  )
}

export default PostActions
