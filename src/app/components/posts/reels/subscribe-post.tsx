"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import SubscriptionBenefits from "../../banner/subscription-benefits"
import { useUser } from "@/app/context/user"
import { BenefitsType } from "../../banner/benefit-types"

function SignupPost() {
  const { user } = useUser()
  return (
    <Card
      style={{
        backgroundImage: user.preferences.displayAnime
          ? "url('/images/wall/subscribe-anime.png')"
          : "url('/images/wall/subscribe-girls.png')",
      }}
      className={`
        relative h-full snap-center snap-always overflow-hidden rounded-none
        bg-cover bg-center bg-no-repeat

        md:aspect-[1/1.5]

        sm:rounded-md
      `}
    >
      <SubscriptionBenefits
        type={BenefitsType.reels}
        className="absolute bottom-0 left-0 right-0 m-4 mb-10"
      />
    </Card>
  )
}

export default SignupPost
