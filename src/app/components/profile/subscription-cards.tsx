"use client"

import { usePricing } from "@/app/context/pricing"
import { SubscriptionSkeleton } from "../skeletons/profile"
import SubscriptionCard from "@/app/components/profile/v2/subscription-card"

export default function SubscriptionCards({
  selected,
  setSelected,
  currentPlanID,
}: {
  selected: string
  setSelected: (id: string) => void
  currentPlanID?: string
}) {
  const pricing = usePricing()

  const subscriptions = pricing?.state.subscriptions
  if (!subscriptions || subscriptions.length == 0)
    return <SubscriptionSkeleton />

  return (
    <div
      className={`
        flex w-full flex-col gap-2 py-2

        md:flex-row md:justify-center md:gap-6
      `}
    >
      {subscriptions.map((sub) => (
        <SubscriptionCard
          id={"subscription-card-" + sub.displayName}
          plan={sub}
          onClick={() => {
            if (!currentPlanID) setSelected(sub.id)
          }}
          key={sub.id}
          currentPlan={currentPlanID === sub.id}
          selected={selected == sub.id}
        />
      ))}
    </div>
  )
}
