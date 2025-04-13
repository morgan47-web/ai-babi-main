"use client"

import PlusCircle from "@/components/icons/generated/PlusCircle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BabeCreationStorageKey } from "./create/creator-tabs"
import { Trans } from "@lingui/react/macro"

export default function NewBabeButton() {
  return (
    <Link
      href="/babes/create"
      className={`
        h-16 w-full rounded-2

        md:col-span-2
      `}
    >
      <Button
        variant="secondary"
        className="flex h-full w-full flex-col rounded-lg"
        onClick={() => {
          localStorage.removeItem(BabeCreationStorageKey)
        }}
      >
        <PlusCircle width={25} height={25} />
        <Trans>Create new AI Babe</Trans>
      </Button>
    </Link>
  )
}
