"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type VariantProps } from "class-variance-authority"
import Tokens from "../tokens"
import { ReactNode, useState } from "react"
import { useUser } from "@/app/context/user"
import { unlockPost } from "@/app/lib/server/actions/actions"
import { Loader } from "@/components/ui/loader"
import { StatusCodes } from "http-status-codes"
import { UnlockResponse } from "@/app/lib/generated/models"
import { isPremiumGuard } from "@/app/lib/user-guard"
import { useDialogs } from "@/app/context/dialog"
import { PremiumDialogType } from "../dialog/dialog-types"
import { Trans } from "@lingui/react/macro"

interface Props extends VariantProps<typeof buttonVariants> {
  price: number
  postID: string
  className?: string
  onUnlock?: (resp: UnlockResponse) => void
  text?: ReactNode
}

export default function UnlockPostButton({
  variant,
  size,
  price,
  postID,
  onUnlock,
  className,
  text = <Trans>Unlock</Trans>,
}: Props) {
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const dialogs = useDialogs()

  const unlock = async () => {
    if (!user) return
    setLoading(true)
    const res = await unlockPost(postID)
    if (res.ok && res.data) {
      user.setUser((prevState) => ({
        ...prevState,
        subscription: {
          ...prevState.subscription,
          tokens: res.data
            ? res.data.newBalance
            : prevState.subscription.tokens - price,
        },
      }))
      if (onUnlock) {
        onUnlock(res.data)
      }
    } else if (res.code == StatusCodes.PAYMENT_REQUIRED) {
      alert(<Trans>You don&apos;t have enough tokens.</Trans>)
    } else if (res.code == StatusCodes.FORBIDDEN) {
      alert(<Trans>Subscribe to unlock this chatbot.</Trans>)
    }

    setLoading(false)
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    const subscribed = isPremiumGuard(
      user?.user,
      dialogs,
      PremiumDialogType.reels,
    )
    if (subscribed) unlock()
  }

  return (
    <>
      <Button
        id="unlock-post-button"
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
    </>
  )
}
