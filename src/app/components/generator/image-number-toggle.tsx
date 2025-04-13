"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import PremiumFeature from "../icons/premium-feature"
import { isPremiumGuard } from "@/app/lib/user-guard"
import { useUser } from "@/app/context/user"
import { useDialogs } from "@/app/context/dialog"
import { PremiumDialogType } from "../dialog/dialog-types"

export default function ImageNumberToggle({
  imageCount,
  setImageCount,
}: {
  imageCount: string
  setImageCount: (value: string) => void
}) {
  const user = useUser()
  const dialogs = useDialogs()

  const handlePremiumFeatureClick = (e: React.MouseEvent) => {
    if (!isPremiumGuard(user?.user, dialogs, PremiumDialogType.generator))
      e.preventDefault()
  }

  return (
    <ToggleGroup
      type="single"
      defaultValue="1"
      value={imageCount}
      onValueChange={(value) => {
        if (value) setImageCount(value)
      }}
    >
      <ToggleGroupItem
        id={"generator-image-count-toggle-1"}
        value="1"
        className="relative w-14"
      >
        1
      </ToggleGroupItem>
      <ToggleGroupItem
        id={"generator-image-count-toggle-2"}
        value="2"
        className="relative w-14"
        onClick={handlePremiumFeatureClick}
      >
        2
        <PremiumFeature />
      </ToggleGroupItem>
      <ToggleGroupItem
        id={"generator-image-count-toggle-3"}
        value="3"
        className="relative w-14"
        onClick={handlePremiumFeatureClick}
      >
        3
        <PremiumFeature />
      </ToggleGroupItem>
      <ToggleGroupItem
        id={"generator-image-count-toggle-4"}
        value="4"
        className="relative w-14"
        onClick={handlePremiumFeatureClick}
      >
        4
        <PremiumFeature />
      </ToggleGroupItem>
      <ToggleGroupItem
        id={"generator-image-count-toggle-5"}
        value="5"
        className="relative w-14"
        onClick={handlePremiumFeatureClick}
      >
        5
        <PremiumFeature />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
