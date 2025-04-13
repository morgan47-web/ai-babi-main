"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import SignupBenefits from "../../banner/signup-benefits"
import { useUser } from "@/app/context/user"

function SignupPost() {
  const { user } = useUser()
  return (
    <Card
      style={{
        backgroundImage: user.preferences.displayAnime
          ? "url('/images/wall/signup-anime.png')"
          : "url('/images/wall/signup-girls.png')",
      }}
      className={`
        relative h-full snap-center snap-always overflow-hidden rounded-none
        bg-cover bg-center bg-no-repeat

        sm:rounded-md
      `}
    >
      <SignupBenefits />
    </Card>
  )
}

export default SignupPost
