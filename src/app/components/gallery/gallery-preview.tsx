"use client"

import { GeneratedImages, LikedPostImage } from "@/app/lib/generated"
import Image from "next/image"
import { useState } from "react"
import QueuedImage from "./queued-image"
import { isGeneratedImage } from "./utils"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Trans } from "@lingui/react/macro"

interface GalleryPreviewProps {
  image: LikedPostImage | GeneratedImages
  onClick?: () => void
}

const hasURL = (
  image: LikedPostImage | GeneratedImages,
): image is GeneratedImages => {
  return "urls" in image && image.urls.length > 0
}

function GalleryPreview({ image, onClick }: GalleryPreviewProps) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {hasURL(image) ? (
        <div
          className={`
            group relative col-span-1 flex aspect-[1/1.5] cursor-pointer
            flex-col items-center justify-center overflow-hidden rounded-lg
            bg-card

            ${loading ? `animate-pulse` : ""}
          `}
          onClick={() => {
            if (onClick) onClick()
            image.seenByUser = true
          }}
        >
          <Image
            src={image.urls[0]}
            fill
            ref={() => {
              setLoading(false)
            }}
            alt="Post preview"
            sizes="33vw"
            className={`
              rounded-lg object-cover transition

              group-focus:blur-[2px] group-focus:brightness-90
              group-focus:filter

              md:group-hover:scale-110 md:group-hover:transform

              ${loading ? "hidden" : "visible"}
            `}
          />
          {isGeneratedImage(image) && image.urls.length > 1 && (
            <Badge variant={"image"} className={`absolute bottom-1 left-1 h-5`}>
              <p>{image.urls.length} Images</p>
            </Badge>
          )}
          {isGeneratedImage(image) && !image.seenByUser && (
            <Badge
              variant={"secondary"}
              className={`
                absolute right-0 top-0 h-5 rounded-br-none rounded-tl-none p-1
                px-2 shadow-[0px_1px_5px_0px] shadow-secondary/60
              `}
            >
              <p>
                <Trans>New</Trans>
              </p>
            </Badge>
          )}
        </div>
      ) : (
        isGeneratedImage(image) && (
          <QueuedImage
            chatbotAvatar={image.chatbotAvatar}
            eta={formatDistanceToNow(image.eta)}
          />
        )
      )}
    </>
  )
}

export default GalleryPreview
