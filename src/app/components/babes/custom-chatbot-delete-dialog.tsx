"use client"

import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import { ThrashBin } from "@/components/icons/generated"
import { Trans } from "@lingui/react/macro"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { isPremiumGuard } from "@/app/lib/user-guard"
import { useUser } from "@/app/context/user"
import { useDialogs } from "@/app/context/dialog"
import { PremiumDialogType } from "../dialog/dialog-types"
import { deleteCustomChatbot } from "@/app/lib/server/actions/actions"
import { Spinner } from "@/components/ui/spinner"

interface Props {
  chatbotID: string
  chatbotName: string
}

export default function DeleteChatbotDialog({ chatbotID, chatbotName }: Props) {
  const [loading, setLoading] = React.useState(false)
  const { user } = useUser()
  const dialog = useDialogs()

  const handleSubmit = async () => {
    if (!isPremiumGuard(user, dialog, PremiumDialogType.babes)) return
    setLoading(true)
    await deleteCustomChatbot(chatbotID)
    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="h-[42px] w-[42px] !p-0">
          <ThrashBin width={24} height={24} />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={`
            flex w-[340px] flex-col rounded-lg p-8 pb-4
            shadow-[0px_1px_40px_0px_#4B4B4B]
          `}
        >
          <DialogTitle className="text-center text-2xl">
            <Trans>
              Are you sure you want to delete{" "}
              <span className="text-secondary">{chatbotName}</span>
            </Trans>
          </DialogTitle>
          <p className="text-sm text-tertiary-text">
            <Trans>
              This action is not reversible. All the conversations and images
              will be lost.
            </Trans>
          </p>
          <Button
            className="h-8 w-full rounded-full text-lg text-bold mt-2"
            variant={"secondary"}
            onClick={handleSubmit}
          >
            {loading ? <Spinner loading={loading} /> : <Trans>Delete</Trans>}
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
