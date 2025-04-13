"use client"

import { LeftDivider, RightDivider } from "@/components/icons/generated"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React, { ReactNode } from "react"
import LoginDialog from "./login"
import { useUser } from "@/app/context/user"
import { Spinner } from "@/components/ui/spinner"
import ValidateEmailDialog from "../validate-email"
import { register } from "@/app/lib/server/actions/actions"
import Oauth from "./oauth"
import { cn } from "@/lib/utils"
import { StatusCodes } from "http-status-codes"
import validator from "validator"
import CredentialsInput from "./credentials-input"
import HeaderImage from "./header-image"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { Trans } from "@lingui/react/macro"

interface Props {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  onClose?: () => void
}

export default function SignupDialog({
  defaultOpen,
  trigger,
  open,
  onOpenChange,
  onClose,
}: Props) {
  const user = useUser()
  const [localOpen, setLocalDialogOpen] = React.useState(defaultOpen)
  const [validateDialogOpen, setValidateDialogOpen] = React.useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<ReactNode>("")
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const isSmallPhone = useMediaQuery("(max-height: 768px)")

  const dialogOpen = open ? open : localOpen
  const setDialogOpen = onOpenChange ? onOpenChange : setLocalDialogOpen

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailRef.current || !passwordRef.current || !user) {
      return
    }

    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()

    if (password === "" || email === "") {
      setErrorMessage(<Trans>Email and password cannot be empty</Trans>)
      return
    }
    if (!validator.isEmail(email)) {
      setErrorMessage(<Trans>Enter valid email</Trans>)
      return
    }

    setLoading(true)
    const res = await register({ username: email, email, password })
    setLoading(false)
    if (res.ok) {
      setValidateDialogOpen(true)
    } else {
      if (res.code === StatusCodes.CONFLICT) {
        setErrorMessage(<Trans>Email already in use. Try logging in.</Trans>)
      } else {
        setErrorMessage(<Trans>Unknown error. Contact support.</Trans>)
      }
    }
  }

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open && onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogPortal>
        <DialogOverlay onClick={() => handleOpenChange(false)} />
        <DialogContent
          className={`
            relative !m-0 flex h-full w-full flex-col rounded-lg bg-cover
            bg-center bg-no-repeat !px-0 !pt-0

            md:!h-[70%]
          `}
          style={{
            backgroundImage: isSmallPhone
              ? `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%), url(/images/become-premium-reels.jpg)`
              : "",
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <HeaderImage type={"signup"} />
          <div className={`flex flex-1 flex-col justify-center space-y-3`}>
            <DialogTitle className="text-center text-2xl">
              <Trans>Create Free Account</Trans>
            </DialogTitle>
            <form
              className="flex w-full flex-col gap-2 px-4"
              onSubmit={handleSubmit}
            >
              <CredentialsInput emailRef={emailRef} passwordRef={passwordRef} />
              <Label
                className={cn("w-full text-center text-secondary", {
                  hidden: loading || errorMessage === "",
                })}
              >
                {errorMessage}
              </Label>
              <Button
                id="dialog-signup-button"
                type="submit"
                size="lg"
                className="h-10 w-full rounded-full"
                disabled={loading}
              >
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  <Trans>Create free account</Trans>
                )}
              </Button>
              <div className="flex items-center justify-between">
                <LeftDivider width={104} height={2} />
                <p className="text-center text-xs">
                  <Trans>Or continue with</Trans>
                </p>
                <RightDivider width={104} height={2} />
              </div>
              <Oauth signUp />
              <p
                className={`
                  text-center text-xs leading-[20px] text-muted-foreground
                `}
              >
                <Trans>
                  By signing up, you agree to our{" "}
                  <Link href="/docs" className="underline">
                    Terms of Service
                  </Link>
                  , acknowledge that all content is AI-generated and fictional,
                  and you confirm that you are at least 18 years old.
                </Trans>
              </p>
              <div className="border-t border-muted-foreground pt-2">
                <p className="text-center text-sm">
                  <Trans>
                    Already have an account?
                    <span
                      className="text-secondary"
                      onClick={() => setLoginDialogOpen(true)}
                    >
                      {" "}
                      Sign in!
                    </span>
                  </Trans>
                </p>
              </div>
            </form>
          </div>
        </DialogContent>
        <LoginDialog
          onClose={() => handleOpenChange(false)}
          open={loginDialogOpen}
          setOpen={setLoginDialogOpen}
        />
        <ValidateEmailDialog
          emailRef={emailRef}
          open={validateDialogOpen}
          onOpenChange={setValidateDialogOpen}
          onClose={() => handleOpenChange(false)}
        />
      </DialogPortal>
    </Dialog>
  )
}
