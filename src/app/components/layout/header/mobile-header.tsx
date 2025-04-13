"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import SignupButton from "@/app/components/actions/signup-button"
import LoginDialog from "@/app/components/dialog/auth/login"
import { useUser } from "@/app/context/user"
import { useHeader } from "@/app/context/header"
import { isInitialized, isSignedUp } from "@/app/lib/user-guard"
import HeaderMenu from "./menu"
import { CaretLeftIcon } from "@radix-ui/react-icons"
import Logo from "../../logo"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function MobileHeader() {
  const user = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const { historyOverride } = useHeader()

  return (
    <>
      <div className={`flex h-full items-center justify-between pl-4 pr-1`}>
        <div
          className={`
            flex w-full items-center gap-1

            md:gap-6
          `}
        >
          {pathname !== "/" && (
            <Button
              className="flex h-6 w-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                if (historyOverride) {
                  router.push(historyOverride)
                } else {
                  router.back()
                }
              }}
            >
              <CaretLeftIcon height={30} width={30} />
            </Button>
          )}
          <Logo height={30} width={100} />
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
