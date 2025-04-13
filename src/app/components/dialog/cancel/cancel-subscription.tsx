"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"
import CancelReasonDialog from "./cancel-reasons"
import { useUser } from "@/app/context/user"
import { Trans, useLingui } from "@lingui/react/macro"

function PWDUserDialogContent({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void
}) {
  const { t } = useLingui()
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  return (
    <>
      <div className="space-y-1">
        <Label className="text-xs">
          <Trans>Password</Trans>
        </Label>
        <Input
          type="password"
          className="h-10"
          placeholder="Password123"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">
          <Trans>Repeat password</Trans>
        </Label>
        <Input
          type="password"
          className="h-10"
          placeholder="Password123"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <Button size="lg" className="w-full" onClick={() => setDialogOpen(false)}>
        <Trans>Go Back to settings</Trans>
      </Button>
      <CancelReasonDialog
        onClose={() => setDialogOpen(false)}
        password={password}
        deleteAccount={false}
        trigger={
          <Button
            size="lg"
            className="w-full"
            variant="secondary"
            onClick={(e) => {
              if (!password || !repeatPassword) {
                alert(t`Please fill in the password fields`)
                e.preventDefault()
              }
              if (password !== repeatPassword) {
                alert(t`Passwords do not match`)
                e.preventDefault()
              }
            }}
          >
            <Trans>Continue</Trans>
          </Button>
        }
      />
    </>
  )
}

function OAuthUserDialogContent({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void
}) {
  return (
    <>
      <Button size="lg" className="w-full" onClick={() => setDialogOpen(false)}>
        <Trans>Go Back to settings</Trans>
      </Button>
      <CancelReasonDialog
        deleteAccount={false}
        onClose={() => setDialogOpen(false)}
        trigger={
          <Button size="lg" className="w-full" variant="secondary">
            <Trans>Continue</Trans>
          </Button>
        }
      />
    </>
  )
}

export default function CancelSubscriptionDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const user = useUser()

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <a id="cancel-subscription" className="text-xs text-muted-foreground">
          <Trans>Cancel</Trans>
        </a>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="mx-4 flex w-full flex-col rounded-lg py-4">
          <DialogTitle className="mx-4 text-center text-xl font-bold">
            <Trans>
              Are you sure you want to cancel your subscription?
              <span className="text-secondary">
                {" You will lose all your conversations and remaining tokens."}
              </span>
            </Trans>
          </DialogTitle>
          {user?.user.oauth ? (
            <OAuthUserDialogContent setDialogOpen={setDialogOpen} />
          ) : (
            <PWDUserDialogContent setDialogOpen={setDialogOpen} />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
