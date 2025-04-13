import { Button } from "@/components/ui/button"
import { Wand } from "lucide-react"
import Link from "next/link"

export default function RemixButton({
  url,
  chatbotId,
}: {
  url: string
  chatbotId: string
}) {
  const imageName = url.split("/").pop()?.split("?")[0]
  console.log(imageName)
  return (
    <Link
      id="reels-generate-button"
      href={`/generator?character=${chatbotId}&imageName=${imageName}`}
    >
      <Button
        className={`
          h-8 w-8 rounded-full backdrop-blur-1 bg-secondary p-0

          hover:bg-secondary/80

          md:hover:bg-secondary/80
        `}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Wand />
      </Button>
    </Link>
  )
}
