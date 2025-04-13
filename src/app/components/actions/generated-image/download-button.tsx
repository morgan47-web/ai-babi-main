"use client"

import { ContentType } from "@/app/lib/generated"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

export default function DownloadButton({
  url,
  chatbotId,
  contentType,
}: {
  url: string
  chatbotId: string
  contentType?: ContentType
}) {
  const imageName = url.split("/").pop()?.split("?")[0]
  return (
    <Button
      className={`
        h-8 w-8 rounded-full backdrop-blur-1 bg-[#949494] p-0

        hover:bg-[#7d7d7d]
      `}
      onClick={async (e) => {
        console.log("download button clicked")
        e.stopPropagation()
        let url =
          process.env.NEXT_PUBLIC_ZPPS_URL +
          `/v1/chatbot/${chatbotId}/attachment?image_name=${imageName}`
        if (contentType) url += `&content_type=${contentType}`
        window.location.href = url
      }}
    >
      <DownloadIcon />
    </Button>
  )
}
