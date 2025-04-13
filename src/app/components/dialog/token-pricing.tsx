"use client"

import { CoinIcon } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import { useUser } from "@/app/context/user"
import { isSubscribed, isSubscribedOrTrial } from "@/app/lib/user-guard"
import { useRouter } from "next/navigation"
import { Trans } from "@lingui/react/macro"

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between py-[8px]">
      <p className="flex text-sm font-extrabold">{label}</p>
      <div className="flex items-center gap-1 leading-none">
        <p className="font-extrabold">{value}</p>
        <CoinIcon width={16} height={16} />
      </div>
    </div>
  )
}

interface Props {
  onClose: () => void
}

export function TokenPricing({ onClose }: Props) {
  const { push } = useRouter()
  const { user } = useUser()

  return (
    <div
      className={`
        flex w-[230px] flex-col rounded-xl border border-trigger-border
        bg-trigger p-2
      `}
    >
      <LineItem label="Generated Image" value="1" />
      <LineItem label="Chat Message" value={isSubscribed(user) ? "0" : "0.1"} />
      {isSubscribedOrTrial(user) ? (
        <Button
          onClick={() => {
            onClose()
            push("/subscription")
          }}
          className="mt-2 w-full rounded-full"
        >
          <Trans>Get tokens</Trans>
        </Button>
      ) : (
        <Button
          variant={"secondary"}
          onClick={() => {
            onClose()
            push("/subscription")
          }}
          className="mt-2 w-full rounded-full"
        >
          <Trans>Become Premium</Trans>
        </Button>
      )}
    </div>
  )
}

export default TokenPricing
