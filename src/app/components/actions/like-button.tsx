"use client"

import { likePost } from "@/app/lib/server/actions/actions"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import React from "react"

interface LikeButtonProps {
  liked: boolean
  setLiked: (liked: boolean) => void
  postID: string
  className?: string
  onSuccess?: () => void
}

function LikeButton({
  liked,
  setLiked,
  className,
  postID,
  onSuccess,
}: LikeButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const onLikeClick = async () => {
    setLiked(!liked)
    try {
      setIsLoading(true)
      const resp = await likePost(postID)
      if (!resp.ok) {
        console.log("Failed to like post", resp.error)
        throw new Error("Failed to like post")
      }
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Failed to like post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Heart
      className={cn(
        className,
        "cursor-pointer",
        liked
          ? "h-[28px] w-[28px] animate-like text-secondary"
          : "h-6 w-6 animate-dislike text-primary",
        isLoading && "cursor-not-allowed",
      )}
      onClick={!isLoading ? onLikeClick : undefined}
      fill={liked ? "hsl(var(--secondary))" : "hsl(var(--background))"}
    />
  )
}

export default LikeButton
