"use client"

import TokenUsage from "@/app/components/profile/token-usage"
import CurrentPlan from "@/app/components/profile/current-plan"

export default function ActiveSubscription() {
  return (
    <div
      className={`
        mx-auto flex max-w-lg flex-col justify-between space-y-2

        md:space-y-4
      `}
    >
      <CurrentPlan />
      <TokenUsage />
    </div>
  )
}
