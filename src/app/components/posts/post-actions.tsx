"use client"

import Link from "next/link"
import LikeButton from "@/app/components/actions/like-button"
import React from "react"
import SendIcon from "@/components/icons/generated/SendIcon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"

type Props = {
  chatbotID: string
  postID: string
  likes: number
  liked: boolean
  className?: string
}

function PostActions({ chatbotID, postID, likes, liked, className }: Props) {
  const [isLiked, setIsLiked] = React.useState(liked)
  const [likeCount, setLikeCount] = React.useState(likes)
  return (
    <div
      className={cn(
        "relative flex h-6 w-full items-center justify-between",
        className,
      )}
    >
      <div
        className={`
          relative flex select-none items-center justify-between gap-x-2
        `}
      >
        <div
          id="reels-like-button"
          className="flex h-6 w-6 items-center justify-center"
        >
          <LikeButton
            liked={isLiked}
            setLiked={setIsLiked}
            postID={postID}
            onSuccess={() =>
              setLikeCount((prev) => {
                if (isLiked) return prev - 1
                return prev + 1
              })
            }
          />
        </div>
        {likeCount.toString()}
      </div>
      <Link href={`/messages/${chatbotID}`}>
        <Button
          id="post-action-chat-button"
          className={`
            flex select-none items-center justify-center gap-x-1 pl-1
            shadow-login
          `}
        >
          <SendIcon width={24} height={24} />
          <p>
            <Trans>Text me!</Trans>
          </p>
        </Button>
      </Link>
    </div>
  )
}

export default PostActions
