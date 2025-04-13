"use client"

import { changePassword } from "@/app/lib/server/actions/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Trans } from "@lingui/react/macro"
import { DialogTrigger } from "@radix-ui/react-dialog"
import Link from "next/link"
import React from "react"

export default function ChangePasswordDialog() {
  const currentPasswordRef = React.useRef<HTMLInputElement>(null)
  const newPasswordRef = React.useRef<HTMLInputElement>(null)
  const repeatPasswordRef = React.useRef<HTMLInputElement>(null)
  const [loading, setLoading] = React.useState(false)
  const [open, onOpenChange] = React.useState(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    await changePassword({
      oldPassword: currentPasswordRef.current?.value ?? "",
      password: newPasswordRef.current?.value ?? "",
    }).then((res) => {
      if (res.ok) {
        setLoading(false)
        onOpenChange(false)
      } else {
        setLoading(false)
        alert("Password change failed")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className={`
            w-full bg-accent

            hover:bg-accent/90
          `}
        >
          <Trans>Change password</Trans>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="mx-2 flex w-full flex-col rounded-lg py-4">
          <DialogTitle className="text-center text-2xl">
            {" "}
            Change password{" "}
          </DialogTitle>
          <div className="space-y-1">
            <Label className="text-xs">Current password</Label>
            <Input
              type="password"
              className="h-10"
              placeholder="Password123"
              ref={currentPasswordRef}
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">New password</Label>
            <Input
              type="password"
              className="h-10"
              placeholder="Password123"
              ref={newPasswordRef}
              disabled={loading}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Repeat password</Label>
            <Input
              type="password"
              className="h-10"
              placeholder="Password123"
              ref={repeatPasswordRef}
              disabled={loading}
            />
          </div>
          <Link href="#" className="text-xs text-muted-foreground underline">
            Forgot password?
          </Link>
          <Button size="lg" className="w-full" onClick={handleSubmit}>
            {loading ? <Spinner loading={loading} /> : "Change password"}
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
