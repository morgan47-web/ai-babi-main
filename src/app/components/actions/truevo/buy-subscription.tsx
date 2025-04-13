"use client"

import { checkout } from "@/app/lib/server/actions/actions"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { CreditCardIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import { Trans } from "@lingui/react/macro"

interface Props {
  price: string
  planID: string
  disabled?: boolean
  className?: string
}

export default function BuySubscriptionButton({
  price,
  planID,
  disabled,
  className,
}: Props) {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [action, setAction] = useState("")
  const [data, setData] = useState("")

  const trackerParams = `?utm_source=${Cookies.get("firstReferredFrom")}&utm_campaign=${Cookies.get("campaign")}&value=${price}&currency=EUR`
  const apiBaseUrl = process.env.NEXT_PUBLIC_ZPPS_URL + "/v1"
  const approvedURL =
    apiBaseUrl + `/subscription/callback/success` + trackerParams

  const declineURL =
    process.env.NEXT_PUBLIC_GUI_URL + "/declined" + trackerParams

  const handleBuySubscription = async () => {
    setLoading(true)
    gtag("event", "begin_checkout", {
      currency: "USD",
      value: price,
      items: [
        {
          item_id: planID,
          item_name: "Subscription " + planID,
        },
      ],
    })

    const promises = [checkout(planID, approvedURL, declineURL)]

    const [resp] = await Promise.all(promises)
    if (resp.error || !resp.data) {
      setLoading(false)
      return
    }
    setAction(resp.data.action)
    setData(resp.data.data)

    setLoading(false)
  }

  useEffect(() => {
    // If action and data are set, submit the form
    if (action && data && formRef.current) {
      formRef.current.submit()
    }
  }, [action, data])

  return (
    <form
      target="_top"
      name="form1"
      className="flex flex-col gap-2"
      method="POST"
      ref={formRef}
      action={action}
    >
      <input type="hidden" name="data" value={data} id="data" />
      <Button
        id="buy-subscription-button"
        size="lg"
        className={cn(
          "h-8 w-full rounded-full",
          {
            "bg-accent hover:bg-accent/90": disabled,
          },
          className,
        )}
        type="button"
        disabled={disabled}
        onClick={handleBuySubscription}
      >
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <CreditCardIcon />
            {!disabled ? (
              <Trans>Pay with Credit / Debit Card</Trans>
            ) : (
              <Trans>Plan upgrade is not supported</Trans>
            )}
          </>
        )}
      </Button>
    </form>
  )
}
