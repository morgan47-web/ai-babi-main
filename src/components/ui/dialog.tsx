"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { CrossClose } from "../icons/generated"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      `
        fixed inset-0 z-50 flex items-center justify-center bg-transparent
        backdrop-blur-md

        data-[state=closed]:animate-out data-[state=closed]:fade-out-0

        data-[state=open]:animate-in data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay>
      <DialogPrimitive.Content
        ref={ref}
        aria-describedby={undefined}
        className={cn(
          `
            relative z-50 mx-1 flex max-w-lg gap-2 rounded-[20px] bg-trigger p-2
            shadow-lg duration-200

            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95
            data-[state=closed]:slide-out-to-left-1/2
            data-[state=closed]:slide-out-to-top-[48%]

            data-[state=open]:animate-in data-[state=open]:fade-in-0
            data-[state=open]:zoom-in-95
            data-[state=open]:slide-in-from-left-1/2
            data-[state=open]:slide-in-from-top-[48%]
          `,
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={`
              absolute right-[12px] top-[12px] z-[99999] rounded-sm
              transition-opacity

              data-[state=open]:bg-accent

              disabled:pointer-events-none

              focus:outline-none

              hover:opacity-100
            `}
          >
            <CrossClose height={28} width={28} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col space-y-1.5 text-center

        sm:text-left
      `,
      className,
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col-reverse

        sm:flex-row sm:justify-end sm:space-x-2
      `,
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
