"use client"

import { BenefitsType } from "@/app/components/banner/benefit-types"
import SubscriptionBenefits from "@/app/components/banner/subscription-benefits"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { gtag } from "ga-gtag"
import { Trans } from "@lingui/react/macro"

export default function Thanks() {
  const sendPurchaseGTag = async () => {
    const searchParams = new URLSearchParams(window.location.search)
    gtag("event", "purchase", {
      value: searchParams.get("value"),
      currency: searchParams.get("currency"),
    })
  }

  const sendTrackerEvent = async () => {
    const tracker = Cookies.get("tracker")
    if (!tracker) {
      return
    }
    fetch(
      `http://syndication.exoclick.com/tag.php?goal=ba6c3148c9d67d1826d825496aeed631&tag=${tracker}`,
    )
  }

  useEffect(() => {
    sendPurchaseGTag()
    sendTrackerEvent()
  }, [])

  return (
    <div
      className={`
        flex w-full flex-col items-center justify-center space-y-2 p-2 pt-8
      `}
    >
      <div
        className={`
          relative h-[206px] w-[341px] rounded-2xl

          md:h-[300px] md:w-[500px]
        `}
      >
        <Image
          src="/images/thank-you.png"
          alt="thank you"
          fill
          className="rounded-2xl object-cover object-center"
        />
      </div>
      <SubscriptionBenefits type={BenefitsType.subscription} hideButton />
      <Link href="/">
        <Button className="h-8 w-[320px] rounded-full">
          <Trans>Explore babes</Trans>
        </Button>
      </Link>
      <p className="text-sm text-bold text-center">
        <Trans>
          Also don’t forget to
          <a
            href={"https://discord.gg/huXHvzvKGz"}
            className="text-center text-sm text-primary"
            target="_blank"
            rel="noreferrer"
          >
            join our discord.
          </a>
        </Trans>
      </p>
    </div>
  )
}
