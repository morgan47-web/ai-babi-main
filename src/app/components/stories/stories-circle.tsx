"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"
import LockedStoryInfo from "./locked-story-info"
import StoriesPopup from "./stories-popup"
import { useState } from "react"
import { useUser } from "@/app/context/user"
import { unlockGallery } from "@/app/lib/server/actions/actions"
import { StatusCodes } from "http-status-codes"
import { Loader } from "@/components/ui/loader"
import { GalleryItem } from "@/app/lib/generated"

const storyVariants = cva(
  "flex h-16 w-16 items-center justify-center rounded-full rounded-full p-[2px]",
  {
    variants: {
      variant: {
        default: "",
        active: "gradient-border",
        locked: "bg-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface StoryCircleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof storyVariants> {
  story: GalleryItem
}

export default function StoryCircle({ story }: StoryCircleProps) {
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  )
  const handleClick = async () => {
    if (!story.unlocked) {
      if (!user) return
      setLoading(true)
      await unlockGallery(story.id).then((res) => {
        if (res.ok && res.data) {
          user.setUser((prevState) => ({
            ...prevState,
            subscription: {
              ...prevState.subscription,
              tokens: res.data
                ? res.data.newBalance
                : prevState.subscription.tokens - story.price,
            },
          }))
          story.unlocked = true
          story.pictures = res.data.imageUrls
        } else if (res.code == StatusCodes.PAYMENT_REQUIRED) {
          alert("You don't have enough tokens.")
        } else if (res.code == StatusCodes.FORBIDDEN) {
          alert("Subscribe to unlock this chatbot.")
        }
      })
      setLoading(false)
    } else setSelectedImageIndex(0)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <button
          id="story-button"
          onClick={handleClick}
          className={cn(
            storyVariants({ variant: story.unlocked ? "active" : "locked" }),
          )}
        >
          <div className="relative h-full w-full rounded-full inner-circle">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={story.pictures[0]}
                alt={story.displayName}
                fill
                className={cn("object-cover", {
                  "blur-sm": !story.unlocked,
                })}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            {!story.unlocked &&
              (loading ? (
                <div
                  className={`
                    absolute inset-x-1 inset-y-1/2 flex items-center
                    justify-center
                  `}
                >
                  <Loader />
                </div>
              ) : (
                <LockedStoryInfo
                  price={story.price}
                  imageCount={story.imageCount}
                />
              ))}
          </div>
        </button>
        <span className="w-16 truncate text-center text-xs">
          {story.displayName}
        </span>
      </div>
      <StoriesPopup
        images={story.pictures}
        initialStoryIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onImageOverflow={() => setSelectedImageIndex(null)}
        onClose={() => setSelectedImageIndex(null)}
        duration={3000}
        chatbotID={story.id}
      />
    </>
  )
}
