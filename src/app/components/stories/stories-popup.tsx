import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import GeneratedImageActions from "../actions/generated-image/actions"

interface StoriesPopupProps {
  images: string[]
  initialStoryIndex?: number
  isOpen: boolean
  onImageOverflow: (direction: "start" | "end") => void
  onClose: () => void
  duration: number
  chatbotID: string
}

export default function StoriesPopup({
  chatbotID,
  images,
  initialStoryIndex = 0,
  isOpen,
  onImageOverflow,
  onClose,
  duration,
}: StoriesPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex)
  const timeoutID = useRef<NodeJS.Timeout | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setCurrentIndex((prev) => {
        if (e.key === "ArrowLeft" && prev > 0) {
          return prev - 1
        } else if (e.key === "ArrowRight" && prev < images.length - 1) {
          return prev + 1
        } else {
          return prev
        }
      })
    },
    [images.length],
  )

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < images.length - 1) {
        return prev + 1
      } else {
        return prev
      }
    })
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(0)
      onImageOverflow("end")
    } else {
      timeoutID.current = setTimeout(nextImage, duration)
    }
  }, [timeoutID, onImageOverflow, images.length, currentIndex, duration])

  useEffect(() => {
    const handleMouseDown = () => {
      if (timeoutID.current) clearTimeout(timeoutID.current)
    }

    const handleMouseUp = () => {
      timeoutID.current = setTimeout(nextImage, duration)
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
      timeoutID.current = setTimeout(nextImage, duration)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      if (timeoutID.current) clearTimeout(timeoutID.current)
    }
  }, [isOpen, images, onClose, handleKeyDown, nextImage, duration])

  if (!isOpen) return null

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width

    if (clickPosition < 0.5) {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
      else {
        setCurrentIndex(0)
        onImageOverflow("start")
      }
    } else {
      if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1)
      else {
        setCurrentIndex(0)
        onImageOverflow("end")
      }
    }
  }

  return (
    <div
      className={`
        fixed inset-0 z-[99999] flex h-full items-center justify-center
        bg-black/95
      `}
      onClick={handleClick}
    >
      <div
        className={`
          relative flex h-full w-full flex-1 cursor-pointer select-none
          items-center justify-center
        `}
      >
        <div
          className={`relative flex h-full w-full items-center justify-center`}
        >
          <div
            className={`
              relative flex aspect-[832/1216] max-h-[1216px] w-full w-full
              max-w-[832px] items-center justify-center

              md:h-full md:w-auto
            `}
          >
            <Image
              src={images[currentIndex]}
              alt={images[currentIndex]}
              priority
              loading="eager"
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              width={832}
              height={1216}
              className="rounded-2xl bg-trigger object-contain"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <GeneratedImageActions
              imageContent={images[currentIndex]}
              chatbotID={chatbotID}
              onClose={onClose}
            />
          </div>
        </div>
        {/* Progress bar */}
        {images.length > 1 && (
          <div className="absolute top-2 flex w-full gap-1 px-2">
            {images.map((_, index) => (
              <div
                key={index}
                className="h-0.5 flex-1 rounded-full bg-gray-500"
              >
                <div
                  className={`
                    h-full rounded-full bg-white transition-all duration-200

                    ${
                      index === currentIndex
                        ? "w-full"
                        : index < currentIndex
                          ? "w-full"
                          : "w-0"
                    }
                  `}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
