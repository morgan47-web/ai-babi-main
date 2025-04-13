"use client"

import { usePathname } from "next/navigation"
import React from "react"
import SignupButton from "@/app/components/actions/signup-button"
import LoginDialog from "@/app/components/dialog/auth/login"
import { useUser } from "@/app/context/user"
import { isInitialized, isSignedUp } from "@/app/lib/user-guard"
import HeaderMenu from "./menu"
import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Anime, Girls } from "@/components/icons/generated"
import { Trans } from "@lingui/react/macro"
import { Preference } from "../../dialog/preference-dialog"

function LoggedOutHeader() {
  return (
    <>
      <SignupButton />
      <LoginDialog />
    </>
  )
}

export const headerHidden = (pathname: string) => {
  return pathname.includes("/reels") || pathname.includes("/preroll")
}

export default function DesktopHeader() {
  const user = useUser()
  const pathname = usePathname()
  const shouldDisplayTypes =
    pathname.includes("/generator") ||
    pathname.includes("/reels") ||
    pathname.match(/\/[a-z]{2}$/i)

  return (
    <>
      <div
        className={`
          flex h-full items-center justify-between border-b border-divider pl-4
          pr-1
        `}
      >
        <div
          className={`
            flex w-full items-center gap-1

            md:gap-6
          `}
        >
          {shouldDisplayTypes && (
            <ToggleGroup
              className="gap-2"
              type="single"
              value={user?.user.mainPreference}
              onValueChange={(value) => {
                if (!value) return
                user.setUser({
                  ...user.user,
                  mainPreference:
                    value === Preference.girls
                      ? Preference.girls
                      : Preference.anime,
                })
              }}
            >
              <ToggleGroupItem
                variant={"header-toggle"}
                value={Preference.girls}
                className={`
                  flex items-center gap-1

                  data-[state=on]::text-secondary
                `}
              >
                <Girls />
                <Trans>Realistic</Trans>
              </ToggleGroupItem>
              <ToggleGroupItem
                variant={"header-toggle"}
                value={Preference.anime}
                className="flex items-center gap-1"
              >
                <Anime />
                <Trans>Anime</Trans>
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        </div>
        <div className="flex items-center justify-center gap-1">
          {!isInitialized(user?.user) ? (
            <Skeleton className="h-6 w-20 rounded-full" />
          ) : !isSignedUp(user?.user) ? (
            <LoggedOutHeader />
          ) : (
            <HeaderMenu />
          )}
        </div>
      </div>
    </>
  )
}
