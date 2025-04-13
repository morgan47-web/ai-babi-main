"use client"

import { useDialogs } from "@/app/context/dialog"
import { ListChatbotItem } from "@/app/lib/generated"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { PremiumDialogType } from "../dialog/dialog-types"
import { CrownEmblem } from "@/components/icons/generated"

interface ProfilePictureProps {
  chatbot: ListChatbotItem
  href: string
  locked?: boolean
  videoEnabled?: boolean
  videoOnly?: boolean
  displayName?: boolean
  className?: string
}

export default function ProfilePicture({
  chatbot,
  href,
  locked,
  videoEnabled,
  videoOnly,
  displayName,
  className,
}: ProfilePictureProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(true)
  const [showVideo, setShowVideo] = useState(videoOnly)
  const dialogs = useDialogs()

  const handleTouchStart = () => {
    if (videoEnabled) setShowVideo(true)
  }

  const handleTouchEnd = () => {
    if (videoOnly) return
    setShowVideo(false)
  }

  return (
    <Link
      tabIndex={0}
      onClick={(e) => {
        if (locked) {
          e.preventDefault()
          dialogs.setPremiumOpen(
            true,
            PremiumDialogType.premium_babes,
            chatbot.profilePicture,
          )
        }
      }}
      href={href}
      className={cn(
        `
          group relative col-span-1 flex flex-col items-center justify-center
          overflow-hidden bg-card

          ${imageLoading ? `animate-pulse` : ""}
          ${locked ? "border-[3px] border-premium" : ""}
        `,
        className,
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleTouchStart}
      onMouseLeave={handleTouchEnd}
    >
      {locked && (
        <CrownEmblem
          className="absolute right-2 top-2 z-10"
          width={38}
          height={38}
        />
      )}
      {/* Dynamic image */}
      {showVideo && chatbot.profileVideo && (
        <video
          src={chatbot.profileVideo ? chatbot.profileVideo : undefined}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => {
            setVideoLoading(false)
          }}
          className={`
            object-cover transition

            ${showVideo && videoEnabled ? "" : "hidden"}
            ${videoLoading ? "hidden" : ""}

            group-hover:block
          `}
        />
      )}
      {/* Static image */}
      <Image
        src={chatbot.profilePicture}
        fill
        ref={() => {
          setImageLoading(false)
        }}
        sizes="50vw"
        alt="Post preview"
        className={`
          object-cover object-top transition

          ${showVideo && !videoLoading ? "hidden" : `block`}
          ${imageLoading ? "hidden" : ""}
        `}
      />

      {displayName && (
        <div
          className={`
            absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80
            to-transparent p-2 text-white

            md:p-4
          `}
        >
          <h3
            className={`
              text-sm font-bold

              md:text-xl
            `}
          >
            {chatbot.displayName}
          </h3>
        </div>
      )}
    </Link>
  )
}
