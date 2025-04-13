"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import UnlockChatbotButton from "../actions/unlock-chatbot-button"
import Link from "next/link"
import { Trans } from "@lingui/react/macro"

interface ChatbotActionsProps {
  chatbotID: string
  chatbotName: string
  unlockAllPrice: number
}

export default function ChatbotActions({
  chatbotID,
  chatbotName,
  unlockAllPrice,
}: ChatbotActionsProps) {
  return (
    <div className="flex gap-1">
      <Link href={`/messages/${chatbotID}`}>
        <Button className="h-6">
          <Trans>Chat</Trans>
        </Button>
      </Link>
      <UnlockChatbotButton
        variant="outline"
        size="lg"
        text="Unlock all content"
        price={unlockAllPrice}
        chatbotID={chatbotID}
        chatbotName={chatbotName}
        chatbotLocked={unlockAllPrice > 0}
        onUnlock={() => {
          window.location.reload()
        }}
      />
    </div>
  )
}
