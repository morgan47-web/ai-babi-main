"use client"

import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"
import { useRouter } from "next/navigation"

export default function NoMessages() {
  const { push } = useRouter()

  return (
    <div
      className={`
        mx-auto flex w-full max-w-3xl flex-col items-center justify-center
        space-y-3 p-2

        lg:max-w-4xl
      `}
    >
      <p className="text-center text-sm font-semibold text-neutral-400">
        <Trans>
          You have no messages from our babes. Start a new chat now!
        </Trans>
      </p>
      <Button className="h-8 flex-1 gap-2 p-2" onClick={() => push(`/`)}>
        <Trans>Explore Babes</Trans>
      </Button>
    </div>
  )
}
