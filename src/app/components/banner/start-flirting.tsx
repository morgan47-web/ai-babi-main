"use client"

import { useUser } from "@/app/context/user"
import Image from "next/image"
import AppRatingDialog from "../dialog/app-rating"
import { useState } from "react"
import {
  isInitialized,
  isSignedUp,
  isSubscribed,
  isSubscribedOrTrial,
  signupGuard,
} from "@/app/lib/user-guard"
import BecomePremiumHeading from "../profile/premium-heading"
import { useDialogs } from "@/app/context/dialog"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { cn } from "@/lib/utils"

const StartFlirting = () => {
  const { user } = useUser()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const dialogs = useDialogs()
  const router = useRouter()

  return (
    <>
      {isDesktop ? (
        <Image
          id="start-flirting-banner"
          src="/images/create-ai-babe.jpg"
          alt="Start Flirting"
          className={`
            cursor-pointer object-cover

            md:rounded-[16px]
          `}
          onClick={() => {
            if (!signupGuard(user, dialogs)) return
            router.push("/babes/create")
          }}
          fill
          sizes="80vw"
        />
      ) : (
        <Image
          id="start-flirting-banner"
          src="/images/create-ai-babe-mobile.jpg"
          alt="Start Flirting"
          className={`
            cursor-pointer object-cover

            md:rounded-[16px]
          `}
          onClick={() => {
            dialogs.setSignupOpen(true)
          }}
          fill
          sizes="100vw"
        />
      )}
    </>
  )
}

export default function ExplorePageBanner() {
  const user = useUser()
  const [appRatingDialog, setAppRatingDialog] = useState(false)
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const getBanner = () => {
    if (!isInitialized(user?.user))
      return <Skeleton className="h-full w-full" />

    if (!isSignedUp(user?.user)) {
      return <StartFlirting />
    } else if (!isSubscribedOrTrial(user?.user))
      return (
        <BecomePremiumHeading onclick={() => router.push("/subscription")} />
      )
    else if (!user?.user.feedback_given && isSubscribed(user?.user)) {
      return (
        <AppRatingDialog
          dialogOpen={appRatingDialog}
          setDialogOpen={setAppRatingDialog}
        />
      )
    } else {
      return <StartFlirting />
    }
  }

  return (
    <div
      className={cn(
        `relative m-2 w-full rounded-[16px]`,
        isSignedUp(user?.user) && !isSubscribedOrTrial(user?.user)
          ? isDesktop
            ? "h-[75px]"
            : "h-[160px]"
          : `
            h-[160px]

            md:h-[25vh]
          `,
      )}
    >
      {getBanner()}
    </div>
  )
}
