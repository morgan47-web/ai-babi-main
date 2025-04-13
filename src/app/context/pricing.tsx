"use client"

import React, { createContext, useContext, useState } from "react"
import { AddonPrice, SubscriptionPrice } from "../lib/generated"

export interface PricingState {
  addons: AddonPrice[]
  subscriptions: SubscriptionPrice[]
}

interface PricingContextValue {
  state: PricingState
  setState: React.Dispatch<React.SetStateAction<PricingState>>
}

const PricingContext = createContext<PricingContextValue | null>(null)

export function usePricing() {
  return useContext(PricingContext)
}

export default function PricingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<PricingState>({
    addons: [],
    subscriptions: [],
  })

  return (
    <PricingContext.Provider value={{ state, setState }}>
      {children}
    </PricingContext.Provider>
  )
}
