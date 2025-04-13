"use client"

import { useEffect } from "react"
import { PricingState, usePricing } from "./pricing"
import { getPrices } from "../lib/server/actions/actions"
import { useUser } from "./user"
import { isAdmin } from "../lib/user-guard"

const noPricing: PricingState = {
  addons: [],
  subscriptions: [],
}

export default function PricingInitializer() {
  const user = useUser()
  const pricing = usePricing()
  const { setState } = pricing!

  useEffect(() => {
    async function fetchUser() {
      const newPricing = { ...noPricing }

      const subscriptionResponse = await getPrices()
      if (subscriptionResponse.ok && subscriptionResponse.data) {
        newPricing.subscriptions =
          subscriptionResponse.data.subscriptions.filter((price) =>
            isAdmin(user?.user) ? price : !price.hidden,
          )
        newPricing.addons = subscriptionResponse.data.addons
      }

      setState(newPricing)
    }

    if (user?.user.initialized) fetchUser()
  }, [setState, user?.user])

  return null
}
