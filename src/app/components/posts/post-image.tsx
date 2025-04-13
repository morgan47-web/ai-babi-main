"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import UnlockPostButton from "../actions/unlock-post-button"

type Props = {
  postID: string
  unlocked: boolean
  imageURL: string
  price?: number | undefined
}

function PostImage({ postID, unlocked, imageURL, price }: Props) {
  const [url, setURL] = React.useState<string>(imageURL)
  const [postUnlocked, setPostUnlocked] = React.useState<boolean>(unlocked)
  return (
    <Card
      className={`
        relative aspect-[4/5] w-full overflow-hidden rounded-none

        sm:rounded-md
      `}
    >
      <Image
        src={url}
        alt="Post Image"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`
          object-cover

          sm:rounded-md
        `}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      {!postUnlocked && price && (
        <UnlockPostButton
          price={price}
          postID={postID}
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
    </Card>
  )
}

export default PostImage
