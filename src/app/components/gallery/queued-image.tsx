import { Generating } from "@/components/icons/generated"
import { Trans } from "@lingui/react/macro"
import Image from "next/image"

interface Props {
  chatbotAvatar: string
  eta: string
}

export default function QueuedImage({ chatbotAvatar, eta }: Props) {
  return (
    <div
      className={`
        group relative col-span-1 flex flex aspect-[1/1.5] flex-col items-center
        justify-center overflow-hidden rounded-lg bg-trigger text-xs font-bold
        leading-[20px] text-primary-foreground

        [text-shadow:_0_3px_7px_#000]
      `}
    >
      <Generating width="80%" height="20%" />
      <p>
        <Trans>Generating...</Trans>
      </p>
      <p>
        <Trans>Estimated wait time:</Trans>
      </p>
      <p>{eta}</p>
      <Image
        src={chatbotAvatar}
        fill
        alt="Queued image"
        sizes="33vw"
        className={`
          absolute rounded-lg bg-background object-cover opacity-20 blur-[2px]
          filter
        `}
      />
    </div>
  )
}
