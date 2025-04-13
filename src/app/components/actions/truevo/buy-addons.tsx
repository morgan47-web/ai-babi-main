"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { CreditCardIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import { Trans } from "@lingui/react/macro"
import { checkoutAddon } from "@/app/lib/server/actions/actions"

interface Props {
  productName: string
  productID: string
  price: string
}

export default function BuyAddonsButton({
  price,
  productName,
  productID,
}: Props) {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [action, setAction] = useState("")
  const [data, setData] = useState("")

  const trackerParams = `?utm_source=${Cookies.get("firstReferredFrom")}&utm_campaign=${Cookies.get("campaign")}&value=${price}&currency=USD`
  const apiBaseUrl = process.env.NEXT_PUBLIC_ZPPS_URL + "/v1"
  const approvedURL =
    apiBaseUrl + `/subscription/addons/callback/success` + trackerParams

  const declineURL =
    process.env.NEXT_PUBLIC_GUI_URL + "/declined" + trackerParams

  const handleBuy = async () => {
    setLoading(true)
    gtag("event", "begin_checkout", {
      currency: "USD",
      value: price,
      items: [
        {
          item_id: "addons_" + productID,
          item_name: productName,
        },
      ],
    })

    const promises = [checkoutAddon(productID, approvedURL, declineURL)]
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
      console.log("action", action)
      console.log("data", data)
      formRef.current.submit()
    }
  }, [action, data])

  return (
    <form
      target="_top"
      name="checkout-addons"
      className="flex h-8 w-full flex-col gap-2"
      method="POST"
      ref={formRef}
      action={action}
    >
      <input type="hidden" name="data" value={data} id="data" />
      <Button
        id="buy-addons"
        size="lg"
        className="h-8 w-full"
        type="button"
        onClick={() => handleBuy()}
      >
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <CreditCardIcon className="h-5 w-5" />
            <Trans>Pay with Credit / Debit Card</Trans>
          </>
        )}
      </Button>
    </form>
  )
}
