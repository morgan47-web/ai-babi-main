"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"
import Tokens from "../tokens"
import UnlockDialog from "../dialog/unlock"
import { useState } from "react"
import OutlinedHeart from "../icons/outlined-heart"
import { useUser } from "@/app/context/user"
import { unlockChatbot } from "@/app/lib/server/actions/actions"
import { Loader } from "@/components/ui/loader"
import { StatusCodes } from "http-status-codes"
import { Trans } from "@lingui/react/macro"

interface Props extends VariantProps<typeof buttonVariants> {
  price: number
  chatbotID: string
  chatbotName: string
  chatbotLocked: boolean
  text: string
  className?: string
  onUnlock?: () => void
}

export default function UnlockChatbotButton({
  variant,
  size,
  price,
  chatbotID,
  chatbotName,
  chatbotLocked,
  onUnlock,
  className,
  text,
}: Props) {
  const user = useUser()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [locked, setLocked] = useState(chatbotLocked)
  const [loading, setLoading] = useState(false)

  const unlock = async (displayWarning?: boolean) => {
    if (!user) return
    setLoading(true)
    await unlockChatbot(chatbotID, displayWarning).then((res) => {
      if (res.ok) {
        user.setUser((prevState) => ({
          ...prevState,
          subscription: {
            ...prevState.subscription,
            tokens: res.data
              ? res.data.newBalance
              : prevState.subscription.tokens - price,
          },
        }))
        setLocked(false)
        if (onUnlock) onUnlock()
      } else if (res.code == StatusCodes.PAYMENT_REQUIRED) {
        alert(<Trans>You don&apos;t have enough tokens.</Trans>)
      } else if (res.code == StatusCodes.FORBIDDEN) {
        alert(<Trans>Subscribe to unlock this chatbot.</Trans>)
      }
    })
    setLoading(false)
  }

  const handleClick = async () => {
    if (
      !user?.user.subscription.tokens ||
      user?.user.subscription.tokens < price
    ) {
      alert(<Trans>You don&apos;t have enough tokens.</Trans>)
      return
    }
    if (user?.user.preferences.displayUnlockWarning != false) {
      setDialogOpen(true)
      return
    }
    unlock()
  }

  return (
    <>
      {locked ? (
        <>
          <Button
            id="unlock-chatbot-button"
            variant={variant}
            size={size}
            className={cn("gap-1", className)}
            onClick={handleClick}
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                {text}
                <Tokens amount={price} size={16} />
              </>
            )}
          </Button>
          <UnlockDialog
            chatbotName={chatbotName}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            price={price}
            onClose={(checked) => unlock(!checked)}
          />
        </>
      ) : (
        <OutlinedHeart />
      )}
    </>
  )
}
