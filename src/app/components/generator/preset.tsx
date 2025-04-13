import Image from "next/image"
import { PromptTemplate } from "./templates"

interface Props {
  preset: PromptTemplate
  onClick: (preset: PromptTemplate) => void
}

export default function PresetOption({ preset, onClick }: Props) {
  return (
    <div
      id={"generator-preset-option-" + preset.name}
      onClick={() => onClick(preset)}
      className={`
        relative aspect-square h-18 w-18 rounded-lg

        focus:outline focus:outline-2 focus:outline-primary
      `}
      tabIndex={0}
    >
      <Image
        src={preset.imageSrc}
        alt={preset.prompt}
        fill
        sizes={"25vw"}
        className="rounded-lg object-cover object-top"
      />
      <p
        className={`
          absolute bottom-1 left-1 text-xs

          [text-shadow:_0_3px_7px_#000]
        `}
      >
        {preset.name}
      </p>
    </div>
  )
}
