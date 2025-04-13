"use client"

import Wand from "@/components/icons/generated/Wand"
import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"
import { useRouter } from "next/navigation"

export default function EmptyGallery() {
  const { push } = useRouter()

  return (
    <div
      className={`
        mx-auto flex w-full max-w-3xl flex-col items-center justify-center
        space-y-3 pb-20

        lg:max-w-4xl
      `}
    >
      <p className="text-sm font-semibold text-neutral-400">
        <Trans>You have no images in gallery yet.</Trans>
      </p>
      <Button
        variant={"secondary"}
        className="h-8 flex-1 gap-2 p-2"
        onClick={() => push(`/generator`)}
      >
        <Trans>Generate Images</Trans>
        <Wand width={20} height={20} />
      </Button>
    </div>
  )
}
