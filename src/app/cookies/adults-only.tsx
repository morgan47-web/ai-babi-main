"use client"
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog"
import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"

interface Props {
  open?: boolean
  setOpen: (open: boolean) => void
}

export default function AdultsOnlyDialog({ open = false, setOpen }: Props) {
  if (Cookies.get("adultsOnly")) {
    return null
  }

  const handleClose = () => {
    setOpen(false)
    // Cookie valid for 100 years
    Cookies.set("adultsOnly", "true", { expires: 365 * 100, path: "/" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => {
          event.preventDefault()
        }}
        className={`
          mx-2 flex h-[270px] w-full flex-col border border-primary p-0
        `}
      >
        <div className="relative flex flex-1 justify-end">
          <div
            className={`
              flex w-[200px] flex-1 flex-col justify-center gap-2 px-4 py-6
              pr-[150px]
            `}
          >
            <DialogTitle className="text-2xl">
              {"This site is for"}
              <span className="text-secondary">{" adults only!"}</span>
            </DialogTitle>
            <p className="text-xs">
              By entering this website, I confirm that I am 18 years of age or
              older, and I agree to the Terms of Service available here.
            </p>
            <Button
              id="dialog-adults-only"
              size="lg"
              className="w-[170px]"
              onClick={handleClose}
            >
              {"I'm 18 or older"}
            </Button>
          </div>
          <div className="absolute bottom-0 right-0 flex flex-shrink-0">
            <Image
              src="/images/adults-only.png"
              alt="Adults Only"
              width={206}
              height={259}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
