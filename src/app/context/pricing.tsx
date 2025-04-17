"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AddonPrice,
  SubscriptionPrice,
  SubscriptionsApi,
} from "../lib/generated";

export interface PricingState {
  addons: AddonPrice[];
  subscriptions: SubscriptionPrice[];
}

export interface PricingContextValue {
  state: PricingState;
  setState: React.Dispatch<React.SetStateAction<PricingState>>;
}

const PricingContext = createContext<PricingContextValue | null>(null);

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context)
    throw new Error("usePricing must be used within PricingProvider");
  return context;
}

export default function PricingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<PricingState>({
    addons: [],
    subscriptions: [],
  });

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const api = new SubscriptionsApi();
        const res = await api.getPricesSubscriptionPricesGet();
        setState({
          subscriptions: res?.subscriptions?.filter((p) => !p.hidden) || [],
          addons: res?.addons?.filter((a) => !a.hidden) || [],
        });
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
      }
    };

    fetchPricing();
  }, []);

  return (
    <PricingContext.Provider value={{ state, setState }}>
      {children}
    </PricingContext.Provider>
  );
}
