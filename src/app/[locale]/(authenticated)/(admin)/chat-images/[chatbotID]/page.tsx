/* eslint-disable @next/next/no-img-element */
"use client"

import { ChatImageCategory, PictureModel } from "@/app/lib/generated"
import {
  deleteChatImage,
  getChatImages,
} from "@/app/lib/server/actions/actions"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { TagSelector } from "./tag-selector"

function DeleteButton({
  chatbotID,
  imageID,
}: {
  chatbotID: string
  imageID: string
}) {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const resp = await deleteChatImage(chatbotID, imageID)
    if (resp.ok) {
      setLoading(false)
      setDisabled(true)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading || disabled}
      className={`
        w-full bg-secondary

        disabled:bg-accent

        hover:bg-secondary/90
      `}
    >
      {loading && "Deleting..."}
      {!loading && !disabled && "Delete"}
      {!loading && disabled && "Deleted"}
    </Button>
  )
}

export default function ChatImagesPage() {
  const params = useParams()
  const chatbotID = params.chatbotID as string
  const [urls, setUrls] = useState<string[]>([])
  const [images, setImages] = useState<PictureModel[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const resp = await getChatImages(chatbotID)
      if (resp.ok && resp.data) {
        setUrls(resp.data.urls)
        setImages(resp.data.images)
      }
    }

    fetchImages()
  }, [chatbotID])

  const getTagCount = (tag: ChatImageCategory) => {
    return images.filter((image) => image.chatCategory === tag).length
  }

  return (
    <main className="h-full w-full space-y-4 p-4">
      <h1 className="text-xl">
        Image count: {urls.length}, welcome: {getTagCount("welcome")}, breasts:{" "}
        {getTagCount("exposed_breasts")}, pussy: {getTagCount("exposed_pussy")},
        ass: {getTagCount("exposed_ass")}, sex: {getTagCount("sex")}, toys:{" "}
        {getTagCount("toys")}
      </h1>
      <div
        className={`
          grid grid-cols-1 gap-4

          md:grid-cols-4
        `}
      >
        {urls.map((url, index) => (
          <div
            key={index}
            onClick={
              // copy id to clipboard
              () => {
                navigator.clipboard.writeText(images[index].id ?? "")
              }
            }
          >
            <TagSelector
              chatbotID={chatbotID}
              imageID={images[index].id ?? ""}
              existingTag={images[index].chatCategory}
            />
            <DeleteButton
              chatbotID={chatbotID}
              imageID={images[index].id ?? ""}
            />
            <img src={url} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </main>
  )
}
