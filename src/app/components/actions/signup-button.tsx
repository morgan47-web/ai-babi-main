"use client"

import React from "react"
import SignupDialog from "@/app/components/dialog/auth/sign-up"
import { Button } from "@/components/ui/button"
import { Trans } from "@lingui/react/macro"

export default function SignupButton() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <>
      <Button
        id="signup-button"
        variant="secondary"
        className="h-7 rounded-full font-bold"
        onClick={() => {
          setDialogOpen(!dialogOpen)
        }}
      >
        <p>
          <Trans>Join free</Trans>
        </p>
      </Button>
      <SignupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
