"use client"

import { useToaster } from "@/app/context/toaster"
import { useUser } from "@/app/context/user"
import { updateCustomChatbot } from "@/app/lib/server/actions/actions"
import { isInitialized } from "@/app/lib/user-guard"
import { Pen } from "@/components/icons/generated"
import EditText from "@/components/icons/generated/EditText"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Trans, useLingui } from "@lingui/react/macro"
import React from "react"

export default function RenameChatbotDialog({
  chatbotID,
  chatbotName,
  ownerID,
}: {
  chatbotID: string
  chatbotName: string
  ownerID?: string | null
}) {
  const newNameRef = React.useRef<HTMLInputElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [open, onOpenChange] = React.useState(false)
  const toaster = useToaster()
  const { t } = useLingui()
  const { user } = useUser()

  const getErrorMessage = (code: number) => {
    switch (code) {
      case 400:
        return t`The name is too long`
      default:
        return ""
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!newNameRef.current?.value) return
    e.preventDefault()
    setLoading(true)
    await updateCustomChatbot(chatbotID, {
      displayName: newNameRef.current.value,
    }).then((res) => {
      if (res.ok) {
        setLoading(false)
        onOpenChange(false)
      } else {
        setLoading(false)
        onOpenChange(false)
        toaster.addMessage(
          "rename-chatbot",
          "error",
          t`Error`,
          getErrorMessage(res.code),
        )
      }
    })
  }

  if (!isInitialized(user) || user.id !== ownerID) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <EditText height={26} width={34} />
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={`
            mx-2 flex w-[340px] flex-col rounded-lg py-4
            shadow-[0px_1px_40px_0px_#4B4B4B]
          `}
        >
          <DialogTitle className="text-center text-2xl">
            <Trans>
              Rename your <span className="text-secondary">{" AI Babe "}</span>
            </Trans>
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
              placeholder={chatbotName}
              ref={newNameRef}
              disabled={loading}
            />
          </div>
          <Button className="h-10 w-full rounded-full" onClick={handleSubmit}>
            {loading ? <Spinner loading={loading} /> : <Trans>Rename</Trans>}
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
