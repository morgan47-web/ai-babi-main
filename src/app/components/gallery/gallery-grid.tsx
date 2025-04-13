"use client"

import GalleryPreview from "./gallery-preview"
import { useEffect, useState } from "react"
import { GeneratedImages, LikedPostImage } from "@/app/lib/generated"
import ImageOverlay from "./image-overlay"

function GalleryGrid({
  items,
}: {
  items: Array<LikedPostImage | GeneratedImages>
}) {
  const [gridItems, setGridItems] = useState(items)
  const [currentIndex, setCurrentIndex] = useState<number | undefined>()

  useEffect(() => {
    const preloadImages = () => {
      gridItems.forEach((item) => {
        for (const url of item.urls) {
          const img = new window.Image()
          img.src = url
        }
      })
    }

    preloadImages()
  }, [gridItems])

  return (
    <>
      <div
        className={`
          grid grid-cols-3 gap-1

          md:grid-cols-4
        `}
      >
        {gridItems?.map((item, idx) => (
          <GalleryPreview
            key={idx}
            image={item}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
      <ImageOverlay
        gridItems={gridItems}
        setGridItems={setGridItems}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  )
}

export default GalleryGrid
