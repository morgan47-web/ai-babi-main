"use client"

import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import GetTokensMobile from "./get-tokens-mobile"
import GetTokensDesktop from "./get-tokens-desktop"

export default function Subscription() {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop === undefined) {
    return null
  }

  return <>{isDesktop ? <GetTokensDesktop /> : <GetTokensMobile />}</>
}
