"use client"

import { PaymentAssurance } from "@/app/components/profile/subscription-footer"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { Trans } from "@lingui/react/macro"
import BuySubscriptionButton from "@/app/components/actions/truevo/buy-subscription"
import { useUser } from "@/app/context/user"
import { usePricing } from "@/app/context/pricing"
import { useState } from "react"
import Subscriptions from "@/app/components/profile/subscriptions"
import { isSubscribed } from "@/app/lib/user-guard"

export default function SubscriptionMobile() {
  const user = useUser()
  const pricing = usePricing()
  const [selected, setSelected] = useState(
    "28a14576-aacc-402d-b86d-fcbb834018b9",
  )
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop === undefined) {
    return null
  }

  return (
    <main className={`grid h-full w-full grid-cols-1 grid-rows-[1fr,auto]`}>
      <div
        className={`
          flex flex-col justify-start gap-2 space-y-2 overflow-y-auto
          overflow-x-hidden
        `}
      >
        <div className="flex flex-col space-y-1 px-2 pt-4">
          <h1
            className={`
              w-full text-start text-[24px] leading-[30px] text-white-secondary
            `}
          >
            <Trans>Become Premium</Trans>
          </h1>
          <h5 className="text-sm font-[400] leading-[20px] text-tertiary-text">
            <Trans>
              Get the best value—full premium features plus daily bonus tokens!
            </Trans>
          </h5>
        </div>
        <div className={`flex h-full w-full flex-col space-y-2 px-1`}>
          <Subscriptions selected={selected} setSelected={setSelected} />
        </div>
      </div>

      <div
        className={`
          flex w-full flex-col items-center justify-center gap-2 border-t
          border-divider px-4 py-3
        `}
      >
        <div className={`flex w-full flex-col justify-center space-y-2`}>
          {/* Payment Button */}
          <BuySubscriptionButton
            price={
              pricing?.state.subscriptions.find((p) => p.id === selected)
                ?.displayPrice || "0"
            }
            disabled={isSubscribed(user?.user)}
            planID={
              pricing?.state.subscriptions.find((p) => p.id === selected)?.id ??
              ""
            }
          />
        </div>
        <PaymentAssurance />
      </div>
    </main>
  )
}
