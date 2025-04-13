"use client"
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useUser } from "@/app/context/user"
import Wand from "@/components/icons/generated/Wand"
import {
  MagnifyingGlass,
  Peach,
  VideoGallery,
} from "@/components/icons/generated"
import { useDialogs } from "@/app/context/dialog"
import { isSignedUp } from "@/app/lib/user-guard"
import { Trans } from "@lingui/react/macro"

const links = [
  {
    name: <Trans>Explore</Trans>,
    href: "/",
    icon: MagnifyingGlass,
    requiresLogin: false,
  },
  {
    name: <Trans>Reels</Trans>,
    href: "/reels",
    icon: VideoGallery,
    requiresLogin: false,
  },
  {
    name: <Trans>Chat</Trans>,
    href: "/messages",
    icon: MessageCircle,
    requiresLogin: true,
  },
  {
    name: <Trans>Babes</Trans>,
    href: "/babes",
    icon: Peach,
    requiresLogin: false,
  },
  {
    name: <Trans>Generate</Trans>,
    href: "/generator",
    icon: Wand,
    requiresLogin: false,
  },
]

function MobileNavLinks() {
  const { user } = useUser()
  const pathname = usePathname()
  let pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
  pathnameWithoutLocale = pathnameWithoutLocale ? pathnameWithoutLocale : "/"
  const dialogs = useDialogs()

  return (
    <div
      className={`
        grid w-full grid-cols-5 items-center justify-between gap-1

        md:flex md:h-full md:flex-col md:items-stretch md:justify-start
        md:space-y-2 md:px-0 md:py-4
      `}
    >
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathnameWithoutLocale === link.href
        const disabled = link.requiresLogin && !isSignedUp(user)

        return (
          <div
            className={`
              flex flex-col items-center justify-center

              md:w-full md:flex-row
            `}
            key={link.href}
          >
            <Link
              href={disabled ? "#" : link.href}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault()
                  dialogs.setSignupOpen(true)
                }
              }}
              className={cn(
                `
                  relative inline-flex h-[32px] w-8 items-center justify-center
                  justify-center rounded-full bg-trigger py-2

                  md:w-full md:justify-start md:px-3 md:py-5 md:text-lg
                  md:hover:bg-primary/30
                `,
                {
                  "bg-primary md:hover:bg-primary/80": isActive,
                },
              )}
            >
              <LinkIcon
                height={22}
                width={22}
                className={cn(
                  `
                    w-8 text-primary-foreground

                    md:w-7
                  `,
                )}
              />
              <p
                className={cn(
                  `
                    ml-2 hidden transition-all

                    md:block
                  `,
                  isActive && "font-bold",
                )}
              >
                {link.name}
              </p>
            </Link>
            <p
              className={cn(
                `
                  block text-sm text-border transition-all

                  md:hidden
                `,
                isActive && "font-extrabold text-primary",
              )}
            >
              {link.name}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default MobileNavLinks
