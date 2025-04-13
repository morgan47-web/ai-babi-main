"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import UnlockPostButton from "@/app/components/actions/unlock-post-button"
import { WallPost } from "@/app/lib/generated"
import { useUser } from "@/app/context/user"
import { isSignedUp, isValidUser } from "@/app/lib/user-guard"
import { cn } from "@/lib/utils"
import PostActions from "./post-actions"
import SignupBenefits from "../../banner/signup-benefits"
import { Badge } from "@/components/ui/badge"
import UnblurBenefits from "../../banner/unblur-reels"

type Props = {
  post: WallPost
}

function PostContent({ post }: Props) {
  const { user } = useUser()
  const [url, setURL] = React.useState<string>(post.pictures[0])
  const [postUnlocked, setPostUnlocked] = React.useState<boolean>(
    !post.price || post.price == 0 || post.unlocked,
  )

  const getActions = () => {
    if (post.videos.length > 0 && post.type != "public") {
      if (!isSignedUp(user)) return <SignupBenefits />
      if (!isValidUser(user)) return <UnblurBenefits />
    }
    return <PostActions post={post} />
  }

  const isBluredNSFW =
    post.videos.length > 0 && post.type != "public" && !isValidUser(user)

  return (
    <Card
      className={`
        relative h-full overflow-hidden rounded-none

        sm:rounded-md
      `}
    >
      <>
        <div
          className={cn("relative h-full w-full", {
            "blur-xl filter": isBluredNSFW,
          })}
        >
          <video
            className={`h-full w-full object-cover object-center`}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            poster={url}
          >
            Your browser does not support the video tag.
            <source
              src={post.videos.length > 0 ? post.videos[0] : undefined}
              type="video/mp4"
            />
          </video>
        </div>
        {isBluredNSFW && (
          <Badge variant={"secondary"} className={`absolute right-0 top-0`}>
            NSFW
          </Badge>
        )}
      </>
      {!postUnlocked && post.price && (
        <UnlockPostButton
          price={post.price}
          postID={post.id}
          onUnlock={(resp) => {
            setURL(resp.imageUrls[0])
            setPostUnlocked(true)
          }}
          className={`
            absolute inset-0 left-[35%] right-[35%] top-[50%] z-10 flex
            items-center justify-center
          `}
        />
      )}
      {getActions()}
    </Card>
  )
}

export default PostContent
