"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import Image from "next/image"
import React from "react"
import LoginDialog from "./auth/login"
import Countdown from "react-countdown"
import { ResendEmail, Timer } from "@/components/icons/generated"
import { resendEmail } from "@/app/lib/server/actions/actions"
import { Spinner } from "@/components/ui/spinner"
import { Trans } from "@lingui/react/macro"

interface Props {
  emailRef: React.RefObject<HTMLInputElement>
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose?: () => void
}

export default function ValidateEmailDialog({
  emailRef,
  open,
  onOpenChange,
  onClose,
}: Props) {
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open)
    if (!open && onClose) {
      onClose()
    }
  }

  const handleClick = async () => {
    setLoading(true)
    await resendEmail(emailRef.current?.value ?? "")
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={`
            relative flex w-full flex-col items-center justify-center rounded-xl
            shadow-dialog
          `}
        >
          <Image src={"/images/mail.png"} alt="Mail" width={112} height={112} />
          <DialogTitle className="text-center text-[24px]">
            <Trans>Please confirm your email</Trans>
          </DialogTitle>
          <div className="z-10 space-y-2 text-center text-xs">
            <p>
              <Trans>We’ve sent confirmation link to</Trans>
            </p>
            <p className="text-sm text-secondary">{emailRef.current?.value}</p>
            <p>
              <Trans>If you don’t see it. Check your SPAM folder.</Trans>
            </p>
          </div>
          {/* Timer */}
          <div className="flex items-center justify-center">
            <Countdown
              date={Date.now() + 60000}
              renderer={({ minutes, seconds }) => (
                <span className="text-xs font-bold text-muted-foreground">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              )}
            />
            <Timer width={12} height={12} />
          </div>
          {/* Resend button */}
          <Button
            className="h-9 w-[220px] px-4 font-bold"
            onClick={handleClick}
          >
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              <>
                <ResendEmail width={22} height={22} />
                <Trans>Resend email</Trans>
              </>
            )}
          </Button>
          <div
            className={`
              mt-2 w-full border-t border-muted-foreground/30 p-2 pt-4
            `}
          >
            <p className="text-center text-sm">
              <Trans>Already have an account?</Trans>
              <span
                className="text-secondary"
                onClick={() => setLoginDialogOpen(true)}
              >
                {" "}
                <Trans>Sign in!</Trans>
              </span>
            </p>
          </div>
        </DialogContent>
        <LoginDialog
          onClose={() => handleOpenChange(false)}
          open={loginDialogOpen}
          setOpen={setLoginDialogOpen}
        />
      </DialogPortal>
    </Dialog>
  )
}
