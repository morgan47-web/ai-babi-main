"use server"

import { PricingState } from "@/app/context/pricing"
import { getPrices } from "./actions"

export async function fetchPricing() {
  const pricing: PricingState = {
    addons: [],
    subscriptions: [],
  }

  const subscriptionResponse = await getPrices()
  if (subscriptionResponse.ok && subscriptionResponse.data) {
    pricing.subscriptions = subscriptionResponse.data.subscriptions
    pricing.addons = subscriptionResponse.data.addons
  }

  return pricing
}
