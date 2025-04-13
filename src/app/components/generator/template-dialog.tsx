"use client"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import React from "react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Image from "next/image"
import { PromptTemplate, templates } from "./templates"
import { Button } from "@/components/ui/button"
import { PaperPlaneUp } from "@/components/icons/generated"
import { Trans } from "@lingui/react/macro"

interface Props {
  open: boolean
  setDialogOpen: (open: boolean) => void
  onConfirm: (selected: PromptTemplate) => void
}

export default function PromptTemplateDialog({
  open,
  setDialogOpen,
  onConfirm,
}: Props) {
  const [selected, setSelected] = React.useState(templates[0])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="w-full flex-col space-y-3 overflow-y-auto pb-4 pt-10"
          style={{ maxHeight: "100dvh" }}
        >
          <VisuallyHidden asChild>
            <DialogTitle className="mx-4 text-center text-xl font-bold">
              <Trans>Templates</Trans>
            </DialogTitle>
          </VisuallyHidden>
          <div className={`relative grid w-full grid-cols-3 gap-1`}>
            {templates.map((template) => (
              <div
                className={`
                  relative h-[164px] w-full rounded-lg

                  focus:outline focus:outline-2 focus:outline-primary
                `}
                key={template.prompt}
                tabIndex={0}
                onClick={() => {
                  setSelected(template)
                  buttonRef.current?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Image
                  src={template.imageSrc}
                  alt={template.prompt}
                  fill
                  sizes={"33vw"}
                  className="rounded-lg object-cover"
                />
                <p
                  className={`
                    absolute bottom-1 left-1 text-xs

                    [text-shadow:_0_3px_7px_#000]
                  `}
                >
                  {template.name}
                </p>
              </div>
            ))}
          </div>
          <Button
            id="generator-use-templates-button"
            className={`
              flex h-10 w-full items-center justify-center gap-2 rounded-full
            `}
            type="submit"
            ref={buttonRef}
            onClick={() => {
              setDialogOpen(false)
              onConfirm(selected)
            }}
          >
            <Trans>Use template</Trans>
            <PaperPlaneUp height={22} width={22} />
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
