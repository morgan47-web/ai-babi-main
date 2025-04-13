"use client"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import React from "react"
import Image from "next/image"
import Cookies from "js-cookie"
import { useUser } from "@/app/context/user"
import { Trans } from "@lingui/react/macro"

export enum Preference {
  girls = "girls",
  anime = "anime",
}

interface Props {
  open?: boolean
  setOpen: (open: boolean) => void
}

export default function PreferenceDialog({ open = false, setOpen }: Props) {
  const { setUser } = useUser()

  const handleClose = (pref: Preference) => {
    setOpen(false)
    Cookies.set("preferences", pref, {
      expires: 365 * 100,
      path: "/",
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    })
    setUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        displayGirls: pref === Preference.girls,
        displayAnime: pref === Preference.anime,
      },
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          onInteractOutside={(event) => {
            event.preventDefault()
          }}
          className="w-[250px] flex-col border border-primary"
        >
          <DialogTitle className="text-center">
            <Trans>I&apos;m interested in:</Trans>
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <Image
              onClick={() => handleClose(Preference.girls)}
              src="/images/preference-girls.png"
              alt="Preference Girls"
              width={230}
              height={160}
              priority
            />
            <Image
              onClick={() => handleClose(Preference.anime)}
              src="/images/preference-anime.png"
              alt="Preference Anime"
              width={230}
              height={160}
              priority
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
