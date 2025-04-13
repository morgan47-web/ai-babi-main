"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import MobileHeader from "./mobile-header"
import DesktopHeader from "./desktop-header"

interface HeaderProps {
  className?: string
}

export const headerHidden = (pathname: string) => {
  return pathname.includes("/reels") || pathname.includes("/preroll")
}

export default function Header({ className }: HeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <header
      className={cn(
        `
          z-40 h-9 w-full bg-background

          md:h-14
        `,
        className,
      )}
    >
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </header>
  )
}
