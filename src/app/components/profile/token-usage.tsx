"use client"

import { CoinIcon } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useUser } from "@/app/context/user"
import { displayTokenAmount } from "@/app/lib/tokens"
import { Trans, useLingui } from "@lingui/react/macro"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function TokenUsage() {
  const router = useRouter()
  const { t } = useLingui()
  const [tokensWidth, setTokensWidth] = useState("0")
  const user = useUser()

  function printDate(date?: Date) {
    if (!date) return ""
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  function getPercentage(current?: number, total?: number) {
    if (!current || !total) return "0"
    return Math.min((current / total) * 100, 100).toFixed(0)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTokensWidth(getPercentage(user?.user.subscription.tokens, 2000))
    })
    return () => clearTimeout(timeout)
  }, [user?.user.subscription.tokens])

  return (
    <Card className="space-y-4 rounded-xl border border-divider bg-card p-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">
          <Trans>Remaining tokens</Trans>
        </h4>
        <div className="flex items-center gap-2">
          <span>{`${displayTokenAmount(user?.user.subscription.tokens)} / 200`}</span>
          <CoinIcon width={22} height={22} />
        </div>
      </div>
      <div className="h-1 rounded-full bg-border">
        <div
          className={`h-full rounded-full bg-primary`}
          style={{
            width: `${tokensWidth}%`,
            transition: "width 0.5s",
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {`${user?.user.subscription.status === "canceled" ? t`Cancels on` : t`Renews on`} ${printDate(user?.user.subscription.termEnd)}`}
        </p>
        <Button
          onClick={() => {
            router.push("/subscription?tab=buy-tokens")
          }}
          variant="secondary"
        >
          <p>
            <Trans>Buy more tokens</Trans>
          </p>
          <CoinIcon width={16} height={16} />
        </Button>
      </div>
    </Card>
  )
}
