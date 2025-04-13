"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import React from "react"
import { Checkmark } from "@/components/icons/generated"
import Checkbox from "@/components/ui/check-box"
import Tokens from "../tokens"
import { Trans, useLingui } from "@lingui/react/macro"

interface Props {
  chatbotName: string
  price: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: (checked: boolean) => void
}

function LineItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Checkmark />
      <p className="text-sm">{text}</p>
    </div>
  )
}

export default function UnlockDialog({
  chatbotName,
  open,
  onOpenChange,
  onClose,
  price,
}: Props) {
  const [checked, setChecked] = React.useState(true)
  const { t } = useLingui()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="mx-2 flex w-full flex-col rounded-lg py-4">
          <DialogTitle className="text-center font-bold text-md">
            <Trans>Are you sure you want to unlock Anna?</Trans>
          </DialogTitle>
          <p className="text-center">
            <Trans>It will cost: </Trans>
          </p>
          <div className="flex items-center justify-center gap-1 text-xl">
            <Tokens amount={price} size={22} />
          </div>
          <div className="space-y-6 p-4">
            <LineItem text={t`Unlock all private pictures of ${chatbotName}`} />
            <LineItem text={t`Unlock all galleries`} />
            <LineItem text={t`Receive personal voice-messages (Coming soon)`} />
            <Checkbox
              label={t`Don't show this again`}
              name="dontShowAgain"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </div>
          <Button
            id="dialog-unlock-button"
            size="lg"
            className="w-full"
            onClick={() => {
              onOpenChange(false)
              onClose(checked)
            }}
          >
            <Trans>Unlock</Trans>
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
