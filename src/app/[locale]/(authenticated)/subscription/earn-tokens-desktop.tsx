"use client"

import { cn } from "@/lib/utils"
import { Trans } from "@lingui/react/macro"
import { Card } from "@/components/ui/card"
import EarnTokensCard from "@/app/components/profile/v2/earn-tokens-card"
import { CoinIcon } from "@/components/icons/generated"
import { Claimable } from "./earn-tokens"

export default function EarnTokensDesktop({
  claimables,
}: {
  claimables: Array<Claimable>
}) {
  return (
    <main
      className={cn(
        `flex w-full flex-1 flex-col items-center justify-top gap-4 p-4 px-5`,
      )}
    >
      <div className={`gap-2 text-center`}>
        <h1
          className={`
            flex items-center justify-center gap-2 text-[40px] text-[#D9D9D9]
          `}
        >
          <Trans>Earn Free Tokens</Trans>
          <CoinIcon height={30} width={30} />
        </h1>
        <h3 className={`text-2xl text-border/60`}>
          <Trans>
            Complete the challenges and earn free tokens that never expire!
          </Trans>
        </h3>
      </div>
      <Card
        className={`
          grid w-[900px] grid-cols-2 gap-2 rounded-[40px] border border-divider
          bg-[#111115] p-10
        `}
      >
        {claimables.map((claimable, i) => (
          <EarnTokensCard
            key={"earn-" + i}
            title={claimable.title}
            description={claimable.description}
            tokens={claimable.tokens}
            link={claimable.link}
            claimable={claimable.claimable}
            instructions={claimable.instructions}
            onClaim={claimable.onClaim}
            claimed={claimable.claimed}
          />
        ))}
      </Card>
    </main>
  )
}
