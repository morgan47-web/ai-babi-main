"use client"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { deleteUser } from "@/app/lib/server/actions/actions"
import TruevoCancelSubscriptionButton from "../../actions/truevo/cancel-subscription"
import { Trans, useLingui } from "@lingui/react/macro"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

interface Props {
  onClose: () => void
  password: string
  reasons: { [key: string]: string }
  deleteAccount: boolean
}

export default function CancelDiscountDialog({
  onClose,
  password,
  reasons,
  deleteAccount,
}: Props) {
  const router = useRouter()
  const { t } = useLingui()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const getCancelSubscriptionButton = () => {
    return (
      <TruevoCancelSubscriptionButton
        password={password}
        reasons={reasons}
        onSuccess={() => {
          handleOpenChange(false)
          router.push("/")
        }}
      />
    )
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      onClose()
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const resp = await deleteUser({ password, reasons })
      setLoading(false)
      if (!resp.ok) {
        throw new Error("Failed to delete account")
      }
      handleOpenChange(false)
      // Hard redirect to home page
      window.location.href = "/"
    } catch {
      alert(t`Failed to delete account. Please contact support.`)
    }
  }

  console.log("deleteAccount", deleteAccount)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full rounded-full" variant="secondary">
          {deleteAccount ? (
            <Trans>Delete Account</Trans>
          ) : (
            <Trans>Cancel subscription</Trans>
          )}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseButton={false}
          onInteractOutside={(event) => event.preventDefault()}
          className={`
            mx-2 flex h-[270px] w-full flex-col border border-primary p-0
          `}
        >
          <div className="relative flex flex-1 justify-end">
            <div
              className={`
                flex w-[200px] flex-1 flex-col justify-center space-y-4 px-4
                py-6 pr-[150px]
              `}
            >
              <DialogTitle
                className={`
                  text-center text-[32px] leading-[32px] text-secondary
                `}
              >
                <Trans>Get 60% off for your next month!</Trans>
              </DialogTitle>
              <div className="flex flex-col gap-2">
                <Button
                  size="lg"
                  className="w-[170px]"
                  onClick={() => {
                    handleOpenChange(false)
                    router.push("/subscription")
                  }}
                >
                  <Trans>Get discount!</Trans>
                </Button>
                {deleteAccount ? (
                  <Button
                    size="lg"
                    className="w-[170px] rounded-full"
                    variant={"outlineDisabled"}
                    onClick={() => handleDelete()}
                  >
                    {loading ? (
                      <Spinner loading={loading} />
                    ) : (
                      <Trans>Delete account</Trans>
                    )}
                  </Button>
                ) : (
                  getCancelSubscriptionButton()
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 flex flex-shrink-0">
              <Image
                src="/images/cancel-discount.png"
                alt="Adults Only"
                className="rounded-[20px]"
                width={170}
                height={270}
              />
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
