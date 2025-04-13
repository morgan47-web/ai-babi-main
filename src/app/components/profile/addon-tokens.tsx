"use client"

import { usePricing } from "@/app/context/pricing"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Tokens from "../tokens"
import BuyAddonsButton from "../actions/truevo/buy-addons"
import { Trans } from "@lingui/react/macro"

function AddonTokens() {
  const pricing = usePricing()
  const [selected, setSelected] = useState(pricing?.state.addons[0].id)
  if (!pricing) return null

  return (
    <div className="flex w-full flex-col items-center space-y-2">
      <div className="grid w-full grid-cols-2 gap-2">
        {pricing.state.addons.map((plan, i) => (
          <Card
            tabIndex={i + 1}
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`
              relative flex h-20 flex-col items-center justify-center
              overflow-hidden rounded-lg border border-primary p-2
              transition-all

              focus:border-[2px] focus:border-primary focus:bg-active-card
            `}
          >
            <div
              className={`
                relative flex h-full flex-col items-center justify-center
                space-y-1
              `}
            >
              {plan.discount && (
                <span className="text-sm font-medium text-[#FFA31A]">
                  <Trans>+{plan.discount} bonus</Trans>
                </span>
              )}
              <div className="flex items-center justify-center gap-2">
                <Tokens
                  size={18}
                  className="text-xl font-bold"
                  amount={plan.tokens}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                <Trans>${plan.displayPrice}</Trans>
              </span>
            </div>
          </Card>
        ))}
      </div>
      <BuyAddonsButton
        price={
          pricing.state.addons.find((p) => p.id === selected)?.displayPrice ??
          "0"
        }
        productName={
          pricing.state.addons.find((p) => p.id === selected)?.displayName ??
          "UNKNOWN"
        }
        productID={
          pricing.state.addons.find((p) => p.id === selected)?.id ?? ""
        }
      />
    </div>
  )
}

export default AddonTokens
