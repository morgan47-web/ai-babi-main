"use client"

import EarnTokensCard from "@/app/components/profile/v2/earn-tokens-card"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { Claimable } from "./earn-tokens"

export default function EarnTokensMobile({
  claimables,
}: {
  claimables: Array<Claimable>
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop === undefined) {
    return null
  }

  return (
    <main className={`h-full w-full`}>
      <div
        className={`
          relative flex h-full w-full flex-col items-center justify-start gap-2
          space-y-1 overflow-auto py-2
        `}
      >
        <div className="flex w-full flex-col items-center space-y-2 px-1">
          {claimables.map((claimable, i) => (
            <EarnTokensCard
              key={"earn-" + i}
              title={claimable.title}
              description={claimable.description}
              tokens={claimable.tokens}
              link={claimable.link}
              claimable={claimable.claimable}
              instructions={claimable.instructions}
              claimed={claimable.claimed}
              onClaim={claimable.onClaim}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
