"use client"

import { cn } from "@/lib/utils"
import Logo from "../logo"
import { usePathname } from "next/navigation"
import DesktopNavLinks from "./desktop-nav-links"

export const sideBarHidden = (pathname: string) => {
  return pathname.includes("/preroll")
}
function SideNav() {
  const pathname = usePathname()
  return (
    <div
      className={cn(
        `
          h-full w-[250px] flex-col justify-between border-r border-t-0
          border-border/20 px-6

          md:py-4
        `,
        sideBarHidden(pathname) ? `hidden` : "md:flex",
      )}
    >
      <div
        className={`
          mb-8

          md:visible md:block
        `}
      >
        <Logo className="px-6" width={200} height={80} />
      </div>
      <DesktopNavLinks />
    </div>
  )
}

export default SideNav
