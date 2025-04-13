"use client"

import MobileNavLinks from "@/app/components/layout/mobile-nav-links"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const mobileNavbarHidden = (pathname: string) => {
  return (
    pathname.includes("/messages/") ||
    pathname.includes("/babes/create") ||
    pathname.includes("/babes/queue") ||
    pathname.includes("/preroll")
  )
}

function NavBar() {
  const pathname = usePathname()
  return (
    <div
      className={cn(
        `
          fixed bottom-0 z-50 flex h-12 w-full flex-1 flex-row items-stretch
          space-x-0 border-t-[0.1px] border-border/20 px-2
        `,
        mobileNavbarHidden(pathname) && `hidden`,
      )}
    >
      <MobileNavLinks />
    </div>
  )
}

export default NavBar
