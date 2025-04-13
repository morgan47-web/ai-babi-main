import { GeneratedImages, LikedPostImage } from "@/app/lib/generated"
import { isGeneratedImage, isLikedPostImage } from "./utils"
import LikedImageOverlay from "./liked-image-overlay"
import StoriesPopup from "../stories/stories-popup"

interface Props {
  gridItems: Array<LikedPostImage | GeneratedImages>
  setGridItems: React.Dispatch<
    React.SetStateAction<(LikedPostImage | GeneratedImages)[]>
  >
  currentIndex: number | undefined
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function ImageOverlay({
  gridItems,
  setGridItems,
  currentIndex,
  setCurrentIndex,
}: Props) {
  const getNextItem = (
    current: number | undefined,
    direction: "next" | "prev",
  ): number | undefined => {
    if (current === undefined) return

    if (direction === "next") {
      for (let i = current + 1; i < gridItems.length; i++) {
        if (isGeneratedImage(gridItems[i]) && gridItems[i].urls.length == 0) {
          continue
        }
        if (isGeneratedImage(gridItems[i]))
          (gridItems[i] as GeneratedImages).seenByUser = true
        return i
      }
    } else {
      for (let i = current - 1; i >= 0; i--) {
        if (isGeneratedImage(gridItems[i]) && gridItems[i].urls.length == 0) {
          continue
        }
        if (isGeneratedImage(gridItems[i]))
          (gridItems[i] as GeneratedImages).seenByUser = true
        return i
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (
      currentIndex &&
      isGeneratedImage(gridItems[currentIndex]) &&
      gridItems[currentIndex].urls.length > 1
    )
      return
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width

    if (currentIndex == null) return

    if (clickPosition < 0.5 && currentIndex > 0) {
      setCurrentIndex((idx) => getNextItem(idx, "prev"))
    } else if (clickPosition > 0.5 && currentIndex < gridItems.length - 1) {
      setCurrentIndex((idx) => getNextItem(idx, "next"))
    }
  }

  if (currentIndex == null) return null

  return (
    <div>
      {isLikedPostImage(gridItems[currentIndex]) ? (
        <LikedImageOverlay
          gridItems={gridItems}
          setGridItems={setGridItems}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          handleOverlayClick={handleClick}
        />
      ) : (
        <StoriesPopup
          chatbotID={gridItems[currentIndex].chatbotId}
          images={gridItems[currentIndex].urls}
          isOpen={true}
          duration={31465465464654}
          onClose={() => setCurrentIndex(undefined)}
          onImageOverflow={(direction) => {
            if (direction === "start")
              setCurrentIndex((idx) => getNextItem(idx, "prev"))
            else setCurrentIndex((idx) => getNextItem(idx, "next"))
          }}
        />
      )}
    </div>
  )
}
