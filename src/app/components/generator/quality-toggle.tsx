import { useUser } from "@/app/context/user"
import { isPremiumGuard } from "@/app/lib/user-guard"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import PremiumFeature from "../icons/premium-feature"
import { useDialogs } from "@/app/context/dialog"
import { ImageGenerationQuality } from "@/app/lib/generated/models/ImageGenerationQuality"
import { PremiumDialogType } from "../dialog/dialog-types"
import { Trans } from "@lingui/react/macro"

export default function QualityToggle({
  quality,
  setQuality,
}: {
  quality: ImageGenerationQuality
  setQuality: (value: ImageGenerationQuality) => void
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
      defaultValue={ImageGenerationQuality.Low}
      value={quality}
      onValueChange={(value) => {
        if (value) setQuality(value as ImageGenerationQuality)
      }}
      className="justify-start gap-2"
    >
      <ToggleGroupItem
        value={ImageGenerationQuality.Low}
        className={`
          w-20 rounded-full

          md:w-18
        `}
      >
        <Trans>Low</Trans>
      </ToggleGroupItem>
      <ToggleGroupItem
        value={ImageGenerationQuality.High}
        className={`
          relative w-20 rounded-full

          disabled:cursor-not-allowed
        `}
        onClick={handlePremiumFeatureClick}
      >
        <Trans>High</Trans>
        <PremiumFeature />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
