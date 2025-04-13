"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import Tokens from "../../tokens"
import { ChevronDown, ChevronUp } from "lucide-react"
import TokenPricing from "../../dialog/token-pricing"

export default function SubscribedHeader({ tokens }: { tokens: number }) {
  const [overlayOpen, setOverlayOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-1 p-1"
        onClick={() => setOverlayOpen(!overlayOpen)}
      >
        <Tokens amount={tokens >= 0 ? tokens : 0} size={18} />
        {overlayOpen ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {overlayOpen && (
        <TokenPricing
          onClose={() => {
            setOverlayOpen(false)
          }}
        />
      )}
    </>
  )
}
