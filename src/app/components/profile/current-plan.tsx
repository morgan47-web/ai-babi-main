"use client"

import {
  isCanceledBeforeTermEnd,
  isInactiveOrTrial,
} from "@/app/lib/user-guard"
import CancelSubscriptionDialog from "../dialog/cancel/cancel-subscription"
import { useUser } from "@/app/context/user"
import { Trans } from "@lingui/react/macro"

export default function CurrentPlan() {
  const user = useUser()

  if (!user) return null

  const getPrice = () => {
    if (isInactiveOrTrial(user.user) || !user?.user.subscription.price)
      return "0.00"
    return (user?.user.subscription.price / 100).toFixed(2)
  }

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between pb-2">
        <p className="text-lg font-extrabold">
          {isInactiveOrTrial(user.user) ? (
            <Trans>Free</Trans>
          ) : (
            <Trans>Premium</Trans>
          )}
        </p>
        <span className="text-lg font-extrabold">
          {`$${getPrice()} / `}
          <Trans>month</Trans>
        </span>
        {!isCanceledBeforeTermEnd(user.user) && <CancelSubscriptionDialog />}
      </div>
    </div>
  )
}
