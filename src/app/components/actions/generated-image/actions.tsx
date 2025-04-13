import { cn } from "@/lib/utils"
import RemixButton from "./remix-button"
import DownloadButton from "./download-button"
import { ContentType } from "@/app/lib/generated"
import CloseButton from "./close-button"

interface GeneratedImageActionsProps {
  imageContent: string
  chatbotID: string
  onClose?: () => void
  contentType?: ContentType
}

export default function GeneratedImageActions({
  imageContent,
  chatbotID,
  onClose,
  contentType,
}: GeneratedImageActionsProps) {
  return (
    <>
      <CloseButton onclick={onClose || (() => {})} />
      <div
        className={cn(
          `
            absolute bottom-2 right-2 flex flex-col items-end justify-center
            gap-2
          `,
        )}
      >
        <RemixButton url={imageContent} chatbotId={chatbotID} />
        <DownloadButton
          url={imageContent}
          chatbotId={chatbotID}
          contentType={contentType}
        />
      </div>
    </>
  )
}
