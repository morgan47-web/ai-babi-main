"use client"
import { cn } from "@/lib/utils"
import * as ToastPrimitive from "@radix-ui/react-toast"
import React from "react"
import Wand from "../icons/generated/Wand"
import {
  CheckmarkCircle,
  CrossClose,
  ExclamationMark,
} from "../icons/generated"
import { cva, VariantProps } from "class-variance-authority"

const toastVariant = cva(
  `
    mt-4 w-[350px] transform rounded-lg bg-toast p-2 outline outline-1
    backdrop-blur-sm transition-transform ease-out

    data-[state="open"]:animate-slide-in

    data-[swipe="cancel"]:translate-x-0

    data-[swipe="end"]:translate-x-[var(--radix-toast-swipe-move-x)]

    data-[swipe="move"]:translate-x-[var(--radix-toast-swipe-move-x)]
  `,
  {
    variants: {
      variant: {
        success: `outline-success`,
        info: `outline-primary`,
        error: `outline-[2px] outline-destructive`,
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

export type ToastVariant = "success" | "info" | "error" | null | undefined

export interface ToastData {
  id: string
  variant: ToastVariant
  title: string
  message: string
  action?: React.ReactNode
  data?: { [key: string]: unknown }
}

const ToastProvider = ToastPrimitive.Provider
const ToastAction = ToastPrimitive.ToastAction

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariant> {}
export interface ToastHandle {
  publish: (
    id: string,
    variant: ToastVariant,
    title: string,
    message: string,
    action?: React.ReactNode,
  ) => void
}

const Toast = React.forwardRef<ToastHandle, ToastProps>(
  ({ className, ...props }, forwardedRef) => {
    const [data, setData] = React.useState<ToastData[]>([])

    React.useImperativeHandle(forwardedRef, () => ({
      publish: (
        id: string,
        variant: ToastVariant,
        title: string,
        message: string,
        action?: React.ReactNode,
      ) => {
        setData((prev) => [
          ...prev,
          {
            id,
            variant,
            title,
            message,
            action,
          },
        ])
      },
    }))

    return (
      <>
        {Array.from({ length: data.length }).map((_, i) => (
          <ToastPrimitive.Root
            key={i}
            className={cn(
              "z-50",
              toastVariant({ variant: data[i].variant, className }),
            )}
            {...props}
          >
            <div
              className={`
                grid grid-cols-[40px_1fr_auto_40px] items-center gap-2
              `}
            >
              {data[i].variant === "info" && (
                <Wand height={24} width={24} color={"hsl(var(--primary))"} />
              )}
              {data[i].variant === "success" && (
                <CheckmarkCircle
                  height={24}
                  width={24}
                  color={"hsl(var(--success))"}
                />
              )}
              {data[i].variant === "error" && (
                <ExclamationMark
                  height={24}
                  width={24}
                  color={"hsl(var(--destructive))"}
                />
              )}

              <div>
                <ToastTitle>{data[i].title}</ToastTitle>
                {data[i].message && (
                  <ToastDescription>{data[i].message}</ToastDescription>
                )}
              </div>
              <div>{data[i].action}</div>
              <ToastPrimitive.Close
                className={`flex items-center justify-center gap-1`}
              >
                <CrossClose height={24} width={24} color={"#667085"} />
              </ToastPrimitive.Close>
            </div>
          </ToastPrimitive.Root>
        ))}
      </>
    )
  },
)
Toast.displayName = ToastPrimitive.Root.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn(`text-sm leading-[20px] text-foreground`, className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn(`text-xs leading-[16px] text-border`, className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

export { ToastProvider, Toast, ToastTitle, ToastDescription, ToastAction }
