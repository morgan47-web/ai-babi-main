import { ChatImageCategory, PatchChatImageRequest } from "@/app/lib/generated"
import { patchChatImage } from "@/app/lib/server/actions/actions"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dispatch, SetStateAction, useState } from "react"

const tagKeys = Object.values(ChatImageCategory)

export const getPatchImageRequest = (
  selectedTag: ChatImageCategory | null,
): PatchChatImageRequest => {
  if (selectedTag === null) {
    alert("Please select a tag")
    throw new Error("Please select a tag")
  }
  return { category: selectedTag }
}

export function TagDropdown({
  selectedTag,
  setSelectedTag,
}: {
  selectedTag: ChatImageCategory | null
  setSelectedTag: Dispatch<SetStateAction<ChatImageCategory | null>>
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant="ghost"
          size="lg"
          className={`border border-muted-foreground`}
        >
          Tag: {selectedTag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <>
          {tagKeys.map((tag) => (
            <DropdownMenuItem
              key={tag}
              onClick={() => setSelectedTag(tag ?? "")}
            >
              {tag}
            </DropdownMenuItem>
          ))}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SaveTagsButton({
  chatbotID,
  imageID,
  selectedTag,
}: {
  chatbotID: string
  imageID: string
  selectedTag: ChatImageCategory | null
}) {
  const [loading, setLoading] = useState(false)

  const handleSaveTags = async () => {
    setLoading(true)
    await patchChatImage(chatbotID, imageID, getPatchImageRequest(selectedTag))
    setLoading(false)
  }

  return (
    <Button onClick={handleSaveTags}>
      {loading && "Saving..."}
      {!loading && "Save"}
    </Button>
  )
}

export function TagSelector({
  chatbotID,
  imageID,
  existingTag,
}: {
  chatbotID: string
  imageID: string
  existingTag: ChatImageCategory | null
}) {
  const [selectedTag, setSelectedTag] = useState<ChatImageCategory | null>(
    existingTag,
  )

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <TagDropdown
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <SaveTagsButton
          chatbotID={chatbotID}
          imageID={imageID}
          selectedTag={selectedTag}
        />
      </div>
    </div>
  )
}
