"use client"

import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import React from "react"

interface LikeHeartProps {
  liked: boolean
  className?: string
}

function LikeHeart({ liked, className }: LikeHeartProps) {
  return (
    <Heart
      height={liked ? 24 : 22}
      width={liked ? 24 : 22}
      className={cn(
        className,
        "cursor-pointer transition-all duration-200 ease-in-out",
        liked ? "text-secondary" : "text-white",
      )}
      fill={liked ? "hsl(var(--secondary))" : "none"}
    />
  )
}

export default LikeHeart
