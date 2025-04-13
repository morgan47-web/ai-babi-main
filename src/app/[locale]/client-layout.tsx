"use client"

import SideNav, { sideBarHidden } from "@/app/components/layout/side-nav"
import Header, { headerHidden } from "../components/layout/header/header"
import NavBar, { mobileNavbarHidden } from "../components/layout/navbar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getMobileGridLayout = () => {
    if (headerHidden(pathname) && mobileNavbarHidden(pathname)) {
      return "grid-rows-1"
    } else if (!headerHidden(pathname) && mobileNavbarHidden(pathname)) {
      return "grid-rows-[auto_1fr]"
    } else if (headerHidden(pathname) && !mobileNavbarHidden(pathname)) {
      console.log("grid-rows-[1fr_auto]")
      return "grid-rows-[1fr_60px]"
    }
  }

  return (
    <div
      style={{
        height: "100dvh",
      }}
      className={cn(
        `
          max-w-screen grid grid-rows-[auto_1fr_60px]

          md:grid-cols-[250px_1fr] md:grid-rows-[auto_1fr]
        `,
        getMobileGridLayout(),
        {
          "md:grid-cols-1": sideBarHidden(pathname),
        },
      )}
    >
      {!sideBarHidden(pathname) && (
        <div
          className={`
            hidden

            md:col-span-1 md:col-start-1 md:row-span-2 md:block
          `}
        >
          <SideNav />
        </div>
      )}
      {!headerHidden(pathname) && (
        <Header
          className={`
            sticky top-0

            md:col-span-1
          `}
        />
      )}
      <div
        className={`
          flex flex-col items-center overflow-x-hidden

          md:col-span-1
        `}
      >
        {children}
      </div>
      <div className={`md:hidden`}>
        <NavBar />
      </div>
    </div>
  )
}
