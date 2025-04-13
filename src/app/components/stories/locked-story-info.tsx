import { Badge } from "@/components/ui/badge"
import Tokens from "../tokens"
import { ImageIcon } from "@/components/icons/generated"

interface LockedStoryInfoProps {
  price: number
  imageCount: number
}

export default function LockedStoryInfo({
  price,
  imageCount,
}: LockedStoryInfoProps) {
  return (
    <>
      <div
        className={`
          absolute inset-x-1 inset-y-1/2 flex items-center justify-center
        `}
      >
        <div className="flex flex-col items-center justify-center">
          <Tokens amount={price} size={14} />
        </div>
      </div>
      <Badge
        className={`
          absolute -right-3 -top-1 z-20 flex items-center gap-0.5 rounded-full
          border-none text-[8px] text-white
        `}
      >
        <span className="text-xs">{imageCount}</span>
        <ImageIcon width={14} height={14} />
      </Badge>
    </>
  )
}
