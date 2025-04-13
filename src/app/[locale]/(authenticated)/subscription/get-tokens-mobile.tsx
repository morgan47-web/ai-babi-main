"use client"

import BuyAddonsButton from "@/app/components/actions/truevo/buy-addons"
import { NoAdultsTransaction } from "@/app/components/profile/subscription-footer"
import OneTimePaymentCard from "@/app/components/profile/v2/one-time-payment-card"
import { usePricing } from "@/app/context/pricing"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { displayTokenAmount } from "@/app/lib/tokens"
import { Trans } from "@lingui/react/macro"
import { useState } from "react"

export default function GetTokensMobile() {
  const pricing = usePricing()
  const [selected, setSelected] = useState("1")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop === undefined) {
    return null
  }

  return (
    <div className={`grid h-full w-full grid-cols-1 grid-rows-[1fr,auto]`}>
      <div
        className={`
          relative flex h-full w-full flex-col items-center justify-start gap-2
          space-y-1 overflow-auto
        `}
      >
        <div className="flex flex-col space-y-1 px-2 pt-4">
          <h1
            className={`
              w-full text-start text-[24px] leading-[30px] text-white-secondary
            `}
          >
            <Trans>Get tokens</Trans>
          </h1>
          <h5 className="text-sm leading-[20px] text-tertiary-text">
            <Trans>
              Buy Tokens as a one-off purchase. No commitment, no strings
              attached, no expiration date.
            </Trans>
          </h5>
        </div>
        <div className="flex w-full flex-col items-center space-y-2 px-1 py-2">
          {pricing?.state.addons.map((plan, i) => (
            <OneTimePaymentCard
              key={"plan" + plan.id}
              diamonds={Math.min(4, i + 1)}
              tokens={displayTokenAmount(plan.tokens)}
              displayPrice={plan.displayPrice}
              selected={selected === plan.id}
              onClick={() => {
                setSelected(plan.id)
              }}
              discount={plan.discount ?? undefined}
            />
          ))}
        </div>
      </div>

      <div
        className={`
          flex w-full flex-col items-center justify-center gap-2 border-t
          border-divider px-4 py-3
        `}
      >
        <BuyAddonsButton
          price={
            pricing?.state.addons.find((p) => p.id === selected)
              ?.displayPrice ?? "0"
          }
          productName={
            pricing?.state.addons.find((p) => p.id === selected)?.displayName ??
            "UNKNOWN"
          }
          productID={
            pricing?.state.addons.find((p) => p.id === selected)?.id ?? ""
          }
        />
        <NoAdultsTransaction />
      </div>
    </div>
  )
}
