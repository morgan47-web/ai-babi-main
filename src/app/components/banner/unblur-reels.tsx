"use client"

import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"
import { useRouter } from "next/navigation"

export default function UnblurBenefits() {
  const { push } = useRouter()

  return (
    <div
      className={`
        absolute left-0 right-0 top-[50%] m-4 mb-10 flex -translate-y-1/2
        flex-col items-center justify-center gap-4 text-shadow-lg
      `}
    >
      <h1
        className={`
          text-center text-xl font-bold text-white

          md:text-center md:text-5xl
        `}
      >
        <Trans>Do you want to unlock NSWF reels?</Trans>
      </h1>
      <Button
        variant={"secondary"}
        className="h-10 w-full rounded-full"
        onClick={() => push("/subscription")}
      >
        <Trans>Unblur NOW</Trans>
      </Button>
    </div>
  )
}
