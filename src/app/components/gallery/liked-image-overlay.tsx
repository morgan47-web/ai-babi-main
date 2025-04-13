import { GeneratedImages, LikedPostImage } from "@/app/lib/generated"
import Image from "next/image"
import LikeButton from "../actions/like-button"
import Link from "next/link"
import CharacterAvatar from "../character/character-avatar"
import { isLikedPostImage } from "./utils"
import CloseButton from "../actions/generated-image/close-button"

interface Props {
  gridItems: Array<LikedPostImage | GeneratedImages>
  setGridItems: React.Dispatch<
    React.SetStateAction<(LikedPostImage | GeneratedImages)[]>
  >
  currentIndex: number | undefined
  setCurrentIndex: (index: number | undefined) => void
  handleOverlayClick: (e: React.MouseEvent) => void
}

export default function LikedImageOverlay({
  gridItems,
  setGridItems,
  currentIndex,
  setCurrentIndex,
  handleOverlayClick,
}: Props) {
  if (currentIndex == null) return null

  return (
    <div
      className={`
        fixed inset-0 z-[99999] flex select-none items-center justify-center
        bg-black/95
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          relative h-auto max-h-full w-full max-w-[420px] select-none

          2xl:max-w-[560px]

          lx:max-w-[520px]

          md:max-w-[480px]
        `}
      >
        <Image
          src={gridItems[currentIndex].urls[0]}
          alt="Full screen post"
          priority
          sizes="100vw"
          width={808}
          height={1256}
          style={{ height: "auto", width: "100%" }}
          className="select-none rounded-2xl object-contain"
        />

        {/* Like button */}
        <div className="absolute bottom-4 right-4 z-[99999]">
          <LikeButton
            postID={(gridItems[currentIndex] as LikedPostImage).postId}
            onSuccess={() => {
              setCurrentIndex(undefined)
              setGridItems((prev) =>
                prev.filter(
                  (item) =>
                    isLikedPostImage(item) &&
                    isLikedPostImage(gridItems[currentIndex]) &&
                    item.postId !== gridItems[currentIndex].postId,
                ),
              )
            }}
            liked={true}
            setLiked={() => {}}
            className={`
              cursor-pointer transition-transform

              hover:scale-110
            `}
          />
        </div>

        {/* User info and close button - moved inside image container */}
        <div onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/character/${gridItems[currentIndex].chatbotId}`}
            className={`absolute left-4 top-4 z-[99999] flex items-center gap-3`}
          >
            <CharacterAvatar
              name={gridItems[currentIndex].chatbotName}
              image={gridItems[currentIndex].chatbotAvatar}
              size="default"
            />
            <span className="text-sm font-medium text-white">
              {gridItems[currentIndex].chatbotName}
            </span>
          </Link>
        </div>

        <CloseButton
          onclick={() => {
            setCurrentIndex(undefined)
          }}
        />
      </div>
    </div>
  )
}
