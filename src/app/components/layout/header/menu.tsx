"use client"
import { Exit, Gear, Landscape } from "@/components/icons/generated"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import Tokens from "../../tokens"
import { useState } from "react"
import TokenPricing from "../../dialog/token-pricing"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUser } from "@/app/context/user"
import CharacterAvatar from "../../character/character-avatar"
import { Trans } from "@lingui/react/macro"
import LanguagePicker from "./language-picker"

export default function HeaderMenu() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative h-8 gap-1 pr-2">
        <CharacterAvatar
          image={""}
          name={user?.username ?? ""}
          className={`h-6 w-6 border border-trigger-border text-sm text-border`}
        />
        {open ? (
          <CaretUpIcon width={20} height={20} />
        ) : (
          <CaretDownIcon width={20} height={20} />
        )}

        <Tokens amount={user.subscription.tokens} size={16} amountFirst />
        {user.hasUnseenImages && !open && (
          <div
            className={`
              absolute bottom-1 left-6 h-2 w-2 animate-pulse rounded-full
              bg-secondary duration-1000
            `}
          />
        )}
      </PopoverTrigger>

      <PopoverContent className="text-border">
        <div className="grid grid-cols-2 grid-cols-[auto_1fr] gap-2 p-2">
          <CharacterAvatar
            image={""}
            name={user?.username ?? ""}
            className="h-8 w-8 border border-trigger-border"
          />
          <div className="flex flex-col">
            <span className="text-sm">{user.username}</span>
            <span className="text-xs">{user.email}</span>
          </div>
        </div>
        <TokenPricing
          onClose={() => {
            setOpen(false)
          }}
        />
        <Link href="/gallery">
          <Button
            id="profile"
            variant={"ghost"}
            className={`relative w-full justify-start`}
            onClick={() => setOpen(false)}
          >
            <Landscape width={24} height={24} />
            <Trans>Your Gallery</Trans>
            {user.hasUnseenImages && (
              <div
                className={`
                  h-2 w-2 animate-pulse rounded-full bg-secondary duration-1000
                `}
              />
            )}
          </Button>
        </Link>
        <Link href="/profile">
          <Button
            id="profile"
            variant={"ghost"}
            className={`w-full justify-start`}
            onClick={() => setOpen(false)}
          >
            <Gear width={24} height={24} />
            <Trans>Settings</Trans>
          </Button>
        </Link>
        <div>
          <LanguagePicker variant={"mobile"} />
        </div>
        <Button
          id="logout"
          variant={"ghost"}
          className={`w-full justify-start text-destructive`}
          onClick={async () => {
            await fetch("/api/logout", {
              method: "POST",
              credentials: "include",
            })
            setOpen(false)
            window.location.reload()
          }}
        >
          <Exit height={24} width={24} />
          <Trans>Logout</Trans>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
