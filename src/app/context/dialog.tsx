"use client"

import React, { createContext, useCallback, useContext, useState } from "react"
import BecomePremiumDialog from "../components/dialog/become-premium"
import SignupDialog from "../components/dialog/auth/sign-up"
import { PremiumDialogType } from "../components/dialog/dialog-types"
import BuyTokensDialog from "../components/dialog/buy-tokens"

export interface DialogContextValue {
  signupOpen: boolean
  setSignupOpen: (open: boolean) => void
  premiumOpen: boolean
  setPremiumOpen: (
    open: boolean,
    type: PremiumDialogType,
    backgroundImage?: string,
  ) => void
  buyTokensOpen: boolean
  setBuyTokensOpen: (open: boolean) => void
}

const DialogsContext = createContext<DialogContextValue>({
  signupOpen: false,
  setSignupOpen: () => {},
  premiumOpen: false,
  setPremiumOpen: () => {},
  buyTokensOpen: false,
  setBuyTokensOpen: () => {},
})

export function useDialogs() {
  return useContext(DialogsContext)
}

export default function DialogsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [signupOpen, setSignupOpen] = useState<boolean>(false)
  const [premiumOpen, setPremiumOpen] = useState<boolean>(false)
  const [premiumType, setPremiumType] = useState<PremiumDialogType>(
    PremiumDialogType.reels,
  )
  const [backgroundURL, setBackgroundURL] = useState<string | undefined>()
  const [buyTokensOpen, setBuyTokensOpen] = useState<boolean>(false)

  const setPremiumWithType = useCallback(
    (open: boolean, type: PremiumDialogType, backgroundImage?: string) => {
      setPremiumOpen(open)
      if (type) {
        setPremiumType(type)
      }
      if (backgroundImage) {
        setBackgroundURL(backgroundImage)
      }
    },
    [],
  )

  return (
    <DialogsContext.Provider
      value={{
        signupOpen,
        setSignupOpen,
        premiumOpen,
        setPremiumOpen: setPremiumWithType,
        buyTokensOpen,
        setBuyTokensOpen,
      }}
    >
      <BecomePremiumDialog
        open={premiumOpen}
        setDialogOpen={setPremiumOpen}
        type={premiumType}
        backgroundURL={backgroundURL}
      />
      <SignupDialog open={signupOpen} onOpenChange={setSignupOpen} />
      <BuyTokensDialog open={buyTokensOpen} onOpenChange={setBuyTokensOpen} />
      {children}
    </DialogsContext.Provider>
  )
}
