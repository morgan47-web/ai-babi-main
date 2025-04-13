"use client"

import { Suspense, useEffect, useRef } from "react"
import SubscriptionCards from "./subscription-cards"
import { SubscriptionSkeleton } from "../skeletons/profile"
import { useUser } from "@/app/context/user"
import { usePricing } from "@/app/context/pricing"
import { isSubscribed } from "@/app/lib/user-guard"

export default function Subscriptions({
  selected,
  setSelected,
}: {
  selected: string
  setSelected: (id: string) => void
}) {
  const user = useUser()
  const pricing = usePricing()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  if (!pricing?.state.subscriptions) return <SubscriptionSkeleton />

  return (
    <Suspense fallback={<SubscriptionSkeleton />}>
      <SubscriptionCards
        selected={selected}
        setSelected={setSelected}
        currentPlanID={
          isSubscribed(user?.user) ? user?.user.subscription.externalId : ""
        }
      />
    </Suspense>
  )
}
