"use client"

import Image from "next/image"
import { useState } from "react"
import UnlockPostButton from "../actions/unlock-post-button"
import { useRouter } from "next/navigation"

interface PostPreviewProps {
  postID: string
  chatbotID: string
  imageURL: string
  unlocked: boolean
  price?: number
}

function PostPreview({
  postID,
  imageURL,
  unlocked,
  chatbotID,
  price,
}: PostPreviewProps) {
  const [postUnlocked, setPostUnlocked] = useState(unlocked)
  const [loading, setLoading] = useState(true)
  const [url, setURL] = useState<string>(imageURL)
  const { push } = useRouter()

  return (
    <>
      <div
        className={`
          group relative col-span-1 flex aspect-square cursor-pointer flex-col
          items-center justify-center overflow-hidden bg-card

          ${loading ? `animate-pulse` : ""}
        `}
        tabIndex={0}
      >
        <Image
          src={url}
          fill
          ref={() => {
            setLoading(false)
          }}
          alt="Post preview"
          onClick={() => push(`/character/${chatbotID}/posts#${postID}`)}
          sizes="33vw"
          className={`
            object-cover transition

            group-focus:blur-[2px] group-focus:brightness-90 group-focus:filter

            md:group-hover:scale-110 md:group-hover:transform

            ${loading ? "hidden" : "visible"}
          `}
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
              absolute top-[50%] z-10 flex -translate-y-1/2 items-center
              justify-center
            `}
          />
        )}
      </div>
    </>
  )
}

export default PostPreview
