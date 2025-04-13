"use client"

import { useUser } from "@/app/context/user"
import { patchUser } from "@/app/lib/server/actions/actions"
import { isInitialized } from "@/app/lib/user-guard"
import { Pen } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Trans } from "@lingui/react/macro"
import React from "react"

export default function RenameChatbotDialog() {
  const newNameRef = React.useRef<HTMLInputElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [open, onOpenChange] = React.useState(true)
  const { user } = useUser()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    await patchUser({
      username: newNameRef.current?.value,
      preferences: {
        usernameUpdated: true,
      },
    }).then(() => {
      setLoading(false)
      onOpenChange(false)
    })
  }

  if (!isInitialized(user) || user.preferences.usernameUpdated) {
    return null
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={`
            mx-2 flex w-[340px] flex-col rounded-lg py-4
            shadow-[0px_1px_40px_0px_#4B4B4B]
          `}
          showCloseButton={false}
        >
          <DialogTitle className="text-center text-2xl">
            <Trans>How should your babes call you?</Trans>
          </DialogTitle>
          <div className="relative space-y-1">
            <div
              className={`
                absolute left-2 top-[50%] translate-y-[-50%] transform
              `}
            >
              <Pen height={22} width={22} />
            </div>
            <Input
              className="h-10 border border-trigger-border pl-8"
              defaultValue={user?.username}
              ref={newNameRef}
              disabled={loading}
            />
          </div>
          <Button className="h-10 w-full rounded-full" onClick={handleSubmit}>
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              <Trans>Rename & Continue</Trans>
            )}
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
