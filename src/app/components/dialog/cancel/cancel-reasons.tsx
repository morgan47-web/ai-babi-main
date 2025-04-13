"use client"

import { Button } from "@/components/ui/button"
import Checkbox from "@/components/ui/check-box"
import * as ReactCheckbox from "@radix-ui/react-checkbox"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react"
import CheckboxInput from "@/components/ui/check-box-input"
import CancelDiscountDialog from "./cancel-discount"
import { Trans, useLingui } from "@lingui/react/macro"

interface Props {
  onClose: () => void
  password?: string
  trigger?: React.ReactNode
  deleteAccount: boolean
}

export default function CancelReasonDialog({
  onClose,
  trigger,
  deleteAccount,
  password,
}: Props) {
  const { t } = useLingui()
  const [dialogOpen, setDialogOpen] = useState(false)
  const otherReasonRef = React.useRef<HTMLInputElement>(null)
  const [checkedItems, setCheckedItems] = useState({
    priceHigh: false,
    notEnoughBabes: false,
    notUsingApp: false,
    chatNotEntertaining: false,
    picturesNotEntertaining: false,
    other: false,
  })

  const handleCheckboxChange = (
    name: string,
    checked: ReactCheckbox.CheckedState,
  ) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      onClose()
    }
  }

  const transformCheckedItems = (items: object): { [key: string]: string } => {
    return Object.fromEntries(
      Object.entries(items).map(([key, value]) => {
        if (key === "other") {
          return [key, otherReasonRef.current?.value ?? ""]
        }
        return [key, String(value)]
      }),
    )
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="mx-4 flex w-full flex-col rounded-lg py-4">
          <DialogTitle className="mx-4 text-center text-xl font-bold">
            <Trans>
              Please tell us the reason. It will help us improve our services.
            </Trans>
          </DialogTitle>
          <div className="space-y-4 p-4">
            <Checkbox
              label={t`Price is too high`}
              name="priceHigh"
              checked={checkedItems.priceHigh}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              label={t`Not enough babes here.`}
              checked={checkedItems.notEnoughBabes}
              name="notEnoughBabes"
              onChange={handleCheckboxChange}
            />
            <Checkbox
              label={t`I’m not using this app.`}
              name="notUsingApp"
              checked={checkedItems.notUsingApp}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              label={t`Chat is not entertaining enough.`}
              name="chatNotEntertaining"
              checked={checkedItems.chatNotEntertaining}
              onChange={handleCheckboxChange}
            />
            <Checkbox
              label={t`I don't like the pictures.`}
              name="picturesNotEntertaining"
              checked={checkedItems.picturesNotEntertaining}
              onChange={handleCheckboxChange}
            />
            <CheckboxInput
              name="other"
              placeholder={t`Other (please tell us more)`}
              inputRef={otherReasonRef}
              checked={checkedItems.other}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleOpenChange(false)}
          >
            <Trans>Go Back to settings</Trans>
          </Button>
          <CancelDiscountDialog
            onClose={() => {
              handleOpenChange(false)
            }}
            password={password ?? ""}
            reasons={transformCheckedItems(checkedItems)}
            deleteAccount={deleteAccount}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
